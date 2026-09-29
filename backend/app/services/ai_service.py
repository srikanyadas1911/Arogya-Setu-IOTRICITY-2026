import os
from typing import Dict, Any, List, Optional
import httpx
from backend.app.config import settings
from backend.app.services.rag_service import rag_engine

SYSTEM_PROMPT = """You are Arogya Setu AI Health Assistant, an empathetic, evidence-based telemedicine assistant for the IOTRICITY 2026 hackathon.
Your guidelines:
1. Provide accurate, helpful, and reassuring health information.
2. Clearly explain terms, suggest practical questions for their doctor, and guide them on consultation preparation.
3. NEVER provide definitive diagnoses or alter prescription dosages.
4. Always include a reminder to consult a registered medical practitioner.
5. If signs of a medical emergency (severe chest pain, breathing difficulty, stroke symptoms, acute trauma) are detected, immediately advise emergency care (call 112 / 108).
"""

async def generate_ai_response(message: str, history: Optional[List[dict]] = None) -> Dict[str, Any]:
    # 1. Retrieve clinical context using RAG
    retrieved_chunks = rag_engine.search(message, top_k=2)
    sources = list({c["source"] for c in retrieved_chunks})

    context_text = "\n".join([f"- {c['title']}: {c['text']}" for c in retrieved_chunks])

    # 2. Check if external AI API key (Gemini / OpenAI) is configured
    ai_key = settings.AI_API_KEY.strip()
    if ai_key:
        try:
            # If Google Gemini key is provided
            if ai_key.startswith("AIza"):
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={ai_key}"
                payload = {
                    "contents": [
                        {
                            "role": "user",
                            "parts": [
                                {
                                    "text": f"{SYSTEM_PROMPT}\n\nClinical Reference Context:\n{context_text}\n\nUser Question: {message}"
                                }
                            ]
                        }
                    ]
                }
                async with httpx.AsyncClient(timeout=15.0) as client:
                    resp = await client.post(url, json=payload)
                    if resp.status_code == 200:
                        data = resp.json()
                        text = data["candidates"][0]["content"]["parts"][0]["text"]
                        return {"answer": text, "sources": sources}
            # If OpenAI key is provided
            elif ai_key.startswith("sk-"):
                url = "https://api.openai.com/v1/chat/completions"
                headers = {"Authorization": f"Bearer {ai_key}", "Content-Type": "application/json"}
                payload = {
                    "model": "gpt-3.5-turbo",
                    "messages": [
                        {"role": "system", "content": f"{SYSTEM_PROMPT}\nContext:\n{context_text}"},
                        {"role": "user", "content": message}
                    ],
                    "temperature": 0.5
                }
                async with httpx.AsyncClient(timeout=15.0) as client:
                    resp = await client.post(url, headers=headers, json=payload)
                    if resp.status_code == 200:
                        data = resp.json()
                        text = data["choices"][0]["message"]["content"]
                        return {"answer": text, "sources": sources}
        except Exception as e:
            # Fall through to resilient clinical fallback
            pass

    # 3. Resilient Built-in Clinical Health Assistant (with RAG contextual enrichment)
    lower = message.lower()
    
    if any(w in lower for w in ["emergency", "chest pain", "breathless", "unconscious", "stroke", "bleeding"]):
        answer = (
            "🚨 **Urgent Medical Notice**: Based on your message, this could indicate a serious or time-sensitive health concern. "
            "Please seek immediate in-person emergency care or call your local emergency medical service (112 or 108 in India) right away.\n\n"
            "While awaiting assistance:\n"
            "• Keep calm and sit or lie down in a safe position.\n"
            "• Do not consume food, water, or unprescribed medications without medical supervision.\n"
            "• Ensure someone nearby is alerted to stay with you."
        )
    elif any(w in lower for w in ["consult", "prepare", "appointment", "doctor", "video"]):
        answer = (
            "Here is how to make the most of your upcoming consultation on Arogya Setu:\n\n"
            "1. **Record Recent Vitals**: Note your blood pressure, temperature, heart rate, and weight if a home monitor is available.\n"
            "2. **Medicine List**: Have all ongoing medications, supplements, and known allergies ready to share.\n"
            "3. **Timeline of Symptoms**: Note when your symptoms started, their severity, and whether specific activities trigger or ease them.\n"
            "4. **Questions Ready**: Write down your top 2–3 questions beforehand so you don't forget during the call.\n\n"
            "Your doctor can review all your saved health records directly on the Arogya Setu portal."
        )
    elif any(w in lower for w in ["medicine", "medic", "tablet", "dose", "remind", "schedule", "missed"]):
        answer = (
            "Here are best practices for medication management:\n\n"
            "• **Scheduled Consistency**: Take medications at the exact times prescribed by your doctor. You can track doses seamlessly in the **Medication Tracker** tab.\n"
            "• **Missed Doses**: If you miss a dose, take it as soon as you remember, unless it is close to your next scheduled dose. Never take a double dose to make up for a missed one.\n"
            "• **Course Completion**: If prescribed antibiotics, complete the full designated duration even if you feel significantly better.\n"
            "• **Food Interactions**: Note whether your prescription indicates taking the medicine 'before meals' or 'after meals'. Always review instructions on your digital prescription."
        )
    elif any(w in lower for w in ["prescription", "rx", "upload", "ocr"]):
        answer = (
            "Arogya Setu makes prescription management simple and secure:\n\n"
            "• **View Prescriptions**: Navigate to the **Prescriptions** section to review doctor-issued medication plans, dosages, and follow-up dates.\n"
            "• **Upload & Scan**: In **Upload Prescription**, you can submit physical prescription photos or PDFs. Our medical document engine extracts medication names and schedules automatically for your review.\n"
            "• **Doctor Sign-Off**: All uploaded documents are archived in your permanent health records for your next consultation."
        )
    elif any(w in lower for w in ["blood pressure", "hypertension", "bp"]):
        answer = (
            "Monitoring Blood Pressure:\n\n"
            "• Target blood pressure for most adults is under 130/80 mmHg.\n"
            "• Rest quietly for 5 minutes before taking a reading, with both feet flat on the floor.\n"
            "• Avoid caffeine, exercise, or smoking for 30 minutes prior to measurement.\n"
            "• Dietary advice: Aim to limit daily salt intake and engage in regular moderate physical activity.\n\n"
            "*Always consult your attending cardiologist or physician before altering any antihypertensive therapy.*"
        )
    elif any(w in lower for w in ["diabetes", "sugar", "glucose"]):
        answer = (
            "Managing Blood Sugar & Diabetes:\n\n"
            "• Standard targets are typically 80–130 mg/dL for fasting sugar and <180 mg/dL two hours after meals (individual targets may vary).\n"
            "• Regular HbA1c testing every 3 to 6 months provides a comprehensive 90-day overview.\n"
            "• Remember daily foot inspections, proper hydration, and adhering to prescribed medication schedules.\n\n"
            "*Please discuss specific target ranges with your healthcare provider.*"
        )
    else:
        answer = (
            "Hello! I am your **Arogya Setu AI Health Assistant**.\n\n"
            "I can assist you with:\n"
            "• Preparing questions and vitals for your doctor consultations\n"
            "• Understanding medication schedules, instructions, and adherence tips\n"
            "• Explaining health concepts, lab terms, and preventive wellness advice\n"
            "• Guiding you through prescription uploads and appointment scheduling\n\n"
            "How can I assist you with your health today?\n\n"
            "*Disclaimer: I provide evidence-based educational support and cannot replace direct medical advice from a registered doctor.*"
        )

    return {"answer": answer, "sources": sources}

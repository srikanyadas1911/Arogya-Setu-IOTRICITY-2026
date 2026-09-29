import math
import re
from typing import List, Dict, Tuple

MEDICAL_KNOWLEDGE_DOCS = [
    {
        "id": "doc-telemed-prep",
        "title": "Telemedicine Consultation Preparation Guide",
        "source": "Arogya Setu Clinical Protocols (Telehealth v2.1)",
        "content": (
            "To prepare for a video consultation: 1. Keep recent vitals (blood pressure, heart rate, temperature, weight, SpO2) ready. "
            "2. Have your current prescriptions, list of existing medications, and known allergies at hand. "
            "3. Note down your main symptoms, when they began, and what triggers or relieves them. "
            "4. Ensure good lighting and a quiet room with stable internet connection. "
            "5. Have questions written down in advance so you can discuss them with your doctor."
        )
    },
    {
        "id": "doc-med-safety",
        "title": "Medication Adherence & Administration Safety",
        "source": "Indian Pharmacopoeia & Patient Safety Advisory",
        "content": (
            "Medication adherence guidelines: Always take prescribed doses at the scheduled time. "
            "Never stop antibiotics early even if feeling better; complete the prescribed course to prevent antimicrobial resistance. "
            "Antihypertensive and antidiabetic medications require consistent daily schedules and regular clinical follow-up. "
            "If you miss a dose, take it as soon as remembered unless it is almost time for your next dose; never double dose. "
            "Store medicines in a cool, dry place away from direct sunlight."
        )
    },
    {
        "id": "doc-hypertension",
        "title": "Hypertension Monitoring & Lifestyle Management",
        "source": "Cardiology Society Clinical Guidelines",
        "content": (
            "Hypertension management: Target BP is generally under 130/80 mmHg for most adults. "
            "Restrict daily dietary sodium intake to less than 2,000 mg (about one teaspoon of salt). "
            "Engage in at least 150 minutes of moderate aerobic exercise weekly (such as brisk walking). "
            "Measure BP while seated quietly for 5 minutes, back supported, feet flat on the floor, without talking. "
            "Report readings consistently above 140/90 mmHg to your attending physician."
        )
    },
    {
        "id": "doc-diabetes",
        "title": "Type 2 Diabetes Glycemic Control & Foot Care",
        "source": "Endocrine & Diabetes Care Practice Standards",
        "content": (
            "Diabetes management: Fasting plasma glucose targets are typically 80-130 mg/dL, and post-prandial under 180 mg/dL. "
            "HbA1c testing is recommended every 3 months during therapy changes or every 6 months when stable. "
            "Inspect feet daily for cuts, blisters, or redness. Maintain a balanced diet rich in whole grains, fiber, and lean protein, "
            "avoiding refined sugars and sweetened beverages. Stay hydrated and adhere to prescribed antidiabetic medications."
        )
    },
    {
        "id": "doc-red-flags",
        "title": "Medical Red Flags & Emergency Protocol",
        "source": "Emergency Triage Standards (Arogya Setu Health System)",
        "content": (
            "EMERGENCY WARNING: Seek immediate emergency room care or call local emergency services (112 or 108 in India) if experiencing: "
            "1. Severe crushing chest pain, pressure, or tightness radiating to the jaw, neck, shoulder, or left arm. "
            "2. Sudden numbness, weakness in face, arm, or leg (especially one side of body), or difficulty speaking. "
            "3. Sudden severe shortness of breath or blue-tinged lips/fingers. "
            "4. High fever accompanied by stiff neck, confusion, or persistent vomiting. "
            "5. Sudden vision loss or severe uncontrollable bleeding."
        )
    }
]

def tokenize(text: str) -> List[str]:
    return [w.lower() for w in re.findall(r'\b[A-Za-z0-9_]{3,}\b', text)]

class SimpleRAG:
    def __init__(self):
        self.documents = MEDICAL_KNOWLEDGE_DOCS
        self.chunks = []
        for doc in self.documents:
            # Chunking document paragraphs
            paragraphs = [p.strip() for p in doc["content"].split(". ") if p.strip()]
            for i, p in enumerate(paragraphs):
                self.chunks.append({
                    "id": f"{doc['id']}_p{i}",
                    "title": doc["title"],
                    "source": doc["source"],
                    "text": p + ("." if not p.endswith(".") else "")
                })

    def search(self, query: str, top_k: int = 3) -> List[Dict[str, str]]:
        query_tokens = set(tokenize(query))
        if not query_tokens:
            return self.chunks[:top_k]

        scored_chunks: List[Tuple[float, Dict[str, str]]] = []
        for chunk in self.chunks:
            chunk_tokens = tokenize(chunk["text"] + " " + chunk["title"])
            overlap = sum(1 for t in query_tokens if t in chunk_tokens)
            if overlap > 0:
                score = overlap / (math.log(len(chunk_tokens) + 1) + 1.0)
                scored_chunks.append((score, chunk))

        scored_chunks.sort(key=lambda x: x[0], reverse=True)
        results = [c[1] for c in scored_chunks[:top_k]]
        return results if results else self.chunks[:top_k]

rag_engine = SimpleRAG()

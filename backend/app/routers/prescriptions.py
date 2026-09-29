import os
import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, status
from sqlalchemy.orm import Session
from backend.app.config import settings
from backend.app.database import get_db
from backend.app.models import Prescription, Medication, MedicalRecord, Doctor, Patient, Notification
from backend.app.schemas import PrescriptionCreate, PrescriptionResponse, OCRResponse
from backend.app.services.ocr_service import process_prescription_file

router = APIRouter(prefix="/prescriptions", tags=["Prescriptions"])

def format_prescription(p: Prescription) -> dict:
    return {
        "id": p.id,
        "doctorId": p.doctor_id,
        "doctorName": p.doctor_name,
        "patientId": p.patient_id,
        "patientName": p.patient_name,
        "date": p.date,
        "diagnosis": p.diagnosis,
        "medicines": p.medicines or [],
        "notes": p.notes or "",
        "followUpDate": p.follow_up_date or "",
        "status": p.status,
        "fileUrl": p.file_url
    }

@router.get("", response_model=List[PrescriptionResponse])
def get_prescriptions(
    patient_id: Optional[str] = Query(None, alias="patientId"),
    doctor_id: Optional[str] = Query(None, alias="doctorId"),
    db: Session = Depends(get_db)
):
    query = db.query(Prescription)
    if patient_id:
        query = query.filter(Prescription.patient_id == patient_id)
    if doctor_id:
        query = query.filter(Prescription.doctor_id == doctor_id)
    rx_list = query.order_by(Prescription.date.desc()).all()
    return [format_prescription(p) for p in rx_list]

@router.post("", response_model=PrescriptionResponse)
def create_prescription(req: PrescriptionCreate, db: Session = Depends(get_db)):
    doctor = None
    if req.doctorId:
        doctor = db.query(Doctor).filter(Doctor.id == req.doctorId).first()
    doctor_name = req.doctorName or (doctor.name if doctor else "Dr. Ananya Sharma")
    doc_id = req.doctorId or (doctor.id if doctor else "doc-1")

    patient = db.query(Patient).filter(Patient.id == req.patientId).first()
    patient_name = req.patientName or (patient.name if patient else "Priya Sharma")

    rx_id = f"rx-{uuid.uuid4().hex[:6]}"
    today = datetime.utcnow().strftime("%Y-%m-%d")

    meds_list = [m.model_dump() for m in req.medicines]

    new_rx = Prescription(
        id=rx_id,
        doctor_id=doc_id,
        doctor_name=doctor_name,
        patient_id=req.patientId,
        patient_name=patient_name,
        date=today,
        diagnosis=req.diagnosis,
        medicines=meds_list,
        notes=req.notes or "",
        follow_up_date=req.followUpDate or "",
        status="active"
    )
    db.add(new_rx)

    # Automatically add prescribed medicines to the Medication Tracker for patient
    for med in meds_list:
        med_id = f"med-{uuid.uuid4().hex[:6]}"
        new_med = Medication(
            id=med_id,
            patient_id=req.patientId,
            name=med["name"],
            dosage=med["dosage"],
            time=med.get("frequency", "09:00 AM"),
            instructions=med.get("instructions", "Take as directed"),
            status="pending",
            prescription_id=rx_id,
            date=today
        )
        db.add(new_med)

    # Add to medical history
    rec = MedicalRecord(
        id=f"rec-{uuid.uuid4().hex[:6]}",
        patient_id=req.patientId,
        type="prescription",
        date=today,
        title=f"Prescription: {req.diagnosis}",
        description=f"Prescribed by {doctor_name}. Notes: {req.notes}",
        doctor_name=doctor_name
    )
    db.add(rec)

    # Notification
    notif = Notification(
        id=f"notif-{uuid.uuid4().hex[:6]}",
        role="patient",
        type="prescription",
        title="New Prescription Issued",
        message=f"{doctor_name} has issued a new prescription for {req.diagnosis}.",
        time="Just now",
        read=False
    )
    db.add(notif)

    db.commit()
    db.refresh(new_rx)
    return format_prescription(new_rx)

@router.post("/upload", response_model=OCRResponse)
async def upload_prescription_endpoint(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Validate extension
    allowed = [".png", ".jpg", ".jpeg", ".pdf"]
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in allowed:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{ext}'. Allowed types: {', '.join(allowed)}"
        )

    # Save to disk
    safe_filename = f"{uuid.uuid4().hex[:8]}_{file.filename}"
    file_path = os.path.join(settings.UPLOAD_DIR, safe_filename)
    
    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)

    # Process through OCR pipeline
    result = await process_prescription_file(file_path, file.filename)
    return result

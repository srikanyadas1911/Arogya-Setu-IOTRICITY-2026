import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import Medication
from backend.app.schemas import MedicationCreate, MedicationResponse

router = APIRouter(prefix="/medications", tags=["Medications"])

class MedicationStatusUpdate(BaseModel):
    status: str

def format_medication(m: Medication) -> dict:
    return {
        "id": m.id,
        "name": m.name,
        "dosage": m.dosage,
        "time": m.time,
        "instructions": m.instructions or "",
        "status": m.status,
        "prescriptionId": m.prescription_id
    }

@router.get("", response_model=List[MedicationResponse])
def get_medications(
    patient_id: Optional[str] = Query(None, alias="patientId"),
    db: Session = Depends(get_db)
):
    query = db.query(Medication)
    if patient_id:
        query = query.filter(Medication.patient_id == patient_id)
    meds = query.all()
    return [format_medication(m) for m in meds]

@router.post("", response_model=MedicationResponse)
def add_medication(req: MedicationCreate, db: Session = Depends(get_db)):
    med_id = f"med-{uuid.uuid4().hex[:6]}"
    patient_id = req.patientId or "pat-1"
    new_med = Medication(
        id=med_id,
        patient_id=patient_id,
        name=req.name,
        dosage=req.dosage,
        time=req.time,
        instructions=req.instructions or "",
        status=req.status or "pending",
        prescription_id=req.prescriptionId
    )
    db.add(new_med)
    db.commit()
    db.refresh(new_med)
    return format_medication(new_med)

@router.put("/{medication_id}/taken")
def mark_medication_taken(medication_id: str, db: Session = Depends(get_db)):
    med = db.query(Medication).filter(Medication.id == medication_id).first()
    if not med:
        raise HTTPException(status_code=404, detail="Medication not found")
    med.status = "taken"
    db.commit()
    return {"success": True, "message": "Medication marked as taken"}

@router.put("/{medication_id}/status")
def update_medication_status(medication_id: str, req: MedicationStatusUpdate, db: Session = Depends(get_db)):
    med = db.query(Medication).filter(Medication.id == medication_id).first()
    if not med:
        raise HTTPException(status_code=404, detail="Medication not found")
    med.status = req.status
    db.commit()
    return {"success": True, "message": f"Medication status updated to {req.status}"}

@router.delete("/{medication_id}")
def delete_medication(medication_id: str, db: Session = Depends(get_db)):
    med = db.query(Medication).filter(Medication.id == medication_id).first()
    if not med:
        raise HTTPException(status_code=404, detail="Medication not found")
    db.delete(med)
    db.commit()
    return {"success": True, "message": "Medication removed"}

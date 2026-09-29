from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import Doctor, VerificationStatus
from backend.app.schemas import DoctorResponse, TimeSlotSchema

router = APIRouter(prefix="/doctors", tags=["Doctors"])

def format_doctor(d: Doctor) -> dict:
    slots = d.schedule_slots or [
        {"time": "09:00 AM", "available": True},
        {"time": "10:00 AM", "available": True},
        {"time": "11:00 AM", "available": True},
        {"time": "02:00 PM", "available": True},
        {"time": "03:00 PM", "available": True},
        {"time": "04:00 PM", "available": True},
    ]
    return {
        "id": d.id,
        "name": d.name,
        "specialization": d.specialization,
        "experience": d.experience,
        "rating": d.rating,
        "fee": d.fee,
        "availability": d.availability,
        "nextSlot": d.next_slot,
        "qualifications": d.qualifications,
        "hospital": d.hospital,
        "consultationType": d.consultation_type or ["video"],
        "registrationId": d.registration_id,
        "verificationStatus": d.verification_status,
        "totalPatients": d.total_patients,
        "about": d.about,
        "scheduleSlots": slots
    }

@router.get("", response_model=List[DoctorResponse])
def get_doctors(
    search: Optional[str] = Query(None),
    specialization: Optional[str] = Query(None),
    verified_only: bool = Query(False),
    db: Session = Depends(get_db)
):
    query = db.query(Doctor)
    if verified_only:
        query = query.filter(Doctor.verification_status == VerificationStatus.VERIFIED.value)
    
    docs = query.all()
    results = []
    for d in docs:
        if search:
            s = search.lower()
            if s not in d.name.lower() and s not in d.specialization.lower() and s not in d.hospital.lower():
                continue
        if specialization and specialization.lower() != "all":
            if specialization.lower() not in d.specialization.lower():
                continue
        results.append(format_doctor(d))
    return results

@router.get("/{doctor_id}", response_model=DoctorResponse)
def get_doctor_by_id(doctor_id: str, db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return format_doctor(doc)

@router.get("/{doctor_id}/schedule", response_model=List[TimeSlotSchema])
def get_doctor_schedule(doctor_id: str, db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doc.schedule_slots or []

@router.put("/{doctor_id}/schedule")
def update_doctor_schedule(doctor_id: str, slots: List[TimeSlotSchema], db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
    doc.schedule_slots = [s.model_dump() for s in slots]
    db.commit()
    return {"success": True, "message": "Schedule updated successfully"}

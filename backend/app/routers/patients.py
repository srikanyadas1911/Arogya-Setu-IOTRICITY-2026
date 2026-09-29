from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import Patient, MedicalRecord, Vitals
from backend.app.schemas import PatientResponse, MedicalRecordSchema, VitalsSchema

router = APIRouter(prefix="/patients", tags=["Patients"])

def format_patient(p: Patient) -> dict:
    return {
        "id": p.id,
        "name": p.name,
        "age": p.age,
        "gender": p.gender,
        "email": p.email,
        "phone": p.phone,
        "bloodGroup": p.blood_group,
        "lastVisit": p.last_visit,
        "conditions": p.conditions or [],
        "allergies": p.allergies or []
    }

@router.get("", response_model=List[PatientResponse])
def get_patients(db: Session = Depends(get_db)):
    patients = db.query(Patient).all()
    return [format_patient(p) for p in patients]

@router.get("/{patient_id}", response_model=PatientResponse)
def get_patient_by_id(patient_id: str, db: Session = Depends(get_db)):
    p = db.query(Patient).filter(Patient.id == patient_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Patient not found")
    return format_patient(p)

@router.get("/{patient_id}/history", response_model=List[MedicalRecordSchema])
def get_patient_history(patient_id: str, db: Session = Depends(get_db)):
    records = db.query(MedicalRecord).filter(MedicalRecord.patient_id == patient_id).all()
    return [
        {
            "id": r.id,
            "patientId": r.patient_id,
            "type": r.type,
            "date": r.date,
            "title": r.title,
            "description": r.description,
            "doctorName": r.doctor_name
        }
        for r in records
    ]

@router.get("/{patient_id}/vitals", response_model=VitalsSchema)
def get_patient_vitals(patient_id: str, db: Session = Depends(get_db)):
    v = db.query(Vitals).filter(Vitals.patient_id == patient_id).order_by(Vitals.created_at.desc()).first()
    if not v:
        return {
            "bloodPressure": "120/80 mmHg",
            "heartRate": "72 bpm",
            "temperature": "98.4 °F",
            "weight": "68 kg",
            "spo2": "98%",
            "date": "2026-03-29"
        }
    return {
        "bloodPressure": v.blood_pressure,
        "heartRate": v.heart_rate,
        "temperature": v.temperature,
        "weight": v.weight,
        "spo2": v.spo2,
        "date": v.date
    }

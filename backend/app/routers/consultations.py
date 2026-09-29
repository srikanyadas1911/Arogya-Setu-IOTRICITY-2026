import uuid
from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import Consultation, Appointment

router = APIRouter(prefix="/consultations", tags=["Consultations"])

class CreateConsultationRequest(BaseModel):
    appointmentId: Optional[str] = None
    doctorId: str
    patientId: str

@router.post("/create")
def create_consultation(req: CreateConsultationRequest, db: Session = Depends(get_db)):
    room_id = f"room-{uuid.uuid4().hex[:8]}"
    meeting_link = f"https://meet.arogyasetu.demo/room/{room_id}"

    cons = Consultation(
        id=f"cons-{uuid.uuid4().hex[:6]}",
        appointment_id=req.appointmentId,
        doctor_id=req.doctorId,
        patient_id=req.patientId,
        room_name=room_id,
        meeting_link=meeting_link,
        status="waiting"
    )
    db.add(cons)

    if req.appointmentId:
        appt = db.query(Appointment).filter(Appointment.id == req.appointmentId).first()
        if appt:
            appt.meeting_link = meeting_link

    db.commit()
    db.refresh(cons)

    return {
        "id": cons.id,
        "appointmentId": cons.appointment_id,
        "doctorId": cons.doctor_id,
        "patientId": cons.patient_id,
        "roomName": cons.room_name,
        "meetingLink": cons.meeting_link,
        "status": cons.status
    }

@router.get("/{room_name}")
def get_consultation(room_name: str, db: Session = Depends(get_db)):
    cons = db.query(Consultation).filter(Consultation.room_name == room_name).first()
    if not cons:
        # Create ad-hoc room if not found
        return {
            "roomName": room_name,
            "meetingLink": f"https://meet.arogyasetu.demo/room/{room_name}",
            "status": "active"
        }
    return {
        "id": cons.id,
        "appointmentId": cons.appointment_id,
        "doctorId": cons.doctor_id,
        "patientId": cons.patient_id,
        "roomName": cons.room_name,
        "meetingLink": cons.meeting_link,
        "status": cons.status
    }

@router.post("/{room_name}/start")
def start_consultation(room_name: str, db: Session = Depends(get_db)):
    cons = db.query(Consultation).filter(Consultation.room_name == room_name).first()
    if cons:
        cons.status = "active"
        cons.started_at = datetime.utcnow()
        db.commit()
    return {"success": True, "status": "active"}

@router.post("/{room_name}/end")
def end_consultation(room_name: str, db: Session = Depends(get_db)):
    cons = db.query(Consultation).filter(Consultation.room_name == room_name).first()
    if cons:
        cons.status = "completed"
        cons.ended_at = datetime.utcnow()
        if cons.appointment_id:
            appt = db.query(Appointment).filter(Appointment.id == cons.appointment_id).first()
            if appt:
                appt.status = "completed"
        db.commit()
    return {"success": True, "status": "completed"}

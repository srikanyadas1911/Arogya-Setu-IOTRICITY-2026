import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import Appointment, Doctor, Patient, Notification
from backend.app.schemas import AppointmentCreate, AppointmentResponse

router = APIRouter(prefix="/appointments", tags=["Appointments"])

class RescheduleRequest(BaseModel):
    date: str
    time: str

class StatusUpdateRequest(BaseModel):
    status: str

def format_appointment(a: Appointment) -> dict:
    return {
        "id": a.id,
        "patientId": a.patient_id,
        "patientName": a.patient_name,
        "doctorId": a.doctor_id,
        "doctorName": a.doctor_name,
        "specialization": a.specialization,
        "date": a.date,
        "time": a.time,
        "consultationType": a.consultation_type,
        "status": a.status,
        "reason": a.reason or "Consultation",
        "meetingLink": a.meeting_link
    }

@router.get("", response_model=List[AppointmentResponse])
def get_appointments(
    patient_id: Optional[str] = Query(None, alias="patientId"),
    doctor_id: Optional[str] = Query(None, alias="doctorId"),
    db: Session = Depends(get_db)
):
    query = db.query(Appointment)
    if patient_id:
        query = query.filter(Appointment.patient_id == patient_id)
    if doctor_id:
        query = query.filter(Appointment.doctor_id == doctor_id)
    appts = query.order_by(Appointment.date.desc()).all()
    return [format_appointment(a) for a in appts]

@router.post("", response_model=AppointmentResponse)
def book_appointment(req: AppointmentCreate, db: Session = Depends(get_db)):
    # 1. Verify doctor exists
    doctor = db.query(Doctor).filter(Doctor.id == req.doctorId).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    # 2. Verify patient
    patient_id = req.patientId or "pat-1"
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    patient_name = req.patientName or (patient.name if patient else "Priya Sharma")

    # 3. Prevent double booking on same doctor, same date, same time
    conflict = db.query(Appointment).filter(
        Appointment.doctor_id == req.doctorId,
        Appointment.date == req.date,
        Appointment.time == req.time,
        Appointment.status.in_(["upcoming", "confirmed"])
    ).first()
    if conflict:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Dr. {doctor.name} already has an appointment booked for {req.date} at {req.time}."
        )

    appt_id = f"appt-{uuid.uuid4().hex[:6]}"
    meeting_link = f"https://meet.arogyasetu.demo/room/{appt_id}"

    new_appt = Appointment(
        id=appt_id,
        patient_id=patient_id,
        patient_name=patient_name,
        doctor_id=doctor.id,
        doctor_name=doctor.name,
        specialization=doctor.specialization,
        date=req.date,
        time=req.time,
        consultation_type=req.consultationType or "video",
        status="upcoming",
        reason=req.reason or "Consultation",
        meeting_link=meeting_link
    )
    db.add(new_appt)

    # Create notification for patient
    notif = Notification(
        id=f"notif-{uuid.uuid4().hex[:6]}",
        role="patient",
        type="appointment",
        title="Appointment Confirmed",
        message=f"Your appointment with {doctor.name} on {req.date} at {req.time} is booked.",
        time="Just now",
        read=False
    )
    db.add(notif)

    db.commit()
    db.refresh(new_appt)
    return format_appointment(new_appt)

@router.put("/{appointment_id}/cancel")
def cancel_appointment(appointment_id: str, db: Session = Depends(get_db)):
    appt = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    appt.status = "cancelled"
    
    # Add notification
    notif = Notification(
        id=f"notif-{uuid.uuid4().hex[:6]}",
        role="patient",
        type="appointment",
        title="Appointment Cancelled",
        message=f"Appointment with {appt.doctor_name} on {appt.date} was cancelled.",
        time="Just now",
        read=False
    )
    db.add(notif)
    db.commit()
    return {"success": True, "message": "Appointment cancelled successfully"}

@router.put("/{appointment_id}/reschedule")
def reschedule_appointment(appointment_id: str, req: RescheduleRequest, db: Session = Depends(get_db)):
    appt = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")

    # Conflict check
    conflict = db.query(Appointment).filter(
        Appointment.doctor_id == appt.doctor_id,
        Appointment.date == req.date,
        Appointment.time == req.time,
        Appointment.status.in_(["upcoming", "confirmed"]),
        Appointment.id != appt.id
    ).first()
    if conflict:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Time slot {req.time} on {req.date} is already booked."
        )

    appt.date = req.date
    appt.time = req.time
    db.commit()
    return {"success": True, "message": "Appointment rescheduled successfully"}

@router.put("/{appointment_id}/status")
def update_appointment_status(appointment_id: str, req: StatusUpdateRequest, db: Session = Depends(get_db)):
    appt = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    appt.status = req.status
    db.commit()
    return {"success": True, "message": f"Appointment status updated to {req.status}"}

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import Doctor, Patient, Appointment, Prescription, Notification, VerificationStatus
import uuid
from backend.app.schemas import DoctorVerificationUpdate

router = APIRouter(prefix="/admin", tags=["Admin"])

class VerifyRequest(BaseModel):
    status: str  # verified, rejected, pending
    notes: str = ""

@router.get("/stats")
def get_admin_stats(db: Session = Depends(get_db)):
    total_doctors = db.query(Doctor).count()
    verified_doctors = db.query(Doctor).filter(Doctor.verification_status == VerificationStatus.VERIFIED.value).count()
    pending_doctors = db.query(Doctor).filter(Doctor.verification_status == VerificationStatus.PENDING.value).count()
    rejected_doctors = db.query(Doctor).filter(Doctor.verification_status == VerificationStatus.REJECTED.value).count()
    
    total_patients = db.query(Patient).count()
    total_appointments = db.query(Appointment).count()
    completed_appointments = db.query(Appointment).filter(Appointment.status == "completed").count()
    total_prescriptions = db.query(Prescription).count()

    return {
        "totalDoctors": total_doctors,
        "verifiedDoctors": verified_doctors,
        "pendingVerification": pending_doctors,
        "rejectedDoctors": rejected_doctors,
        "totalPatients": total_patients,
        "totalAppointments": total_appointments,
        "completedAppointments": completed_appointments,
        "totalPrescriptions": total_prescriptions,
        "platformUptime": "99.98%",
        "activeConsultations": 3
    }

@router.put("/doctors/{doctor_id}/verify")
def verify_doctor(doctor_id: str, req: VerifyRequest, db: Session = Depends(get_db)):
    doc = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    valid_statuses = [VerificationStatus.VERIFIED.value, VerificationStatus.REJECTED.value, VerificationStatus.PENDING.value]
    if req.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Status must be one of {valid_statuses}")
    
    doc.verification_status = req.status

    # Add notification for the doctor
    notif = Notification(
        id=f"notif-v-{doctor_id}-{uuid.uuid4().hex[:6]}",
        role="doctor",
        type="general",
        title=f"Verification Status: {req.status.capitalize()}",
        message=f"Your Arogya Setu medical license verification has been set to '{req.status}'.",
        time="Just now",
        read=False
    )
    db.add(notif)
    db.commit()

    return {
        "success": True,
        "message": f"Doctor {doc.name} status updated to {req.status}",
        "doctorId": doc.id,
        "verificationStatus": doc.verification_status
    }

@router.get("/reports")
def get_admin_reports(db: Session = Depends(get_db)):
    return {
        "monthlyAppointments": [
            {"month": "Nov", "appointments": 140, "completed": 125},
            {"month": "Dec", "appointments": 210, "completed": 195},
            {"month": "Jan", "appointments": 290, "completed": 270},
            {"month": "Feb", "appointments": 380, "completed": 360},
            {"month": "Mar", "appointments": 450, "completed": 420},
        ],
        "specializationDistribution": [
            {"name": "Cardiology", "value": 35},
            {"name": "General Medicine", "value": 28},
            {"name": "Dermatology", "value": 20},
            {"name": "Orthopedics", "value": 17},
        ],
        "consultationTypeBreakdown": [
            {"type": "Video Teleconsultation", "percentage": 78},
            {"type": "Audio Teleconsultation", "percentage": 22},
        ],
        "satisfactionRate": 96.4,
        "averageWaitTimeMinutes": 4.2
    }

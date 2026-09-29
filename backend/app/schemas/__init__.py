from typing import List, Optional, Any
from pydantic import BaseModel, EmailStr, Field

# ─── AUTH SCHEMAS ──────────────────────────────────────────
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: str = "patient"  # patient, doctor, admin
    name: str
    phone: Optional[str] = None
    # Doctor specific fields
    specialization: Optional[str] = None
    qualifications: Optional[str] = None
    hospital: Optional[str] = None
    registration_id: Optional[str] = None
    experience: Optional[int] = 0
    fee: Optional[int] = 500
    about: Optional[str] = None
    # Patient specific fields
    age: Optional[int] = 30
    gender: Optional[str] = "Other"
    blood_group: Optional[str] = "O+"

class LoginRequest(BaseModel):
    email: str
    password: str
    role: Optional[str] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

class UserResponse(BaseModel):
    id: str
    email: str
    role: str
    profile: Optional[dict] = None

# ─── DOCTOR SCHEMAS ────────────────────────────────────────
class TimeSlotSchema(BaseModel):
    time: str
    available: bool

class DoctorResponse(BaseModel):
    id: str
    name: str
    specialization: str
    experience: int
    rating: float
    fee: int
    availability: str
    nextSlot: Optional[str] = None
    qualifications: str
    hospital: str
    consultationType: List[str]
    registrationId: str
    verificationStatus: str
    totalPatients: int
    about: str
    scheduleSlots: Optional[List[TimeSlotSchema]] = None

class DoctorVerificationUpdate(BaseModel):
    status: str  # verified, rejected, pending

# ─── PATIENT SCHEMAS ───────────────────────────────────────
class PatientResponse(BaseModel):
    id: str
    name: str
    age: int
    gender: str
    email: str
    phone: str
    bloodGroup: str
    lastVisit: Optional[str] = None
    conditions: List[str]
    allergies: List[str]

class VitalsSchema(BaseModel):
    bloodPressure: str
    heartRate: str
    temperature: str
    weight: str
    spo2: str
    date: str

class MedicalRecordSchema(BaseModel):
    id: str
    patientId: str
    type: str
    date: str
    title: str
    description: str
    doctorName: Optional[str] = None

# ─── APPOINTMENT SCHEMAS ───────────────────────────────────
class AppointmentCreate(BaseModel):
    patientId: Optional[str] = None
    patientName: Optional[str] = None
    doctorId: str
    doctorName: Optional[str] = None
    specialization: Optional[str] = None
    date: str  # YYYY-MM-DD
    time: str  # e.g., '10:00 AM'
    consultationType: str = "video"
    reason: Optional[str] = "Consultation"

class AppointmentResponse(BaseModel):
    id: str
    patientId: str
    patientName: str
    doctorId: str
    doctorName: str
    specialization: str
    date: str
    time: str
    consultationType: str
    status: str
    reason: str
    meetingLink: Optional[str] = None

# ─── PRESCRIPTION SCHEMAS ──────────────────────────────────
class MedicineSchema(BaseModel):
    name: str
    dosage: str
    frequency: str
    duration: str
    instructions: str

class PrescriptionCreate(BaseModel):
    patientId: str
    patientName: Optional[str] = None
    doctorId: Optional[str] = None
    doctorName: Optional[str] = None
    diagnosis: str
    medicines: List[MedicineSchema]
    notes: Optional[str] = ""
    followUpDate: Optional[str] = ""

class PrescriptionResponse(BaseModel):
    id: str
    doctorId: str
    doctorName: str
    patientId: str
    patientName: str
    date: str
    diagnosis: str
    medicines: List[MedicineSchema]
    notes: str
    followUpDate: str
    status: str
    fileUrl: Optional[str] = None

# ─── MEDICATION SCHEMAS ────────────────────────────────────
class MedicationCreate(BaseModel):
    patientId: Optional[str] = None
    name: str
    dosage: str
    time: str
    instructions: Optional[str] = ""
    status: Optional[str] = "pending"
    prescriptionId: Optional[str] = None

class MedicationResponse(BaseModel):
    id: str
    name: str
    dosage: str
    time: str
    instructions: str
    status: str
    prescriptionId: Optional[str] = None

# ─── NOTIFICATION SCHEMAS ──────────────────────────────────
class NotificationResponse(BaseModel):
    id: str
    type: str
    title: str
    message: str
    time: str
    read: bool

# ─── CONSULTATION SCHEMAS ──────────────────────────────────
class ConsultationSessionResponse(BaseModel):
    id: str
    appointmentId: Optional[str] = None
    doctorId: str
    patientId: str
    roomName: str
    meetingLink: str
    status: str

# ─── AI & OCR SCHEMAS ──────────────────────────────────────
class AIChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = None

class AIChatResponse(BaseModel):
    answer: str
    sources: Optional[List[str]] = None

class OCRResponse(BaseModel):
    success: bool
    message: str
    extractedText: Optional[str] = None
    detectedMedicines: Optional[List[MedicineSchema]] = None
    diagnosis: Optional[str] = None

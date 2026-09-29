import enum
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Integer, Float, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from backend.app.database import Base

class UserRole(str, enum.Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"

class VerificationStatus(str, enum.Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default=UserRole.PATIENT.value, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    patient = relationship("Patient", back_populates="user", uselist=False, cascade="all, delete-orphan")
    doctor = relationship("Doctor", back_populates="user", uselist=False, cascade="all, delete-orphan")


class Patient(Base):
    __tablename__ = "patients"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    name = Column(String, nullable=False)
    age = Column(Integer, default=30)
    gender = Column(String, default="Other")
    email = Column(String, index=True)
    phone = Column(String)
    blood_group = Column(String, default="O+")
    last_visit = Column(String, nullable=True)
    conditions = Column(JSON, default=list)  # list of strings
    allergies = Column(JSON, default=list)   # list of strings
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="patient")
    appointments = relationship("Appointment", back_populates="patient", cascade="all, delete-orphan")
    prescriptions = relationship("Prescription", back_populates="patient", cascade="all, delete-orphan")
    medications = relationship("Medication", back_populates="patient", cascade="all, delete-orphan")


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)
    experience = Column(Integer, default=0)
    rating = Column(Float, default=5.0)
    fee = Column(Integer, default=500)
    availability = Column(String, default="Mon-Fri")
    next_slot = Column(String, default="Today, 3:00 PM")
    qualifications = Column(String, default="MBBS")
    hospital = Column(String, default="Arogya Telehealth Center")
    consultation_type = Column(JSON, default=lambda: ["video", "audio"])
    registration_id = Column(String, unique=True, index=True)
    verification_status = Column(String, default=VerificationStatus.PENDING.value)
    total_patients = Column(Integer, default=0)
    about = Column(Text, default="")
    schedule_slots = Column(JSON, default=list)  # list of {time: str, available: bool}
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="doctor")
    appointments = relationship("Appointment", back_populates="doctor", cascade="all, delete-orphan")
    prescriptions = relationship("Prescription", back_populates="doctor", cascade="all, delete-orphan")


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patients.id"), nullable=False)
    patient_name = Column(String, nullable=False)
    doctor_id = Column(String, ForeignKey("doctors.id"), nullable=False)
    doctor_name = Column(String, nullable=False)
    specialization = Column(String, default="General")
    date = Column(String, nullable=False)   # YYYY-MM-DD
    time = Column(String, nullable=False)   # e.g., '10:00 AM'
    consultation_type = Column(String, default="video")
    status = Column(String, default="upcoming")  # upcoming, completed, cancelled, waiting
    reason = Column(Text, default="Consultation")
    meeting_link = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="appointments")
    doctor = relationship("Doctor", back_populates="appointments")


class Prescription(Base):
    __tablename__ = "prescriptions"

    id = Column(String, primary_key=True, index=True)
    doctor_id = Column(String, ForeignKey("doctors.id"), nullable=False)
    doctor_name = Column(String, nullable=False)
    patient_id = Column(String, ForeignKey("patients.id"), nullable=False)
    patient_name = Column(String, nullable=False)
    date = Column(String, nullable=False)
    diagnosis = Column(Text, default="")
    medicines = Column(JSON, default=list)  # list of {name, dosage, frequency, duration, instructions}
    notes = Column(Text, default="")
    follow_up_date = Column(String, default="")
    status = Column(String, default="active")  # active, completed
    file_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="prescriptions")
    doctor = relationship("Doctor", back_populates="prescriptions")


class Medication(Base):
    __tablename__ = "medications"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patients.id"), nullable=False)
    name = Column(String, nullable=False)
    dosage = Column(String, nullable=False)
    time = Column(String, nullable=False)
    instructions = Column(String, default="")
    status = Column(String, default="pending")  # pending, taken, missed
    prescription_id = Column(String, nullable=True)
    date = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="medications")


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patients.id"), nullable=False)
    type = Column(String, default="consultation")  # consultation, prescription, upload, medication
    date = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, default="")
    doctor_name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Vitals(Base):
    __tablename__ = "vitals"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patients.id"), nullable=False)
    blood_pressure = Column(String, default="120/80 mmHg")
    heart_rate = Column(String, default="72 bpm")
    temperature = Column(String, default="98.4 °F")
    weight = Column(String, default="68 kg")
    spo2 = Column(String, default="98%")
    date = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, nullable=True)
    role = Column(String, default="patient")
    type = Column(String, default="general")  # appointment, medication, prescription, general
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    time = Column(String, nullable=False)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Consultation(Base):
    __tablename__ = "consultations"

    id = Column(String, primary_key=True, index=True)
    appointment_id = Column(String, nullable=True)
    doctor_id = Column(String, nullable=False)
    patient_id = Column(String, nullable=False)
    room_name = Column(String, nullable=False)
    meeting_link = Column(String, nullable=False)
    status = Column(String, default="waiting")  # waiting, active, completed
    started_at = Column(DateTime, nullable=True)
    ended_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

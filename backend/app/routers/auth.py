import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import User, Patient, Doctor, UserRole, VerificationStatus
from backend.app.schemas import RegisterRequest, LoginRequest, TokenResponse, UserResponse
from backend.app.services.auth_service import (
    verify_password, get_password_hash, create_access_token, get_current_user
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    # Check if user email already exists
    existing = db.query(User).filter(User.email == req.email.lower()).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email address already exists."
        )

    user_id = f"usr-{uuid.uuid4().hex[:8]}"
    role = req.role.lower()
    if role not in [UserRole.PATIENT.value, UserRole.DOCTOR.value, UserRole.ADMIN.value]:
        role = UserRole.PATIENT.value

    user = User(
        id=user_id,
        email=req.email.lower(),
        hashed_password=get_password_hash(req.password),
        role=role
    )
    db.add(user)

    profile_data = {}
    if role == UserRole.PATIENT.value:
        pat_id = f"pat-{uuid.uuid4().hex[:6]}"
        patient = Patient(
            id=pat_id,
            user_id=user_id,
            name=req.name,
            age=req.age or 30,
            gender=req.gender or "Other",
            email=req.email.lower(),
            phone=req.phone or "+91 99999 99999",
            blood_group=req.blood_group or "O+",
            conditions=[],
            allergies=[]
        )
        db.add(patient)
        profile_data = {"id": pat_id, "name": req.name}

    elif role == UserRole.DOCTOR.value:
        doc_id = f"doc-{uuid.uuid4().hex[:6]}"
        doctor = Doctor(
            id=doc_id,
            user_id=user_id,
            name=req.name,
            specialization=req.specialization or "General Physician",
            qualifications=req.qualifications or "MBBS",
            hospital=req.hospital or "Arogya Telehealth Network",
            registration_id=req.registration_id or f"MCI-{uuid.uuid4().hex[:6].upper()}",
            experience=req.experience or 5,
            fee=req.fee or 500,
            about=req.about or f"Consultant {req.specialization or 'physician'} on Arogya Setu.",
            verification_status=VerificationStatus.PENDING.value
        )
        db.add(doctor)
        profile_data = {"id": doc_id, "name": req.name}

    db.commit()
    db.refresh(user)

    access_token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "name": req.name,
            "profile": profile_data
        }
    }

@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    email = req.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Optional role check if requested role doesn't match
    if req.role and req.role.lower() != user.role:
        # Allow admin to switch or warn
        pass

    profile_data = {}
    name = user.email.split("@")[0].replace(".", " ").title()

    if user.role == UserRole.PATIENT.value and user.patient:
        profile_data = {"id": user.patient.id, "name": user.patient.name}
        name = user.patient.name
    elif user.role == UserRole.DOCTOR.value and user.doctor:
        profile_data = {
            "id": user.doctor.id,
            "name": user.doctor.name,
            "verificationStatus": user.doctor.verification_status
        }
        name = user.doctor.name

    access_token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "name": name,
            "profile": profile_data
        }
    }

@router.get("/me")
def get_current_user_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile_data = {}
    name = current_user.email.split("@")[0].title()
    if current_user.role == UserRole.PATIENT.value and current_user.patient:
        p = current_user.patient
        profile_data = {
            "id": p.id,
            "name": p.name,
            "age": p.age,
            "gender": p.gender,
            "bloodGroup": p.blood_group,
            "phone": p.phone
        }
        name = p.name
    elif current_user.role == UserRole.DOCTOR.value and current_user.doctor:
        d = current_user.doctor
        profile_data = {
            "id": d.id,
            "name": d.name,
            "specialization": d.specialization,
            "verificationStatus": d.verification_status,
            "rating": d.rating
        }
        name = d.name

    return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
        "name": name,
        "profile": profile_data
    }

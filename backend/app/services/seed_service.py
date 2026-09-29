from sqlalchemy.orm import Session
from backend.app.models import (
    User, Patient, Doctor, Appointment, Prescription,
    Medication, MedicalRecord, Vitals, Notification, UserRole, VerificationStatus
)
from backend.app.services.auth_service import get_password_hash

def seed_database(db: Session):
    # Check if already seeded
    if db.query(User).first():
        return

    print("Seeding database with demo data...")

    # ─── USERS ───────────────────────────────────────────────────
    # 1. Admin
    admin_user = User(
        id="usr-admin-1",
        email="admin@arogyasetu.com",
        hashed_password=get_password_hash("admin123"),
        role=UserRole.ADMIN.value
    )
    db.add(admin_user)

    # 2. Doctor user (Dr. Ananya Sharma)
    doc1_user = User(
        id="usr-doc-1",
        email="dr.ananya@email.com",
        hashed_password=get_password_hash("doctor123"),
        role=UserRole.DOCTOR.value
    )
    db.add(doc1_user)

    # Doctor 2 user (Dr. Rahul Mehta)
    doc2_user = User(
        id="usr-doc-2",
        email="dr.rahul@email.com",
        hashed_password=get_password_hash("doctor123"),
        role=UserRole.DOCTOR.value
    )
    db.add(doc2_user)

    # Doctor 3 user (Dr. Priya Patel)
    doc3_user = User(
        id="usr-doc-3",
        email="dr.priyapatel@email.com",
        hashed_password=get_password_hash("doctor123"),
        role=UserRole.DOCTOR.value
    )
    db.add(doc3_user)

    # 3. Patient user (Priya Sharma)
    pat1_user = User(
        id="usr-pat-1",
        email="priya.sharma@email.com",
        hashed_password=get_password_hash("patient123"),
        role=UserRole.PATIENT.value
    )
    db.add(pat1_user)

    # Patient 2 user (Rajesh Kumar)
    pat2_user = User(
        id="usr-pat-2",
        email="rajesh.kumar@email.com",
        hashed_password=get_password_hash("patient123"),
        role=UserRole.PATIENT.value
    )
    db.add(pat2_user)

    db.flush()

    # ─── DOCTORS ─────────────────────────────────────────────────
    default_slots = [
        {"time": "09:00 AM", "available": True},
        {"time": "09:30 AM", "available": True},
        {"time": "10:00 AM", "available": False},
        {"time": "10:30 AM", "available": True},
        {"time": "11:00 AM", "available": True},
        {"time": "11:30 AM", "available": True},
        {"time": "02:00 PM", "available": True},
        {"time": "02:30 PM", "available": False},
        {"time": "03:00 PM", "available": True},
        {"time": "03:30 PM", "available": True},
        {"time": "04:00 PM", "available": True},
        {"time": "04:30 PM", "available": True},
    ]

    doc1 = Doctor(
        id="doc-1",
        user_id="usr-doc-1",
        name="Dr. Ananya Sharma",
        specialization="Cardiologist",
        experience=12,
        rating=4.9,
        fee=800,
        availability="Mon–Sat",
        next_slot="Today, 3:00 PM",
        qualifications="MBBS, MD (Cardiology), DM",
        hospital="Apollo Heart Institute, Mumbai",
        consultation_type=["video", "audio"],
        registration_id="MCI-2014-MH-48291",
        verification_status=VerificationStatus.VERIFIED.value,
        total_patients=2840,
        about="Senior cardiologist with 12 years of experience in interventional cardiology and heart failure management.",
        schedule_slots=default_slots
    )

    doc2 = Doctor(
        id="doc-2",
        user_id="usr-doc-2",
        name="Dr. Rahul Mehta",
        specialization="General Physician",
        experience=8,
        rating=4.7,
        fee=400,
        availability="Mon–Fri",
        next_slot="Today, 5:00 PM",
        qualifications="MBBS, MD (Internal Medicine)",
        hospital="Max Super Speciality Hospital, Delhi",
        consultation_type=["video"],
        registration_id="DMC-2018-DL-31045",
        verification_status=VerificationStatus.VERIFIED.value,
        total_patients=1920,
        about="Dedicated physician focused on preventive healthcare, lifestyle diseases, and family medicine.",
        schedule_slots=default_slots
    )

    doc3 = Doctor(
        id="doc-3",
        user_id="usr-doc-3",
        name="Dr. Priya Patel",
        specialization="Dermatologist",
        experience=10,
        rating=4.8,
        fee=600,
        availability="Tue–Sun",
        next_slot="Tomorrow, 10:00 AM",
        qualifications="MBBS, MD (Dermatology, Venereology & Leprosy)",
        hospital="Fortis Hospital, Bengaluru",
        consultation_type=["video", "audio"],
        registration_id="KMC-2016-KA-77412",
        verification_status=VerificationStatus.VERIFIED.value,
        total_patients=2340,
        about="Consultant dermatologist specializing in clinical dermatology, acne treatments, and hair disorders.",
        schedule_slots=default_slots
    )

    doc4 = Doctor(
        id="doc-4",
        name="Dr. Suresh Kumar",
        specialization="Orthopedic",
        experience=15,
        rating=4.6,
        fee=700,
        availability="Mon–Fri",
        next_slot="Today, 4:30 PM",
        qualifications="MBBS, MS (Orthopedics), MCh",
        hospital="Manipal Hospital, Chennai",
        consultation_type=["video"],
        registration_id="TNMC-2011-TN-19823",
        verification_status=VerificationStatus.PENDING.value,
        total_patients=3100,
        about="Orthopedic surgeon with extensive expertise in joint replacement, sports injuries, and arthritis care.",
        schedule_slots=default_slots
    )

    db.add_all([doc1, doc2, doc3, doc4])

    # ─── PATIENTS ────────────────────────────────────────────────
    pat1 = Patient(
        id="pat-1",
        user_id="usr-pat-1",
        name="Priya Sharma",
        age=28,
        gender="Female",
        email="priya.sharma@email.com",
        phone="+91 98765 43210",
        blood_group="B+",
        last_visit="2026-03-15",
        conditions=["Hypertension", "Mild Asthma"],
        allergies=["Penicillin", "Dust Mites"]
    )

    pat2 = Patient(
        id="pat-2",
        user_id="usr-pat-2",
        name="Rajesh Kumar",
        age=52,
        gender="Male",
        email="rajesh.kumar@email.com",
        phone="+91 87654 32109",
        blood_group="O+",
        last_visit="2026-03-20",
        conditions=["Type 2 Diabetes", "Dyslipidemia"],
        allergies=["Sulfa drugs"]
    )

    pat3 = Patient(
        id="pat-3",
        name="Sunita Verma",
        age=35,
        gender="Female",
        email="sunita.verma@email.com",
        phone="+91 76543 21098",
        blood_group="A+",
        last_visit="2026-03-22",
        conditions=["Hypothyroidism"],
        allergies=["None known"]
    )

    pat4 = Patient(
        id="pat-4",
        name="Amit Patel",
        age=41,
        gender="Male",
        email="amit.patel@email.com",
        phone="+91 65432 10987",
        blood_group="AB+",
        last_visit="2026-03-10",
        conditions=["Chronic Migraine"],
        allergies=["Aspirin"]
    )

    pat5 = Patient(
        id="pat-5",
        name="Deepa Nair",
        age=24,
        gender="Female",
        email="deepa.nair@email.com",
        phone="+91 54321 09876",
        blood_group="O-",
        last_visit="2026-03-25",
        conditions=["Seasonal Allergies"],
        allergies=["Pollen", "Latex"]
    )

    db.add_all([pat1, pat2, pat3, pat4, pat5])

    # ─── APPOINTMENTS ────────────────────────────────────────────
    appts = [
        Appointment(
            id="appt-1",
            patient_id="pat-1",
            patient_name="Priya Sharma",
            doctor_id="doc-1",
            doctor_name="Dr. Ananya Sharma",
            specialization="Cardiologist",
            date="2026-03-30",
            time="10:00 AM",
            consultation_type="video",
            status="upcoming",
            reason="Routine hypertension follow-up and review of recent BP readings.",
            meeting_link="https://meet.arogyasetu.demo/room/appt-1"
        ),
        Appointment(
            id="appt-2",
            patient_id="pat-1",
            patient_name="Priya Sharma",
            doctor_id="doc-3",
            doctor_name="Dr. Priya Patel",
            specialization="Dermatologist",
            date="2026-04-02",
            time="02:30 PM",
            consultation_type="video",
            status="upcoming",
            reason="Skin rash follow-up and allergy patch test result discussion.",
            meeting_link="https://meet.arogyasetu.demo/room/appt-2"
        ),
        Appointment(
            id="appt-3",
            patient_id="pat-2",
            patient_name="Rajesh Kumar",
            doctor_id="doc-2",
            doctor_name="Dr. Rahul Mehta",
            specialization="General Physician",
            date="2026-03-28",
            time="11:30 AM",
            consultation_type="video",
            status="upcoming",
            reason="Quarterly diabetes monitoring, HbA1c review, and lifestyle counseling.",
            meeting_link="https://meet.arogyasetu.demo/room/appt-3"
        ),
        Appointment(
            id="appt-4",
            patient_id="pat-1",
            patient_name="Priya Sharma",
            doctor_id="doc-1",
            doctor_name="Dr. Ananya Sharma",
            specialization="Cardiologist",
            date="2026-03-15",
            time="10:00 AM",
            consultation_type="video",
            status="completed",
            reason="Initial cardiology consultation for palpitations.",
            meeting_link="https://meet.arogyasetu.demo/room/appt-4"
        ),
        Appointment(
            id="appt-5",
            patient_id="pat-3",
            patient_name="Sunita Verma",
            doctor_id="doc-1",
            doctor_name="Dr. Ananya Sharma",
            specialization="Cardiologist",
            date="2026-03-29",
            time="04:00 PM",
            consultation_type="video",
            status="upcoming",
            reason="Chest discomfort on exertion evaluation.",
            meeting_link="https://meet.arogyasetu.demo/room/appt-5"
        )
    ]
    db.add_all(appts)

    # ─── PRESCRIPTIONS ───────────────────────────────────────────
    rx1 = Prescription(
        id="rx-1",
        doctor_id="doc-1",
        doctor_name="Dr. Ananya Sharma",
        patient_id="pat-1",
        patient_name="Priya Sharma",
        date="2026-03-15",
        diagnosis="Essential Hypertension (Stage 1)",
        medicines=[
            {"name": "Telmisartan 40mg", "dosage": "40mg", "frequency": "Once daily (Morning)", "duration": "30 days", "instructions": "Take after breakfast with plenty of water"},
            {"name": "Amlodipine 5mg", "dosage": "5mg", "frequency": "Once daily (Night)", "duration": "30 days", "instructions": "Take at bedtime"}
        ],
        notes="Maintain low-sodium diet, 30 min daily walking, monitor BP twice weekly.",
        follow_up_date="2026-04-15",
        status="active"
    )

    rx2 = Prescription(
        id="rx-2",
        doctor_id="doc-3",
        doctor_name="Dr. Priya Patel",
        patient_id="pat-1",
        patient_name="Priya Sharma",
        date="2026-03-18",
        diagnosis="Contact Dermatitis",
        medicines=[
            {"name": "Desonide Cream 0.05%", "dosage": "Apply thin layer", "frequency": "Twice daily", "duration": "10 days", "instructions": "Apply to affected areas only"},
            {"name": "Cetirizine 10mg", "dosage": "10mg", "frequency": "Once daily (Night)", "duration": "7 days", "instructions": "Take after dinner; may cause drowsiness"}
        ],
        notes="Avoid perfumed soaps and harsh detergents. Keep skin moisturized.",
        follow_up_date="2026-03-28",
        status="active"
    )
    db.add_all([rx1, rx2])

    # ─── MEDICATIONS (TRACKER) ───────────────────────────────────
    meds = [
        Medication(
            id="med-1",
            patient_id="pat-1",
            name="Telmisartan",
            dosage="40mg",
            time="08:00 AM",
            instructions="Take with water after breakfast",
            status="taken",
            prescription_id="rx-1",
            date="2026-03-29"
        ),
        Medication(
            id="med-2",
            patient_id="pat-1",
            name="Cetirizine",
            dosage="10mg",
            time="02:00 PM",
            instructions="Take after lunch if needed for itch",
            status="pending",
            prescription_id="rx-2",
            date="2026-03-29"
        ),
        Medication(
            id="med-3",
            patient_id="pat-1",
            name="Amlodipine",
            dosage="5mg",
            time="09:00 PM",
            instructions="Take at bedtime",
            status="pending",
            prescription_id="rx-1",
            date="2026-03-29"
        )
    ]
    db.add_all(meds)

    # ─── VITALS & MEDICAL RECORDS ────────────────────────────────
    vitals1 = Vitals(
        id="vit-1",
        patient_id="pat-1",
        blood_pressure="128/82 mmHg",
        heart_rate="74 bpm",
        temperature="98.6 °F",
        weight="58 kg",
        spo2="99%",
        date="2026-03-28"
    )
    db.add(vitals1)

    rec1 = MedicalRecord(
        id="rec-1",
        patient_id="pat-1",
        type="consultation",
        date="2026-03-15",
        title="Cardiology Consultation",
        description="Routine hypertension checkup with Dr. Ananya Sharma. BP was 134/86. Advised Telmisartan and lifestyle changes.",
        doctor_name="Dr. Ananya Sharma"
    )
    rec2 = MedicalRecord(
        id="rec-2",
        patient_id="pat-1",
        type="prescription",
        date="2026-03-15",
        title="Prescription Issued — Dr. Ananya Sharma",
        description="Prescribed Telmisartan 40mg and Amlodipine 5mg for 30 days.",
        doctor_name="Dr. Ananya Sharma"
    )
    db.add_all([rec1, rec2])

    # ─── NOTIFICATIONS ───────────────────────────────────────────
    notifs = [
        Notification(
            id="notif-1",
            role="patient",
            type="appointment",
            title="Appointment Confirmed",
            message="Your video consultation with Dr. Ananya Sharma is scheduled for tomorrow at 10:00 AM.",
            time="10 mins ago",
            read=False
        ),
        Notification(
            id="notif-2",
            role="patient",
            type="medication",
            title="Medication Reminder",
            message="Time to take your afternoon dose of Cetirizine 10mg.",
            time="1 hour ago",
            read=False
        ),
        Notification(
            id="notif-3",
            role="patient",
            type="prescription",
            title="New Prescription Available",
            message="Dr. Priya Patel has issued a new prescription for your dermatitis consultation.",
            time="Yesterday",
            read=True
        ),
        Notification(
            id="notif-4",
            role="doctor",
            type="appointment",
            title="New Appointment Scheduled",
            message="Priya Sharma has booked a follow-up consultation for tomorrow at 10:00 AM.",
            time="2 hours ago",
            read=False
        ),
        Notification(
            id="notif-5",
            role="admin",
            type="general",
            title="New Doctor Verification Request",
            message="Dr. Suresh Kumar submitted credentials for orthopedic surgery verification.",
            time="30 mins ago",
            read=False
        )
    ]
    db.add_all(notifs)

    db.commit()
    print("Database seeding completed successfully!")

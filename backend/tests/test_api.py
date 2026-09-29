import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.database import SessionLocal
from backend.app.services.seed_service import seed_database

client = TestClient(app)

@pytest.fixture(scope="session", autouse=True)
def setup_db():
    db = SessionLocal()
    seed_database(db)
    db.close()

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_patient_login():
    response = client.post("/api/auth/login", json={
        "email": "priya.sharma@email.com",
        "password": "patient123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["role"] == "patient"

def test_doctor_login():
    response = client.post("/api/auth/login", json={
        "email": "dr.ananya@email.com",
        "password": "doctor123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["role"] == "doctor"

def test_admin_login():
    response = client.post("/api/auth/login", json={
        "email": "admin@arogyasetu.com",
        "password": "admin123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["role"] == "admin"

def test_get_doctors():
    response = client.get("/api/doctors")
    assert response.status_code == 200
    doctors = response.json()
    assert len(doctors) >= 3

def test_appointment_booking_and_double_booking_prevention():
    import uuid
    test_date = f"2026-11-20"
    test_time = f"{uuid.uuid4().hex[:4]} Slot"
    # 1. Book appointment
    book_payload = {
        "patientId": "pat-1",
        "patientName": "Priya Sharma",
        "doctorId": "doc-2",
        "date": test_date,
        "time": test_time,
        "reason": "General Health Checkup",
        "consultationType": "video"
    }
    r1 = client.post("/api/appointments", json=book_payload)
    assert r1.status_code == 200
    created = r1.json()
    assert created["status"] == "upcoming"

    # 2. Try double booking same doctor at same date and time
    r2 = client.post("/api/appointments", json=book_payload)
    assert r2.status_code == 409
    assert "already has an appointment booked" in r2.json()["detail"]

def test_prescriptions():
    response = client.get("/api/prescriptions?patientId=pat-1")
    assert response.status_code == 200
    prescriptions = response.json()
    assert len(prescriptions) >= 1

def test_medication_tracker():
    response = client.get("/api/medications?patientId=pat-1")
    assert response.status_code == 200
    meds = response.json()
    assert len(meds) >= 1
    med_id = meds[0]["id"]

    # Mark as taken
    taken_resp = client.put(f"/api/medications/{med_id}/taken")
    assert taken_resp.status_code == 200
    assert taken_resp.json()["success"] is True

def test_ai_health_assistant():
    response = client.post("/api/ai/chat", json={
        "message": "How should I prepare for my upcoming cardiology video consultation?"
    })
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert len(data["answer"]) > 20
    assert "sources" in data

def test_admin_doctor_verification():
    verify_resp = client.put("/api/admin/doctors/doc-4/verify", json={
        "status": "verified"
    })
    assert verify_resp.status_code == 200
    assert verify_resp.json()["verificationStatus"] == "verified"

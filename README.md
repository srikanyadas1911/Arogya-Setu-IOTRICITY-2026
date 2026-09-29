# Arogya Setu — AI-Driven Telemedicine & Health Management
**IOTRICITY 2026 Hackathon**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://arogya-setu-iotricity-2026-oy6wsfpil-srikanyadas1911.vercel.app/)
[![API Docs](https://img.shields.io/badge/FastAPI-Docs-009688?style=for-the-badge&logo=fastapi)](http://localhost:8000/docs)
[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![React](https://img.shields.io/badge/React-18%2B-61DAFB?style=for-the-badge&logo=react)](https://react.dev)

Arogya Setu is a comprehensive, production-grade telemedicine and holistic health management platform designed to deliver accessible, secure, and intelligent healthcare services to patients, healthcare providers, and administrative personnel.

---

## 🌟 Key Features

### 👤 Patient System
- **Doctor Discovery & Filtering**: Search certified doctors by medical specialty, rating, fee, and real-time slot availability.
- **Smart Appointment Booking**: Automated conflict checking preventing duplicate or overlapping bookings.
- **Teleconsultation & Video Rooms**: Live session handling with meeting access, call timer, and doctor-patient connectivity.
- **Digital Prescriptions**: Access, view, and download prescriptions issued by verified medical professionals.
- **Prescription Upload & OCR**: Upload image or PDF prescriptions for automated text extraction and medicine detection.
- **Medication Tracker**: Daily schedule tracking with visual timestamps, taken/pending statuses, and ad-hoc medicine addition.
- **AI Health Assistant**: Intelligent symptom triage and clinical guidance powered by a Retrieval-Augmented Generation (RAG) engine.

### 🩺 Doctor System
- **Clinical Dashboard**: Real-time appointment schedule, active patient metrics, and consultation metrics.
- **Patient Management & Medical History**: Review patient vitals, diagnosis trends, and historical records.
- **Digital Prescription Creation**: Generate structured e-prescriptions with drug dosage, timing, duration, and patient instructions.
- **Schedule Management**: Configure working hours, buffer times, and availability slots.
- **Consultation Suite**: One-click consultation launching, prescription drafting, and session wrap-up.

### 🛡️ Admin System
- **Healthcare Professional Verification**: Review medical licenses (MCI/KMC/DMC) with one-click approve/reject actions.
- **Platform Analytics & Reports**: Platform-wide metrics on consultations, doctor retention, specialty distributions, and completion rates.
- **Doctor & Patient Oversight**: Centralized directory and record management.

---

## 🏗️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, TypeScript, Vite, React Router, Lucide Icons, Recharts, Vanilla CSS |
| **Backend** | Python, FastAPI, Uvicorn, Pydantic, Alembic |
| **Database** | PostgreSQL (Production) / SQLite (Zero-Config Development Fallback), SQLAlchemy ORM |
| **Security** | JWT Authentication, Bcrypt Password Hashing, Role-Based Access Control (RBAC), CORS Protection |
| **AI / ML** | RAG Clinical Guidance Engine, Prescription OCR Pipeline |

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Setup virtual environment
python -m venv venv
.\venv\Scripts\activate   # Windows
# source venv/bin/activate # Linux/macOS

# Install dependencies
pip install -r requirements.txt

# Start backend server (Auto-seeds demo data)
python run.py
```
- Interactive Swagger UI: `http://localhost:8000/docs`
- Health Endpoint: `http://localhost:8000/api/health`

### 2. Frontend Setup
```bash
# In repository root
npm install

# Start Vite dev server
npm run dev
```
- Access web application: `http://localhost:5173`

---

## 🔑 Demo Accounts

The database comes pre-seeded with sample accounts for all three roles:

| Role | Email | Password |
|---|---|---|
| **Patient** | `priya.sharma@email.com` | `patient123` |
| **Doctor** | `dr.ananya@email.com` | `doctor123` |
| **Admin** | `admin@arogyasetu.com` | `admin123` |

---

## 🧪 Testing

Run backend automated test suite:
```bash
pytest backend/tests
```

Build frontend for production:
```bash
npm run build
```

---

## 🌐 Production Deployment

Refer to [`DEPLOYMENT.md`](DEPLOYMENT.md) for full instructions on deploying to **Vercel** (frontend), **Render / Railway** (FastAPI backend), and **Neon / Supabase** (PostgreSQL).

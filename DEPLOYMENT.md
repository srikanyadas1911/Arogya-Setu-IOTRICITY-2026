# Arogya Setu — Production & Cloud Deployment Guide
**IOTRICITY 2026 Hackathon**

---

## 1. System Architecture Overview

```
[ React + TypeScript + Vite (Vercel) ]
                  |
                  | HTTPS REST API (VITE_API_URL)
                  v
       [ FastAPI Backend (Render / Railway) ]
                  |
        +---------+---------+
        |                   |
        v                   v
[ PostgreSQL (Neon/Supabase) ]  [ AI & OCR Services (RAG engine) ]
```

---

## 2. Quick Demo Credentials (Pre-seeded)

| Role | Email | Password |
|---|---|---|
| **Patient** | `priya.sharma@email.com` | `patient123` |
| **Doctor** | `dr.ananya@email.com` | `doctor123` |
| **Admin** | `admin@arogyasetu.com` | `admin123` |

---

## 3. Local Development Startup

### A. Backend (FastAPI)
```bash
# Navigate to backend directory
cd backend

# Create & activate virtual environment (Windows)
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations (or will auto-seed upon startup)
alembic upgrade head

# Launch backend server
python run.py
```
- API Documentation (Swagger): `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/api/health`

### B. Frontend (Vite + React)
```bash
# In repository root
npm install
npm run dev
```
- Web Application: `http://localhost:5173`

---

## 4. Backend Deployment (Render / Railway)

### Option 1: Render.com (Web Service)
1. Link your GitHub repository `Arogya-Setu-IOTRICITY-2026` to Render.
2. Choose **Web Service**.
3. Set the following build and startup parameters:
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set Environment Variables in Render Dashboard:
   ```env
   DATABASE_URL=postgresql://user:password@your-neon-host.neon.tech/arogyasetu?sslmode=require
   SECRET_KEY=generate_a_secure_jwt_secret_key_here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=1440
   ENVIRONMENT=production
   ALLOWED_ORIGINS=https://arogya-setu-iotricity-2026-oy6wsfpil-srikanyadas1911.vercel.app,http://localhost:5173
   AI_API_KEY=your_optional_openai_or_gemini_key
   ```
5. Once deployed, note your service URL: `https://your-backend.onrender.com`.

### Option 2: Railway.app
1. Create a new Railway project and deploy from the GitHub repo.
2. Set Root Directory to `backend/`.
3. Add a PostgreSQL plugin inside Railway (Railway will auto-generate `DATABASE_URL`).
4. Set start command to `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.

---

## 5. Managed PostgreSQL Database (Neon / Supabase)

1. Create a free PostgreSQL instance on **[Neon.tech](https://neon.tech)** or **[Supabase.com](https://supabase.com)**.
2. Copy the Connection String (URI format):
   ```
   postgresql://[user]:[password]@[host]/[dbname]?sslmode=require
   ```
3. Set `DATABASE_URL` in your backend environment variables.
4. Run Alembic migrations:
   ```bash
   alembic upgrade head
   ```
   *Note: If no database URL is supplied, the backend seamlessly falls back to local SQLite for zero-config offline development.*

---

## 6. Frontend Deployment (Vercel)

The frontend is already configured to deploy to Vercel.

1. Navigate to your project settings in the **Vercel Dashboard**.
2. Go to **Settings** -> **Environment Variables**.
3. Add:
   ```env
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
4. Trigger a redeploy (or push to the repository branch).

---

## 7. Verification Checklist

- [x] Backend Health: `GET /api/health` returns `{"status": "healthy"}`
- [x] Interactive Docs: `GET /docs` serves complete OpenAPI specification
- [x] Patient Authentication: Register and login flow with JWT token issuance
- [x] Doctor Directory & Filtering: Search by name, specialty, and verified status
- [x] Real-time Appointment Booking: Double-booking & slot collision prevention
- [x] Clinical Prescriptions: Doctor creation and patient download/view
- [x] AI Symptom Guidance: RAG-backed contextual clinical recommendations
- [x] Prescription OCR: File intake, text extraction, and medication parsing
- [x] Admin Oversight: Medical license approval/rejection and platform analytics

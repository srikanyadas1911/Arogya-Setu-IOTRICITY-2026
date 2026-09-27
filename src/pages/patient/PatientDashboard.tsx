import { useNavigate } from "react-router-dom";
import {
    Stethoscope,
    CalendarDays,
    MessageCircle,
    FileText,
    Clock,
    Pill,
    Activity,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

import "./PatientDashboard.css";

function PatientDashboard() {
    const navigate = useNavigate();

    return (
        <div className="patient-dashboard">

            {/* ================= HEADER ================= */}
            <header className="patient-header">

                <div>
                    <div className="portal-label">
                        PATIENT PORTAL
                    </div>

                    <h1>
                        Good morning 👋
                    </h1>

                    <p className="subtitle">
                        Here is your health overview for today.
                    </p>
                </div>

                <div className="health-status">
                    <CheckCircle2 size={20} />
                    <span>
                        Everything looks good
                    </span>
                </div>

            </header>


            {/* ================= SUMMARY CARDS ================= */}
            <section className="summary-grid">

                {/* Appointment */}
                <div className="summary-card">

                    <div className="summary-icon blue-bg">
                        <CalendarDays size={22} />
                    </div>

                    <div>
                        <p className="summary-label">
                            NEXT APPOINTMENT
                        </p>

                        <h2>
                            10:30 AM
                        </h2>

                        <p>
                            Today
                        </p>
                    </div>

                </div>


                {/* Medicines */}
                <div className="summary-card">

                    <div className="summary-icon green-bg">
                        <Pill size={22} />
                    </div>

                    <div>
                        <p className="summary-label">
                            MEDICATIONS
                        </p>

                        <h2>
                            3 / 4
                        </h2>

                        <p>
                            Taken today
                        </p>
                    </div>

                </div>


                {/* Prescriptions */}
                <div className="summary-card">

                    <div className="summary-icon purple-bg">
                        <FileText size={22} />
                    </div>

                    <div>
                        <p className="summary-label">
                            PRESCRIPTIONS
                        </p>

                        <h2>
                            6
                        </h2>

                        <p>
                            Digital records
                        </p>
                    </div>

                </div>


                {/* Health Score */}
                <div className="summary-card">

                    <div className="summary-icon orange-bg">
                        <Activity size={22} />
                    </div>

                    <div>
                        <p className="summary-label">
                            HEALTH SCORE
                        </p>

                        <h2>
                            92%
                        </h2>

                        <p>
                            Excellent
                        </p>
                    </div>

                </div>

            </section>


            {/* ================= MAIN CONTENT ================= */}
            <main className="dashboard-main">

                {/* LEFT COLUMN */}
                <div className="dashboard-left">


                    {/* ================= UPCOMING APPOINTMENT ================= */}
                    <section className="dashboard-card">

                        <div className="card-header">

                            <div>
                                <h2>
                                    Upcoming Appointment
                                </h2>

                                <p>
                                    Your next consultation
                                </p>
                            </div>

                            <CalendarDays size={24} />

                        </div>


                        <div className="appointment-card">

                            <div className="doctor-avatar">
                                AS
                            </div>

                            <div className="appointment-info">

                                <h3>
                                    Dr. Ananya Sharma
                                </h3>

                                <p>
                                    General Physician
                                </p>

                                <div className="appointment-time">

                                    <Clock size={16} />

                                    <span>
                                        Today · 10:30 AM
                                    </span>

                                </div>

                            </div>


                            <button
                                className="primary-button"
                                onClick={() =>
                                    navigate("/patient/consultation")
                                }
                            >
                                Join Consultation
                                <ArrowRight size={17} />
                            </button>

                        </div>

                    </section>


                    {/* ================= MEDICATIONS ================= */}
                    <section className="dashboard-card">

                        <div className="card-header">

                            <div>
                                <h2>
                                    Today's Medication
                                </h2>

                                <p>
                                    Keep track of your medicines
                                </p>
                            </div>

                            <Pill size={24} />

                        </div>


                        <div className="medication-list">


                            {/* Vitamin D */}
                            <div className="medication-row">

                                <div className="medicine-info">

                                    <div className="medicine-icon">
                                        <Pill size={18} />
                                    </div>

                                    <div>
                                        <h3>
                                            Vitamin D
                                        </h3>

                                        <p>
                                            8:00 AM
                                        </p>
                                    </div>

                                </div>

                                <span className="medicine-status taken">
                                    Taken
                                </span>

                            </div>


                            {/* Metformin */}
                            <div className="medication-row">

                                <div className="medicine-info">

                                    <div className="medicine-icon">
                                        <Pill size={18} />
                                    </div>

                                    <div>
                                        <h3>
                                            Metformin
                                        </h3>

                                        <p>
                                            1:00 PM
                                        </p>
                                    </div>

                                </div>

                                <span className="medicine-status taken">
                                    Taken
                                </span>

                            </div>


                            {/* Calcium */}
                            <div className="medication-row">

                                <div className="medicine-info">

                                    <div className="medicine-icon">
                                        <Pill size={18} />
                                    </div>

                                    <div>
                                        <h3>
                                            Calcium
                                        </h3>

                                        <p>
                                            6:00 PM
                                        </p>
                                    </div>

                                </div>

                                <span className="medicine-status pending">
                                    Pending
                                </span>

                            </div>


                            {/* Medicine X */}
                            <div className="medication-row">

                                <div className="medicine-info">

                                    <div className="medicine-icon">
                                        <Pill size={18} />
                                    </div>

                                    <div>
                                        <h3>
                                            Medicine X
                                        </h3>

                                        <p>
                                            9:00 PM
                                        </p>
                                    </div>

                                </div>

                                <span className="medicine-status pending">
                                    Pending
                                </span>

                            </div>

                        </div>

                    </section>

                </div>


                {/* RIGHT COLUMN */}
                <div className="dashboard-right">


                    {/* ================= QUICK ACTIONS ================= */}
                    <section className="dashboard-card">

                        <div className="card-header">

                            <div>
                                <h2>
                                    Quick Actions
                                </h2>

                                <p>
                                    Access your healthcare tools
                                </p>
                            </div>

                        </div>


                        <div className="quick-actions">


                            {/* Find Doctor */}
                            <button
                                className="quick-button"
                                onClick={() =>
                                    navigate("/patient/find-doctor")
                                }
                            >

                                <Stethoscope
                                    className="blue-bg"
                                    size={24}
                                />

                                <h3>
                                    Find a Doctor
                                </h3>

                                <p>
                                    Find doctors by specialty
                                </p>

                            </button>


                            {/* Book Appointment */}
                            <button
                                className="quick-button"
                                onClick={() =>
                                    navigate("/patient/book-appointment")
                                }
                            >

                                <CalendarDays
                                    className="blue-bg"
                                    size={24}
                                />

                                <h3>
                                    Book Appointment
                                </h3>

                                <p>
                                    Schedule a consultation
                                </p>

                            </button>


                            {/* AI Health Assistant */}
                            <button
                                className="quick-button"
                                onClick={() =>
                                    navigate("/patient/ai-assistant")
                                }
                            >

                                <MessageCircle
                                    className="green-icon"
                                    size={24}
                                />

                                <h3>
                                    AI Health Assistant
                                </h3>

                                <p>
                                    Ask your health questions
                                </p>

                            </button>


                            {/* Prescriptions */}
                            <button
                                className="quick-button"
                                onClick={() =>
                                    navigate("/patient/prescriptions")
                                }
                            >

                                <FileText
                                    className="purple-bg"
                                    size={24}
                                />

                                <h3>
                                    Prescriptions
                                </h3>

                                <p>
                                    View your digital records
                                </p>

                            </button>

                        </div>

                    </section>


                    {/* ================= RECENT ACTIVITY ================= */}
                    <section className="dashboard-card">

                        <div className="card-header">

                            <div>
                                <h2>
                                    Recent Health Activity
                                </h2>

                                <p>
                                    Your latest health updates
                                </p>
                            </div>

                            <Activity size={24} />

                        </div>


                        <div className="activity-list">


                            <div className="activity-item">

                                <div className="activity-icon">
                                    <CheckCircle2 size={18} />
                                </div>

                                <div>

                                    <h3>
                                        Medication taken
                                    </h3>

                                    <p>
                                        Vitamin D · Today, 8:05 AM
                                    </p>

                                </div>

                            </div>


                            <div className="activity-item">

                                <div className="activity-icon">
                                    <CalendarDays size={18} />
                                </div>

                                <div>

                                    <h3>
                                        Appointment scheduled
                                    </h3>

                                    <p>
                                        Dr. Ananya Sharma · Yesterday
                                    </p>

                                </div>

                            </div>


                            <div className="activity-item">

                                <div className="activity-icon">
                                    <FileText size={18} />
                                </div>

                                <div>

                                    <h3>
                                        Prescription added
                                    </h3>

                                    <p>
                                        Digital prescription · 2 days ago
                                    </p>

                                </div>

                            </div>


                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default PatientDashboard;
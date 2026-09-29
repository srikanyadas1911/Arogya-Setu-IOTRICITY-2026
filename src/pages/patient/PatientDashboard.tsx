import { useState, useEffect } from "react";
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
import {
    fetchAppointments,
    fetchMedications,
    fetchPrescriptions,
    fetchPatientHistory,
    getStoredUser,
} from "../../services/api";
import {
    type Appointment,
    type Medication,
    type Prescription,
    type MedicalRecord,
} from "../../data/mockData";
import "./PatientDashboard.css";

function PatientDashboard() {
    const navigate = useNavigate();

    const currentUser = getStoredUser();
    const patientName = currentUser?.name || "Priya Sharma";
    const patientId = currentUser?.profile?.id || "pat-1";

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [medications, setMedications] = useState<Medication[]>([]);
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [history, setHistory] = useState<MedicalRecord[]>([]);

    useEffect(() => {
        let isMounted = true;
        Promise.all([
            fetchAppointments(patientId),
            fetchMedications(patientId),
            fetchPrescriptions(patientId),
            fetchPatientHistory(patientId),
        ]).then(([appts, meds, rxs, hist]) => {
            if (isMounted) {
                setAppointments(appts);
                setMedications(meds);
                setPrescriptions(rxs);
                setHistory(hist);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [patientId]);

    const upcoming = appointments.find(
        (a) => a.status === "upcoming" || a.status === "confirmed"
    );

    const takenCount = medications.filter((m) => m.status === "taken").length;
    const totalMeds = medications.length || 4;

    const getInitials = (name: string) => {
        return name
            .replace("Dr.", "")
            .trim()
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <div className="patient-dashboard">
            {/* ================= HEADER ================= */}
            <header className="patient-header">
                <div>
                    <div className="portal-label">PATIENT PORTAL</div>
                    <h1>Good morning, {patientName.split(" ")[0]} 👋</h1>
                    <p className="subtitle">Here is your health overview for today.</p>
                </div>

                <div className="health-status">
                    <CheckCircle2 size={20} />
                    <span>Everything looks good</span>
                </div>
            </header>

            {/* ================= SUMMARY CARDS ================= */}
            <section className="summary-grid">
                {/* Appointment */}
                <div className="summary-card" onClick={() => navigate("/patient/appointments")} style={{ cursor: "pointer" }}>
                    <div className="summary-icon blue-bg">
                        <CalendarDays size={22} />
                    </div>

                    <div>
                        <p className="summary-label">NEXT APPOINTMENT</p>
                        <h2>{upcoming ? upcoming.time : "None"}</h2>
                        <p>{upcoming ? `${upcoming.date}` : "Schedule visit"}</p>
                    </div>
                </div>

                {/* Medicines */}
                <div className="summary-card" onClick={() => navigate("/patient/medications")} style={{ cursor: "pointer" }}>
                    <div className="summary-icon green-bg">
                        <Pill size={22} />
                    </div>

                    <div>
                        <p className="summary-label">MEDICATIONS</p>
                        <h2>{takenCount} / {totalMeds}</h2>
                        <p>Taken today</p>
                    </div>
                </div>

                {/* Prescriptions */}
                <div className="summary-card" onClick={() => navigate("/patient/prescriptions")} style={{ cursor: "pointer" }}>
                    <div className="summary-icon purple-bg">
                        <FileText size={22} />
                    </div>

                    <div>
                        <p className="summary-label">PRESCRIPTIONS</p>
                        <h2>{prescriptions.length || 2}</h2>
                        <p>Digital records</p>
                    </div>
                </div>

                {/* Health Score */}
                <div className="summary-card">
                    <div className="summary-icon orange-bg">
                        <Activity size={22} />
                    </div>

                    <div>
                        <p className="summary-label">HEALTH SCORE</p>
                        <h2>95%</h2>
                        <p>Optimal adherence</p>
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
                                <h2>Upcoming Appointment</h2>
                                <p>Your next consultation</p>
                            </div>
                            <CalendarDays size={24} />
                        </div>

                        {upcoming ? (
                            <div className="appointment-card">
                                <div className="doctor-avatar">
                                    {getInitials(upcoming.doctorName)}
                                </div>

                                <div className="appointment-info">
                                    <h3>{upcoming.doctorName}</h3>
                                    <p>{upcoming.specialization}</p>

                                    <div className="appointment-time">
                                        <Clock size={16} />
                                        <span>
                                            {upcoming.date} · {upcoming.time}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="primary-button"
                                    onClick={() =>
                                        navigate("/patient/consultation", {
                                            state: { appointment: upcoming },
                                        })
                                    }
                                >
                                    Join Consultation
                                    <ArrowRight size={17} />
                                </button>
                            </div>
                        ) : (
                            <div style={{ padding: "20px", textAlign: "center", color: "var(--gray-500)" }}>
                                <p style={{ marginBottom: "12px" }}>No upcoming appointments scheduled.</p>
                                <button
                                    className="primary-button"
                                    style={{ margin: "0 auto" }}
                                    onClick={() => navigate("/patient/find-doctor")}
                                >
                                    Find a Doctor
                                </button>
                            </div>
                        )}
                    </section>

                    {/* ================= MEDICATIONS ================= */}
                    <section className="dashboard-card">
                        <div className="card-header">
                            <div>
                                <h2>Today's Medication</h2>
                                <p>Keep track of your medicines</p>
                            </div>
                            <Pill size={24} />
                        </div>

                        <div className="medication-list">
                            {(medications.length > 0 ? medications : [
                                { id: "m1", name: "Telmisartan", dosage: "40mg", time: "8:00 AM", instructions: "", status: "taken", prescriptionId: "" },
                                { id: "m2", name: "Amlodipine", dosage: "5mg", time: "9:00 PM", instructions: "", status: "pending", prescriptionId: "" }
                            ]).map((m) => (
                                <div className="medication-row" key={m.id}>
                                    <div className="medicine-info">
                                        <div className="medicine-icon">
                                            <Pill size={18} />
                                        </div>
                                        <div>
                                            <h3>{m.name} {m.dosage ? `(${m.dosage})` : ""}</h3>
                                            <p>{m.time}</p>
                                        </div>
                                    </div>

                                    <span className={`medicine-status ${m.status}`}>
                                        {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN */}
                <div className="dashboard-right">
                    {/* ================= QUICK ACTIONS ================= */}
                    <section className="dashboard-card">
                        <div className="card-header">
                            <div>
                                <h2>Quick Actions</h2>
                                <p>Access your healthcare tools</p>
                            </div>
                        </div>

                        <div className="quick-actions">
                            {/* Find Doctor */}
                            <button
                                className="quick-button"
                                onClick={() => navigate("/patient/find-doctor")}
                            >
                                <Stethoscope className="blue-bg" size={24} />
                                <h3>Find a Doctor</h3>
                                <p>Find doctors by specialty</p>
                            </button>

                            {/* Book Appointment */}
                            <button
                                className="quick-button"
                                onClick={() => navigate("/patient/book-appointment")}
                            >
                                <CalendarDays className="blue-bg" size={24} />
                                <h3>Book Appointment</h3>
                                <p>Schedule a consultation</p>
                            </button>

                            {/* AI Health Assistant */}
                            <button
                                className="quick-button"
                                onClick={() => navigate("/patient/ai-assistant")}
                            >
                                <MessageCircle className="green-icon" size={24} />
                                <h3>AI Health Assistant</h3>
                                <p>Ask your health questions</p>
                            </button>

                            {/* Prescriptions */}
                            <button
                                className="quick-button"
                                onClick={() => navigate("/patient/prescriptions")}
                            >
                                <FileText className="purple-bg" size={24} />
                                <h3>Prescriptions</h3>
                                <p>View your digital records</p>
                            </button>
                        </div>
                    </section>

                    {/* ================= RECENT ACTIVITY ================= */}
                    <section className="dashboard-card">
                        <div className="card-header">
                            <div>
                                <h2>Recent Health Activity</h2>
                                <p>Your latest health updates</p>
                            </div>
                            <Activity size={24} />
                        </div>

                        <div className="activity-list">
                            {history.length > 0 ? (
                                history.slice(0, 3).map((item) => (
                                    <div className="activity-item" key={item.id}>
                                        <div className="activity-icon">
                                            {item.type === "consultation" ? (
                                                <CalendarDays size={18} />
                                            ) : item.type === "prescription" ? (
                                                <FileText size={18} />
                                            ) : (
                                                <CheckCircle2 size={18} />
                                            )}
                                        </div>
                                        <div>
                                            <h3>{item.title}</h3>
                                            <p>{item.description || item.date}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="activity-item">
                                        <div className="activity-icon">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <div>
                                            <h3>Medication taken</h3>
                                            <p>Telmisartan · Today, 8:05 AM</p>
                                        </div>
                                    </div>

                                    <div className="activity-item">
                                        <div className="activity-icon">
                                            <CalendarDays size={18} />
                                        </div>
                                        <div>
                                            <h3>Appointment scheduled</h3>
                                            <p>Dr. Ananya Sharma · Active</p>
                                        </div>
                                    </div>

                                    <div className="activity-item">
                                        <div className="activity-icon">
                                            <FileText size={18} />
                                        </div>
                                        <div>
                                            <h3>Prescription added</h3>
                                            <p>Essential Hypertension · Dr. Ananya</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default PatientDashboard;
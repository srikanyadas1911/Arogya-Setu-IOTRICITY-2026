import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Users,
    Clock3,
    FileText,
    Video,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import {
    fetchDoctorAppointments,
    fetchPatients,
    fetchPrescriptions,
    getStoredUser,
} from "../../services/api";
import { type Appointment, type Patient, type Prescription } from "../../data/mockData";
import "./DoctorDashboard.css";

function DoctorDashboard() {
    const navigate = useNavigate();
    const currentUser = getStoredUser();
    const doctorName = currentUser?.name || "Dr. Ananya Sharma";
    const doctorId = currentUser?.profile?.id || "doc-1";

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        Promise.all([
            fetchDoctorAppointments(doctorId),
            fetchPatients(),
            fetchPrescriptions(undefined, doctorId),
        ]).then(([appts, pats, rxs]) => {
            if (isMounted) {
                setAppointments(appts);
                setPatients(pats);
                setPrescriptions(rxs);
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [doctorId]);

    const upcoming = appointments.filter(
        (a) => a.status === "upcoming" || a.status === "confirmed"
    );

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
        <div className="doctor-dashboard">
            {/* Header */}
            <div className="doctor-dashboard-header">
                <div>
                    <span className="doctor-portal-label">DOCTOR PORTAL</span>
                    <h1>Good morning, {doctorName.split(" ")[1] ? `Dr. ${doctorName.split(" ")[1]}` : doctorName} 👋</h1>
                    <p>Here's your clinical overview and schedule for today.</p>
                </div>

                <div className="doctor-date-card">
                    <CalendarDays size={18} />
                    <span>Today</span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="doctor-summary-grid">
                <div className="doctor-summary-card" onClick={() => navigate("/doctor/appointments")} style={{ cursor: "pointer" }}>
                    <div className="doctor-card-icon blue">
                        <CalendarDays size={22} />
                    </div>

                    <div>
                        <span>Today's Appointments</span>
                        <strong>{appointments.length}</strong>
                    </div>
                </div>

                <div className="doctor-summary-card" onClick={() => navigate("/doctor/patients")} style={{ cursor: "pointer" }}>
                    <div className="doctor-card-icon green">
                        <Users size={22} />
                    </div>

                    <div>
                        <span>Total Patients</span>
                        <strong>{patients.length || 5}</strong>
                    </div>
                </div>

                <div className="doctor-summary-card">
                    <div className="doctor-card-icon orange">
                        <Clock3 size={22} />
                    </div>

                    <div>
                        <span>Upcoming Consultations</span>
                        <strong>{upcoming.length}</strong>
                    </div>
                </div>

                <div className="doctor-summary-card" onClick={() => navigate("/doctor/prescription")} style={{ cursor: "pointer" }}>
                    <div className="doctor-card-icon purple">
                        <FileText size={22} />
                    </div>

                    <div>
                        <span>Prescriptions Issued</span>
                        <strong>{prescriptions.length || 4}</strong>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="doctor-main-grid">
                {/* Today's Appointments */}
                <div className="doctor-dashboard-card appointments-card">
                    <div className="doctor-card-header">
                        <div>
                            <h2>Today's Appointments</h2>
                            <p>Your upcoming consultations</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/doctor/appointments")}
                            style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}
                        >
                            View All
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="doctor-appointments-list">
                        {loading ? (
                            <div style={{ padding: "20px", textAlign: "center", color: "var(--gray-500)" }}>
                                Loading consultations...
                            </div>
                        ) : appointments.length > 0 ? (
                            appointments.slice(0, 4).map((item) => (
                                <div className="doctor-appointment-item" key={item.id}>
                                    <div className="appointment-time">
                                        <strong>{item.time}</strong>
                                        <span>30 min</span>
                                    </div>

                                    <div className="patient-avatar">
                                        {getInitials(item.patientName)}
                                    </div>

                                    <div className="patient-info">
                                        <h3>{item.patientName}</h3>
                                        <p>{item.reason || "Consultation"}</p>
                                    </div>

                                    <span className={`appointment-status ${item.status === "completed" ? "completed" : ""}`} style={{ textTransform: "capitalize" }}>
                                        {item.status}
                                    </span>

                                    <button
                                        type="button"
                                        className="join-button"
                                        onClick={() => navigate("/doctor/consultation", { state: { appointment: item } })}
                                    >
                                        <Video size={16} />
                                        Join
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: "20px", textAlign: "center", color: "var(--gray-500)" }}>
                                No appointments booked for today.
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="doctor-dashboard-card">
                    <div className="doctor-card-header">
                        <div>
                            <h2>Quick Actions</h2>
                            <p>Common clinical tasks</p>
                        </div>
                    </div>

                    <div className="doctor-quick-actions">
                        <button type="button" onClick={() => navigate("/doctor/patients")}>
                            <Users size={20} />
                            <span>View Patients</span>
                            <ArrowRight size={16} />
                        </button>

                        <button type="button" onClick={() => navigate("/doctor/schedule")}>
                            <CalendarDays size={20} />
                            <span>Manage Schedule</span>
                            <ArrowRight size={16} />
                        </button>

                        <button type="button" onClick={() => navigate("/doctor/prescription")}>
                            <FileText size={20} />
                            <span>Create Prescription</span>
                            <ArrowRight size={16} />
                        </button>

                        <button type="button" onClick={() => navigate("/doctor/consultation")}>
                            <Video size={20} />
                            <span>Join Consultation</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Today's Status */}
            <div className="doctor-status-card">
                <div className="doctor-status-icon">
                    <CheckCircle2 size={22} />
                </div>

                <div>
                    <h3>You're all set for today</h3>
                    <p>Your license verification is active and your consultation schedule is synchronized.</p>
                </div>
            </div>
        </div>
    );
}

export default DoctorDashboard;
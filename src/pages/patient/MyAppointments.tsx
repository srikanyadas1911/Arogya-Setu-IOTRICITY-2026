import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Clock,
    Video,
    MapPin,
    UserRound,
    CheckCircle2,
    XCircle,
    ArrowRight,
} from "lucide-react";
import { fetchAppointments, cancelAppointment, getStoredUser } from "../../services/api";
import { type Appointment } from "../../data/mockData";
import "./MyAppointments.css";

function MyAppointments() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");
    const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionMsg, setActionMsg] = useState("");

    const currentUser = getStoredUser();
    const patientId = currentUser?.profile?.id || "pat-1";

    const loadAppointments = () => {
        setLoading(true);
        fetchAppointments(patientId).then((data) => {
            setAllAppointments(data);
            setLoading(false);
        });
    };

    useEffect(() => {
        loadAppointments();
    }, [patientId]);

    const handleCancel = async (id: string) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        const ok = await cancelAppointment(id);
        if (ok) {
            setActionMsg("Appointment cancelled successfully.");
            setTimeout(() => setActionMsg(""), 3000);
            loadAppointments();
        }
    };

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

    const upcomingAppointments = allAppointments.filter(
        (a) => a.status === "upcoming" || a.status === "confirmed" || a.status === "waiting"
    );

    const pastAppointments = allAppointments.filter(
        (a) => a.status === "completed" || a.status === "cancelled"
    );

    const displayedAppointments =
        activeTab === "Upcoming" ? upcomingAppointments : pastAppointments;

    return (
        <div className="appointments-page">
            {/* Header */}
            <div className="appointments-header">
                <div>
                    <h1>My Appointments</h1>
                    <p>View and manage your healthcare appointments.</p>
                </div>

                <button
                    className="new-appointment-button"
                    onClick={() => navigate("/patient/find-doctor")}
                >
                    <CalendarDays size={18} />
                    Book New Appointment
                </button>
            </div>

            {actionMsg && (
                <div style={{
                    marginBottom: "16px",
                    padding: "10px 14px",
                    background: "var(--success-bg)",
                    border: "1px solid #86efac",
                    borderRadius: "var(--radius)",
                    color: "var(--success)",
                    fontSize: "13px"
                }}>
                    {actionMsg}
                </div>
            )}

            {/* Tabs */}
            <div className="appointment-tabs">
                <button
                    className={activeTab === "Upcoming" ? "active" : ""}
                    onClick={() => setActiveTab("Upcoming")}
                >
                    Upcoming ({upcomingAppointments.length})
                </button>

                <button
                    className={activeTab === "Past" ? "active" : ""}
                    onClick={() => setActiveTab("Past")}
                >
                    Past Appointments ({pastAppointments.length})
                </button>
            </div>

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    Loading appointments...
                </div>
            ) : (
                /* Appointment List */
                <div className="appointments-list">
                    {displayedAppointments.map((appointment) => (
                        <div className="appointment-card" key={appointment.id}>
                            {/* Doctor */}
                            <div className="appointment-doctor">
                                <div className="appointment-avatar">
                                    {getInitials(appointment.doctorName)}
                                </div>

                                <div>
                                    <h2>{appointment.doctorName}</h2>
                                    <p>{appointment.specialization}</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="appointment-details">
                                <div>
                                    <CalendarDays size={17} />
                                    <span>{appointment.date}</span>
                                </div>

                                <div>
                                    <Clock size={17} />
                                    <span>{appointment.time}</span>
                                </div>

                                <div>
                                    {appointment.consultationType === "video" ? (
                                        <Video size={17} />
                                    ) : (
                                        <MapPin size={17} />
                                    )}
                                    <span style={{ textTransform: "capitalize" }}>
                                        {appointment.consultationType} Consultation
                                    </span>
                                </div>
                            </div>

                            {/* Status + Action */}
                            <div className="appointment-actions">
                                <div
                                    className={`appointment-status ${
                                        appointment.status === "cancelled"
                                            ? "cancelled"
                                            : appointment.status === "completed"
                                            ? "completed"
                                            : "confirmed"
                                    }`}
                                >
                                    {appointment.status === "cancelled" ? (
                                        <XCircle size={15} />
                                    ) : (
                                        <CheckCircle2 size={15} />
                                    )}
                                    <span style={{ textTransform: "capitalize" }}>{appointment.status}</span>
                                </div>

                                {(appointment.status === "upcoming" || appointment.status === "confirmed") && (
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button
                                            className="join-button"
                                            onClick={() =>
                                                navigate("/patient/consultation", {
                                                    state: { appointment },
                                                })
                                            }
                                        >
                                            <Video size={16} />
                                            Join
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleCancel(appointment.id)}
                                            style={{
                                                padding: "6px 12px",
                                                border: "1px solid var(--gray-300)",
                                                borderRadius: "var(--radius)",
                                                background: "var(--white)",
                                                color: "var(--danger)",
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}

                                {appointment.status === "completed" && (
                                    <button
                                        className="view-button"
                                        onClick={() => navigate("/patient/prescriptions")}
                                    >
                                        View Prescription
                                        <ArrowRight size={15} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && displayedAppointments.length === 0 && (
                <div className="appointments-empty">
                    <UserRound size={40} />
                    <h2>No appointments found</h2>
                    <p>You don't have any {activeTab.toLowerCase()} appointments scheduled.</p>
                    <button onClick={() => navigate("/patient/find-doctor")}>
                        Find a Doctor
                    </button>
                </div>
            )}
        </div>
    );
}

export default MyAppointments;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Clock, Video, UserRound } from "lucide-react";
import { fetchDoctorAppointments, getStoredUser } from "../../services/api";
import { type Appointment } from "../../data/mockData";
import "./DoctorAppointments.css";

function DoctorAppointments() {
    const navigate = useNavigate();
    const currentUser = getStoredUser();
    const doctorId = currentUser?.profile?.id || "doc-1";

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetchDoctorAppointments(doctorId).then((data) => {
            if (isMounted) {
                setAppointments(data);
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [doctorId]);

    return (
        <div className="doctor-appointments-page">
            <div className="doctor-appointments-header">
                <div>
                    <h1>Today's Appointments</h1>
                    <p>Manage your consultations and patient appointments.</p>
                </div>

                <div className="doctor-date-card">
                    <CalendarDays size={20} />
                    <span>Today</span>
                </div>
            </div>

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    Loading appointments...
                </div>
            ) : (
                <div className="appointments-list">
                    {appointments.map((appointment) => (
                        <div className="appointment-card" key={appointment.id}>
                            <div className="appointment-patient">
                                <div className="patient-icon">
                                    <UserRound size={22} />
                                </div>

                                <div>
                                    <h3>{appointment.patientName}</h3>
                                    <p>{appointment.reason || "Patient consultation"}</p>
                                </div>
                            </div>

                            <div className="appointment-info">
                                <div>
                                    <Clock size={17} />
                                    <span>{appointment.time}</span>
                                </div>

                                <div>
                                    <Video size={17} />
                                    <span style={{ textTransform: "capitalize" }}>
                                        {appointment.consultationType} Consultation
                                    </span>
                                </div>
                            </div>

                            <span
                                className={`appointment-status ${
                                    appointment.status === "completed" ? "completed" : ""
                                }`}
                                style={{ textTransform: "capitalize" }}
                            >
                                {appointment.status}
                            </span>

                            <button
                                className="join-button"
                                onClick={() =>
                                    navigate("/doctor/consultation", {
                                        state: { appointment },
                                    })
                                }
                            >
                                Join Consultation
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DoctorAppointments;
import { useState, useEffect } from "react";
import { CalendarDays, Clock, UserRound, Stethoscope } from "lucide-react";
import { fetchAppointments } from "../../services/api";
import { type Appointment } from "../../data/mockData";
import "./AdminAppointments.css";

function AdminAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetchAppointments().then((data) => {
            if (isMounted) {
                setAppointments(data);
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="admin-appointments-page">
            <div className="admin-appointments-header">
                <div>
                    <h1>Manage Appointments</h1>
                    <p>Monitor and audit all consultations across the Arogya Setu platform.</p>
                </div>
            </div>

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    Loading platform consultations...
                </div>
            ) : (
                <div className="admin-appointments-list">
                    {appointments.map((appointment) => (
                        <div className="admin-appointment-card" key={appointment.id}>
                            <div className="appointment-people">
                                <div className="appointment-person">
                                    <div className="appointment-icon patient">
                                        <UserRound size={20} />
                                    </div>

                                    <div>
                                        <span>Patient</span>
                                        <h3>{appointment.patientName}</h3>
                                    </div>
                                </div>

                                <div className="appointment-person">
                                    <div className="appointment-icon doctor">
                                        <Stethoscope size={20} />
                                    </div>

                                    <div>
                                        <span>Doctor</span>
                                        <h3>{appointment.doctorName}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="appointment-details">
                                <div>
                                    <CalendarDays size={17} />
                                    <span>{appointment.date}</span>
                                </div>

                                <div>
                                    <Clock size={17} />
                                    <span>{appointment.time}</span>
                                </div>

                                <span className="appointment-type" style={{ textTransform: "capitalize" }}>
                                    {appointment.consultationType} Consultation
                                </span>
                            </div>

                            <div
                                className={`appointment-status ${appointment.status.toLowerCase()}`}
                            >
                                {appointment.status}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminAppointments;
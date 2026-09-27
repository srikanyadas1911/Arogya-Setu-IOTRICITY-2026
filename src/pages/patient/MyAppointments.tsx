import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Clock,
    Video,
    MapPin,
    UserRound,
    CheckCircle2,

    ArrowRight,
} from "lucide-react";

import "./MyAppointments.css";

function MyAppointments() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("Upcoming");

    const upcomingAppointments = [
        {
            doctor: "Dr. Ananya Sharma",
            specialty: "General Physician",
            date: "Today",
            time: "10:30 AM",
            type: "Video Consultation",
            status: "Confirmed",
            avatar: "AS",
        },
        {
            doctor: "Dr. Rahul Kapoor",
            specialty: "Cardiologist",
            date: "30 Sep",
            time: "4:00 PM",
            type: "In-person Visit",
            status: "Confirmed",
            avatar: "RK",
        },
    ];

    const pastAppointments = [
        {
            doctor: "Dr. Priya Mehta",
            specialty: "Dermatologist",
            date: "20 Sep",
            time: "11:00 AM",
            type: "Video Consultation",
            status: "Completed",
            avatar: "PM",
        },
        {
            doctor: "Dr. Ananya Sharma",
            specialty: "General Physician",
            date: "12 Sep",
            time: "3:30 PM",
            type: "Video Consultation",
            status: "Completed",
            avatar: "AS",
        },
    ];

    const appointments =
        activeTab === "Upcoming"
            ? upcomingAppointments
            : pastAppointments;

    return (
        <div className="appointments-page">

            {/* Header */}
            <div className="appointments-header">
                <div>
                    <h1>My Appointments</h1>
                    <p>
                        View and manage your healthcare appointments.
                    </p>
                </div>

                <button
                    className="new-appointment-button"
                    onClick={() =>
                        navigate("/patient/find-doctor")
                    }
                >
                    <CalendarDays size={18} />
                    Book New Appointment
                </button>
            </div>

            {/* Tabs */}
            <div className="appointment-tabs">
                <button
                    className={
                        activeTab === "Upcoming"
                            ? "active"
                            : ""
                    }
                    onClick={() => setActiveTab("Upcoming")}
                >
                    Upcoming
                </button>

                <button
                    className={
                        activeTab === "Past"
                            ? "active"
                            : ""
                    }
                    onClick={() => setActiveTab("Past")}
                >
                    Past Appointments
                </button>
            </div>

            {/* Appointment List */}
            <div className="appointments-list">

                {appointments.map((appointment, index) => (
                    <div
                        className="appointment-card"
                        key={index}
                    >

                        {/* Doctor */}
                        <div className="appointment-doctor">
                            <div className="appointment-avatar">
                                {appointment.avatar}
                            </div>

                            <div>
                                <h2>
                                    {appointment.doctor}
                                </h2>

                                <p>
                                    {appointment.specialty}
                                </p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="appointment-details">

                            <div>
                                <CalendarDays size={17} />
                                <span>
                                    {appointment.date}
                                </span>
                            </div>

                            <div>
                                <Clock size={17} />
                                <span>
                                    {appointment.time}
                                </span>
                            </div>

                            <div>
                                {appointment.type ===
                                    "Video Consultation" ? (
                                    <Video size={17} />
                                ) : (
                                    <MapPin size={17} />
                                )}

                                <span>
                                    {appointment.type}
                                </span>
                            </div>

                        </div>

                        {/* Status + Action */}
                        <div className="appointment-actions">

                            <div
                                className={`appointment-status ${appointment.status ===
                                    "Confirmed"
                                    ? "confirmed"
                                    : "completed"
                                    }`}
                            >
                                {appointment.status ===
                                    "Confirmed" ? (
                                    <CheckCircle2 size={15} />
                                ) : (
                                    <CheckCircle2 size={15} />
                                )}

                                {appointment.status}
                            </div>

                            {appointment.status ===
                                "Confirmed" && (
                                    <button
                                        className="join-button"
                                        onClick={() =>
                                            navigate(
                                                "/patient/consultation"
                                            )
                                        }
                                    >
                                        <Video size={16} />
                                        Join
                                    </button>
                                )}

                            {appointment.status ===
                                "Completed" && (
                                    <button className="view-button">
                                        View Details
                                        <ArrowRight size={15} />
                                    </button>
                                )}

                        </div>
                    </div>
                ))}

            </div>

            {/* Empty state if needed */}
            {appointments.length === 0 && (
                <div className="appointments-empty">
                    <UserRound size={40} />
                    <h2>No appointments found</h2>
                    <p>
                        You don't have any appointments in
                        this section.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/patient/find-doctor")
                        }
                    >
                        Find a Doctor
                    </button>
                </div>
            )}
        </div>
    );
}

export default MyAppointments;
import {
    CalendarDays,
    Users,
    Clock3,
    FileText,
    Video,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

import "./DoctorDashboard.css";

function DoctorDashboard() {
    return (
        <div className="doctor-dashboard">

            {/* Header */}
            <div className="doctor-dashboard-header">
                <div>
                    <span className="doctor-portal-label">
                        DOCTOR PORTAL
                    </span>

                    <h1>Good morning, Doctor 👋</h1>

                    <p>
                        Here's your clinical overview for today.
                    </p>
                </div>

                <div className="doctor-date-card">
                    <CalendarDays size={18} />
                    <span>Today</span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="doctor-summary-grid">

                <div className="doctor-summary-card">
                    <div className="doctor-card-icon blue">
                        <CalendarDays size={22} />
                    </div>

                    <div>
                        <span>Today's Appointments</span>
                        <strong>8</strong>
                    </div>
                </div>

                <div className="doctor-summary-card">
                    <div className="doctor-card-icon green">
                        <Users size={22} />
                    </div>

                    <div>
                        <span>Total Patients</span>
                        <strong>124</strong>
                    </div>
                </div>

                <div className="doctor-summary-card">
                    <div className="doctor-card-icon orange">
                        <Clock3 size={22} />
                    </div>

                    <div>
                        <span>Pending Consultations</span>
                        <strong>3</strong>
                    </div>
                </div>

                <div className="doctor-summary-card">
                    <div className="doctor-card-icon purple">
                        <FileText size={22} />
                    </div>

                    <div>
                        <span>Prescriptions Today</span>
                        <strong>6</strong>
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

                        <button type="button">
                            View All
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="doctor-appointments-list">

                        <div className="doctor-appointment-item">
                            <div className="appointment-time">
                                <strong>10:30 AM</strong>
                                <span>30 min</span>
                            </div>

                            <div className="patient-avatar">
                                AS
                            </div>

                            <div className="patient-info">
                                <h3>Ananya Sen</h3>
                                <p>General Consultation</p>
                            </div>

                            <span className="appointment-status">
                                Confirmed
                            </span>

                            <button
                                type="button"
                                className="join-button"
                            >
                                <Video size={16} />
                                Join
                            </button>
                        </div>

                        <div className="doctor-appointment-item">
                            <div className="appointment-time">
                                <strong>12:00 PM</strong>
                                <span>30 min</span>
                            </div>

                            <div className="patient-avatar">
                                RM
                            </div>

                            <div className="patient-info">
                                <h3>Rahul Mehta</h3>
                                <p>Follow-up Consultation</p>
                            </div>

                            <span className="appointment-status">
                                Confirmed
                            </span>

                            <button
                                type="button"
                                className="join-button"
                            >
                                <Video size={16} />
                                Join
                            </button>
                        </div>

                        <div className="doctor-appointment-item">
                            <div className="appointment-time">
                                <strong>3:30 PM</strong>
                                <span>30 min</span>
                            </div>

                            <div className="patient-avatar">
                                SK
                            </div>

                            <div className="patient-info">
                                <h3>Shreya Kapoor</h3>
                                <p>General Consultation</p>
                            </div>

                            <span className="appointment-status pending">
                                Pending
                            </span>

                            <button
                                type="button"
                                className="join-button disabled"
                            >
                                <Clock3 size={16} />
                                Later
                            </button>
                        </div>

                    </div>
                </div>

                {/* Quick Actions */}
                <div className="doctor-dashboard-card">

                    <div className="doctor-card-header">
                        <div>
                            <h2>Quick Actions</h2>
                            <p>Common tasks</p>
                        </div>
                    </div>

                    <div className="doctor-quick-actions">

                        <button type="button">
                            <Users size={20} />
                            <span>View Patients</span>
                            <ArrowRight size={16} />
                        </button>

                        <button type="button">
                            <CalendarDays size={20} />
                            <span>Manage Schedule</span>
                            <ArrowRight size={16} />
                        </button>

                        <button type="button">
                            <FileText size={20} />
                            <span>Create Prescription</span>
                            <ArrowRight size={16} />
                        </button>

                        <button type="button">
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
                    <p>
                        Your profile is verified and your consultation
                        schedule is up to date.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default DoctorDashboard;
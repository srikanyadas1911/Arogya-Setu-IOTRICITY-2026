import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    Clock,
    Video,
    MapPin,
    CheckCircle2,
    UserRound,
    AlertCircle,
} from "lucide-react";
import { bookAppointment, fetchDoctorById, getStoredUser } from "../../services/api";
import { type Doctor } from "../../data/mockData";
import "./BookAppointment.css";

function BookAppointment() {
    const navigate = useNavigate();
    const location = useLocation();

    // Doctor state
    const passedDoctor: Doctor | undefined = location.state?.doctor;
    const [doctor, setDoctor] = useState<Doctor | null>(passedDoctor || null);

    // Current user state
    const currentUser = getStoredUser();
    const patientName = currentUser?.name || currentUser?.profile?.name || "Priya Sharma";
    const patientPhone = currentUser?.phone || "+91 98765 43210";
    const patientId = currentUser?.profile?.id || "pat-1";

    // Date generation
    const today = new Date();
    const dateOptions = [
        { label: "Today", value: today.toISOString().split("T")[0] },
        {
            label: "Tomorrow",
            value: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        },
        {
            label: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short" }),
            value: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        },
        {
            label: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short" }),
            value: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        },
    ];

    const [selectedDateObj, setSelectedDateObj] = useState(dateOptions[0]);
    const [selectedTime, setSelectedTime] = useState("10:30 AM");
    const [consultationType, setConsultationType] = useState("video");
    const [reason, setReason] = useState("Routine consultation and health review");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!doctor) {
            const docId = location.state?.doctorId || "doc-1";
            fetchDoctorById(docId).then((d) => {
                if (d) setDoctor(d);
            });
        }
    }, [doctor, location.state]);

    const timeSlots = [
        "09:30 AM",
        "10:30 AM",
        "11:30 AM",
        "02:00 PM",
        "03:30 PM",
        "05:00 PM",
    ];

    const handleBooking = async () => {
        if (!doctor) return;
        setError("");
        setLoading(true);

        const res = await bookAppointment({
            patientId,
            patientName,
            doctorId: doctor.id,
            doctorName: doctor.name,
            specialization: doctor.specialization,
            date: selectedDateObj.value,
            time: selectedTime,
            consultationType: consultationType as 'video' | 'audio',
            reason,
        });

        setLoading(false);
        if (res.success) {
            setSuccess(true);
            setTimeout(() => {
                navigate("/patient/appointments");
            }, 1200);
        } else {
            setError(res.error || "Booking conflict: slot unavailable. Please choose another time.");
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

    const docName = doctor?.name || "Dr. Ananya Sharma";
    const docSpec = doctor?.specialization || "General Physician";
    const docFee = doctor?.fee || 500;
    const docLocation = doctor?.hospital?.split(",")[1]?.trim() || "Mumbai";

    return (
        <div className="book-appointment-page">
            {/* Header */}
            <div className="booking-header">
                <button
                    className="back-button"
                    onClick={() => navigate("/patient/find-doctor")}
                >
                    <ArrowLeft size={18} />
                    Back to Doctors
                </button>

                <h1>Book an Appointment</h1>
                <p>Choose your preferred date, time and consultation type.</p>
            </div>

            {error && (
                <div style={{
                    margin: "0 0 20px 0",
                    padding: "12px 16px",
                    background: "var(--danger-bg)",
                    border: "1px solid #fca5a5",
                    borderRadius: "var(--radius)",
                    color: "var(--danger)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px"
                }}>
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div style={{
                    margin: "0 0 20px 0",
                    padding: "12px 16px",
                    background: "var(--success-bg)",
                    border: "1px solid #86efac",
                    borderRadius: "var(--radius)",
                    color: "var(--success)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px"
                }}>
                    <CheckCircle2 size={18} />
                    <span>Appointment booked successfully! Redirecting to appointments...</span>
                </div>
            )}

            <div className="booking-layout">
                {/* Left Section */}
                <div className="booking-main">
                    {/* Doctor Card */}
                    <div className="booking-card doctor-booking-card">
                        <div className="booking-doctor-avatar">
                            {getInitials(docName)}
                        </div>

                        <div>
                            <h2>{docName}</h2>
                            <p>{docSpec}</p>

                            <div className="doctor-location">
                                <MapPin size={15} />
                                {docLocation}
                            </div>
                        </div>
                    </div>

                    {/* Date Selection */}
                    <div className="booking-card">
                        <div className="section-title">
                            <CalendarDays size={20} />
                            <div>
                                <h2>Select Date</h2>
                                <p>Choose your appointment date</p>
                            </div>
                        </div>

                        <div className="date-options">
                            {dateOptions.map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    className={`date-option ${selectedDateObj.value === item.value ? "selected" : ""}`}
                                    onClick={() => setSelectedDateObj(item)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Selection */}
                    <div className="booking-card">
                        <div className="section-title">
                            <Clock size={20} />
                            <div>
                                <h2>Select Time</h2>
                                <p>Available consultation slots</p>
                            </div>
                        </div>

                        <div className="time-options">
                            {timeSlots.map((time) => (
                                <button
                                    key={time}
                                    type="button"
                                    className={`time-option ${selectedTime === time ? "selected" : ""}`}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Consultation Type */}
                    <div className="booking-card">
                        <div className="section-title">
                            <Video size={20} />
                            <div>
                                <h2>Consultation Type</h2>
                                <p>Choose how you want to consult</p>
                            </div>
                        </div>

                        <div className="consultation-options">
                            <button
                                type="button"
                                className={`consultation-option ${consultationType === "video" ? "selected" : ""}`}
                                onClick={() => setConsultationType("video")}
                            >
                                <Video size={22} />
                                <div>
                                    <strong>Video Consultation</strong>
                                    <span>Consult securely from home</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                className={`consultation-option ${consultationType === "audio" ? "selected" : ""}`}
                                onClick={() => setConsultationType("audio")}
                            >
                                <MapPin size={22} />
                                <div>
                                    <strong>Audio Teleconsultation</strong>
                                    <span>Quick voice call follow-up</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Patient Information & Reason */}
                    <div className="booking-card">
                        <div className="section-title">
                            <UserRound size={20} />
                            <div>
                                <h2>Patient Information &amp; Reason</h2>
                                <p>Your consultation details</p>
                            </div>
                        </div>

                        <div className="patient-info-grid">
                            <div className="info-field">
                                <label>Patient Name</label>
                                <input type="text" value={patientName} readOnly />
                            </div>

                            <div className="info-field">
                                <label>Contact Number</label>
                                <input type="text" value={patientPhone} readOnly />
                            </div>
                        </div>

                        <div style={{ marginTop: "16px" }}>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--gray-700)", marginBottom: "6px" }}>
                                Reason for Consultation
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                style={{ width: "100%", padding: "10px 14px", borderRadius: "var(--radius)", border: "1px solid var(--gray-200)" }}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Describe symptoms or follow-up reason..."
                            />
                        </div>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="booking-summary">
                    <div className="summary-card">
                        <h2>Appointment Summary</h2>

                        <div className="summary-doctor">
                            <div className="summary-avatar">
                                {getInitials(docName)}
                            </div>

                            <div>
                                <strong>{docName}</strong>
                                <span>{docSpec}</span>
                            </div>
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-row">
                            <span>
                                <CalendarDays size={16} />
                                Date
                            </span>
                            <strong>{selectedDateObj.label} ({selectedDateObj.value})</strong>
                        </div>

                        <div className="summary-row">
                            <span>
                                <Clock size={16} />
                                Time
                            </span>
                            <strong>{selectedTime}</strong>
                        </div>

                        <div className="summary-row">
                            <span>
                                <Video size={16} />
                                Type
                            </span>
                            <strong>{consultationType === "video" ? "Video Call" : "Audio Call"}</strong>
                        </div>

                        <div className="summary-divider" />

                        <div className="fee-row">
                            <span>Consultation Fee</span>
                            <strong>₹{docFee}</strong>
                        </div>

                        <button
                            className="confirm-booking-button"
                            onClick={handleBooking}
                            disabled={loading || success}
                            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
                        >
                            <CheckCircle2 size={19} />
                            {loading ? "Confirming..." : "Confirm Appointment"}
                        </button>

                        <p className="secure-note">
                            Your appointment is confirmed and encrypted.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookAppointment;
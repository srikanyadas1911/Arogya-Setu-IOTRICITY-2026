import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    Clock,
    Video,
    MapPin,
    CheckCircle2,
    UserRound,
} from "lucide-react";

import "./BookAppointment.css";

function BookAppointment() {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState("Today");
    const [selectedTime, setSelectedTime] = useState("10:30 AM");
    const [consultationType, setConsultationType] = useState("Video");

    const dates = ["Today", "Tomorrow", "29 Sep", "30 Sep"];

    const timeSlots = [
        "10:30 AM",
        "11:00 AM",
        "12:30 PM",
        "2:00 PM",
        "4:30 PM",
        "6:00 PM",
    ];

    const handleBooking = () => {
        alert("Appointment booked successfully!");
        navigate("/patient/appointments");
    };

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

            <div className="booking-layout">

                {/* Left Section */}
                <div className="booking-main">

                    {/* Doctor Card */}
                    <div className="booking-card doctor-booking-card">
                        <div className="booking-doctor-avatar">
                            AS
                        </div>

                        <div>
                            <h2>Dr. Ananya Sharma</h2>
                            <p>General Physician</p>

                            <div className="doctor-location">
                                <MapPin size={15} />
                                Kolkata
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
                            {dates.map((date) => (
                                <button
                                    key={date}
                                    className={`date-option ${selectedDate === date
                                            ? "selected"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        setSelectedDate(date)
                                    }
                                >
                                    {date}
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
                                    className={`time-option ${selectedTime === time
                                            ? "selected"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        setSelectedTime(time)
                                    }
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
                                className={`consultation-option ${consultationType === "Video"
                                        ? "selected"
                                        : ""
                                    }`}
                                onClick={() =>
                                    setConsultationType("Video")
                                }
                            >
                                <Video size={22} />

                                <div>
                                    <strong>
                                        Video Consultation
                                    </strong>
                                    <span>
                                        Consult from anywhere
                                    </span>
                                </div>
                            </button>

                            <button
                                className={`consultation-option ${consultationType === "In-person"
                                        ? "selected"
                                        : ""
                                    }`}
                                onClick={() =>
                                    setConsultationType("In-person")
                                }
                            >
                                <MapPin size={22} />

                                <div>
                                    <strong>
                                        In-person Visit
                                    </strong>
                                    <span>
                                        Visit the clinic
                                    </span>
                                </div>
                            </button>

                        </div>
                    </div>

                    {/* Patient Information */}
                    <div className="booking-card">
                        <div className="section-title">
                            <UserRound size={20} />
                            <div>
                                <h2>Patient Information</h2>
                                <p>Your basic appointment details</p>
                            </div>
                        </div>

                        <div className="patient-info-grid">

                            <div className="info-field">
                                <label>Patient Name</label>
                                <input
                                    type="text"
                                    value="Patient"
                                    readOnly
                                />
                            </div>

                            <div className="info-field">
                                <label>Contact Number</label>
                                <input
                                    type="text"
                                    value="+91 XXXXX XXXXX"
                                    readOnly
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="booking-summary">

                    <div className="summary-card">
                        <h2>Appointment Summary</h2>

                        <div className="summary-doctor">
                            <div className="summary-avatar">
                                AS
                            </div>

                            <div>
                                <strong>
                                    Dr. Ananya Sharma
                                </strong>

                                <span>
                                    General Physician
                                </span>
                            </div>
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-row">
                            <span>
                                <CalendarDays size={16} />
                                Date
                            </span>

                            <strong>{selectedDate}</strong>
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

                            <strong>{consultationType}</strong>
                        </div>

                        <div className="summary-divider" />

                        <div className="fee-row">
                            <span>Consultation Fee</span>
                            <strong>₹500</strong>
                        </div>

                        <button
                            className="confirm-booking-button"
                            onClick={handleBooking}
                        >
                            <CheckCircle2 size={19} />
                            Confirm Appointment
                        </button>

                        <p className="secure-note">
                            Your appointment details are securely
                            stored.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BookAppointment;
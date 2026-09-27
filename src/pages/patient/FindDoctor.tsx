import { useNavigate } from "react-router-dom";
import {
    Search,
    MapPin,
    Star,
    CalendarDays,
    Stethoscope,
} from "lucide-react";

import "./FindDoctor.css";

function FindDoctor() {
    const navigate = useNavigate();

    return (
        <div className="find-doctor-page">

            {/* Header */}
            <div className="find-doctor-header">

                <div>
                    <h1>Find a Doctor</h1>

                    <p>
                        Find the right doctor for your healthcare needs.
                    </p>
                </div>

            </div>


            {/* Search */}
            <div className="doctor-search-section">

                <div className="doctor-search-box">

                    <Search size={20} />

                    <input
                        type="text"
                        placeholder="Search doctor or specialty..."
                    />

                </div>

                <button className="specialty-filter">
                    All Specialties
                </button>

            </div>


            {/* Doctor List */}
            <div className="doctor-list">


                {/* Doctor 1 */}
                <div className="doctor-card">

                    <div className="doctor-card-top">

                        <div className="doctor-avatar-large">
                            AS
                        </div>

                        <div className="doctor-details">

                            <h2>
                                Dr. Ananya Sharma
                            </h2>

                            <p className="doctor-specialty">
                                General Physician
                            </p>

                            <div className="doctor-rating">

                                <Star
                                    size={16}
                                    fill="currentColor"
                                />

                                <span>
                                    4.9
                                </span>

                                <span>
                                    · 120 reviews
                                </span>

                            </div>

                        </div>

                    </div>


                    <div className="doctor-info-row">

                        <span>
                            <Stethoscope size={16} />
                            8+ years experience
                        </span>

                        <span>
                            <MapPin size={16} />
                            Kolkata
                        </span>

                    </div>


                    <div className="doctor-card-bottom">

                        <div className="consultation-fee">
                            <strong>₹500</strong>
                            <span> consultation</span>
                        </div>

                        <button
                            className="book-doctor-button"
                            onClick={() =>
                                navigate("/patient/book-appointment")
                            }
                        >
                            <CalendarDays size={18} />
                            Book Appointment
                        </button>

                    </div>

                </div>


                {/* Doctor 2 */}
                <div className="doctor-card">

                    <div className="doctor-card-top">

                        <div className="doctor-avatar-large">
                            RK
                        </div>

                        <div className="doctor-details">

                            <h2>
                                Dr. Rahul Kapoor
                            </h2>

                            <p className="doctor-specialty">
                                Cardiologist
                            </p>

                            <div className="doctor-rating">

                                <Star
                                    size={16}
                                    fill="currentColor"
                                />

                                <span>
                                    4.8
                                </span>

                                <span>
                                    · 98 reviews
                                </span>

                            </div>

                        </div>

                    </div>


                    <div className="doctor-info-row">

                        <span>
                            <Stethoscope size={16} />
                            12+ years experience
                        </span>

                        <span>
                            <MapPin size={16} />
                            Kolkata
                        </span>

                    </div>


                    <div className="doctor-card-bottom">

                        <div className="consultation-fee">
                            <strong>₹800</strong>
                            <span> consultation</span>
                        </div>

                        <button
                            className="book-doctor-button"
                            onClick={() =>
                                navigate("/patient/book-appointment")
                            }
                        >
                            <CalendarDays size={18} />
                            Book Appointment
                        </button>

                    </div>

                </div>


                {/* Doctor 3 */}
                <div className="doctor-card">

                    <div className="doctor-card-top">

                        <div className="doctor-avatar-large">
                            PM
                        </div>

                        <div className="doctor-details">

                            <h2>
                                Dr. Priya Mehta
                            </h2>

                            <p className="doctor-specialty">
                                Dermatologist
                            </p>

                            <div className="doctor-rating">

                                <Star
                                    size={16}
                                    fill="currentColor"
                                />

                                <span>
                                    4.9
                                </span>

                                <span>
                                    · 86 reviews
                                </span>

                            </div>

                        </div>

                    </div>


                    <div className="doctor-info-row">

                        <span>
                            <Stethoscope size={16} />
                            7+ years experience
                        </span>

                        <span>
                            <MapPin size={16} />
                            Kolkata
                        </span>

                    </div>


                    <div className="doctor-card-bottom">

                        <div className="consultation-fee">
                            <strong>₹600</strong>
                            <span> consultation</span>
                        </div>

                        <button
                            className="book-doctor-button"
                            onClick={() =>
                                navigate("/patient/book-appointment")
                            }
                        >
                            <CalendarDays size={18} />
                            Book Appointment
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default FindDoctor;
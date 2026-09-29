import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    MapPin,
    Star,
    CalendarDays,
    Stethoscope,
} from "lucide-react";
import { fetchDoctors } from "../../services/api";
import { type Doctor } from "../../data/mockData";
import "./FindDoctor.css";

const specialties = [
    "All Specialties",
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "Orthopedic",
];

function FindDoctor() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [search, setSearch] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetchDoctors({
            search,
            specialization: selectedSpecialty,
            verifiedOnly: true,
        }).then((data) => {
            if (isMounted) {
                setDoctors(data);
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [search, selectedSpecialty]);

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
        <div className="find-doctor-page">
            {/* Header */}
            <div className="find-doctor-header">
                <div>
                    <h1>Find a Doctor</h1>
                    <p>Find the right verified doctor for your healthcare needs.</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="doctor-search-section">
                <div className="doctor-search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search doctor, hospital, or specialty..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div style={{ position: "relative" }}>
                    <select
                        className="specialty-filter"
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        style={{
                            cursor: "pointer",
                            appearance: "none",
                            paddingRight: "28px",
                            height: "100%",
                        }}
                    >
                        {specialties.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Loading / Empty States */}
            {loading && (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    Loading verified doctors...
                </div>
            )}

            {!loading && doctors.length === 0 && (
                <div style={{ padding: "48px 24px", textAlign: "center", background: "var(--white)", borderRadius: "var(--radius-lg)", border: "1px solid var(--gray-200)" }}>
                    <Stethoscope size={40} color="var(--gray-400)" style={{ margin: "0 auto 12px" }} />
                    <h3 style={{ fontSize: "16px", color: "var(--gray-800)", marginBottom: "4px" }}>No doctors found</h3>
                    <p style={{ fontSize: "13px", color: "var(--gray-500)" }}>Try searching for a different specialty or clearing your search filter.</p>
                </div>
            )}

            {/* Doctor List */}
            <div className="doctor-list">
                {doctors.map((doc) => (
                    <div className="doctor-card" key={doc.id}>
                        <div className="doctor-card-top">
                            <div className="doctor-avatar-large">
                                {getInitials(doc.name)}
                            </div>

                            <div className="doctor-details">
                                <h2>{doc.name}</h2>
                                <p className="doctor-specialty">{doc.specialization}</p>

                                <div className="doctor-rating">
                                    <Star size={16} fill="currentColor" />
                                    <span>{doc.rating}</span>
                                    <span>· {doc.totalPatients || 100}+ patients</span>
                                </div>
                            </div>
                        </div>

                        <div className="doctor-info-row">
                            <span>
                                <Stethoscope size={16} />
                                {doc.experience}+ years experience
                            </span>
                            <span>
                                <MapPin size={16} />
                                {doc.hospital.split(",")[1]?.trim() || doc.hospital}
                            </span>
                        </div>

                        <div className="doctor-card-bottom">
                            <div className="consultation-fee">
                                <strong>₹{doc.fee}</strong>
                                <span> consultation</span>
                            </div>

                            <button
                                className="book-doctor-button"
                                onClick={() =>
                                    navigate("/patient/book-appointment", {
                                        state: { doctorId: doc.id, doctor: doc },
                                    })
                                }
                            >
                                <CalendarDays size={18} />
                                Book Appointment
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FindDoctor;
import { useState, useEffect } from "react";
import {
    Search,
    Stethoscope,
    CheckCircle,
    Clock,
    XCircle,
} from "lucide-react";
import { fetchDoctors, verifyDoctor } from "../../services/api";
import { type Doctor } from "../../data/mockData";
import "./AdminDoctors.css";

function AdminDoctors() {
    const [search, setSearch] = useState("");
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    const loadDoctors = () => {
        setLoading(true);
        fetchDoctors().then((data) => {
            setDoctors(data);
            setLoading(false);
        });
    };

    useEffect(() => {
        loadDoctors();
    }, []);

    const filteredDoctors = doctors.filter(
        (doctor) =>
            doctor.name.toLowerCase().includes(search.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(search.toLowerCase())
    );

    const updateStatus = async (
        id: string,
        status: "verified" | "rejected" | "pending"
    ) => {
        setDoctors((current) =>
            current.map((d) => (d.id === id ? { ...d, verificationStatus: status } : d))
        );
        await verifyDoctor(id, status);
    };

    return (
        <div className="admin-doctors-page">
            <div className="admin-doctors-header">
                <div>
                    <h1>Manage Doctors</h1>
                    <p>Review and manage registered doctors across all clinical faculties.</p>
                </div>
            </div>

            <div className="doctor-search">
                <Search size={20} />
                <input
                    type="text"
                    placeholder="Search doctors or specialties..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    Loading enrolled doctors...
                </div>
            ) : (
                <div className="admin-doctors-list">
                    {filteredDoctors.map((doctor) => (
                        <div className="admin-doctor-card" key={doctor.id}>
                            <div className="admin-doctor-info">
                                <div className="admin-doctor-avatar">
                                    <Stethoscope size={22} />
                                </div>

                                <div>
                                    <h3>{doctor.name}</h3>
                                    <span>{doctor.specialization} • {doctor.hospital}</span>
                                </div>
                            </div>

                            <div
                                className={
                                    doctor.verificationStatus === "verified"
                                        ? "doctor-status verified"
                                        : doctor.verificationStatus === "pending"
                                        ? "doctor-status pending"
                                        : "doctor-status rejected"
                                }
                            >
                                {doctor.verificationStatus === "verified" && (
                                    <CheckCircle size={16} />
                                )}
                                {doctor.verificationStatus === "pending" && (
                                    <Clock size={16} />
                                )}
                                {doctor.verificationStatus === "rejected" && (
                                    <XCircle size={16} />
                                )}
                                <span style={{ textTransform: "capitalize" }}>{doctor.verificationStatus}</span>
                            </div>

                            <div className="admin-doctor-actions">
                                {doctor.verificationStatus !== "verified" && (
                                    <button
                                        type="button"
                                        className="verify-btn"
                                        onClick={() => updateStatus(doctor.id, "verified")}
                                    >
                                        Verify
                                    </button>
                                )}

                                {doctor.verificationStatus !== "rejected" && (
                                    <button
                                        type="button"
                                        className="reject-btn"
                                        onClick={() => updateStatus(doctor.id, "rejected")}
                                    >
                                        Reject
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminDoctors;
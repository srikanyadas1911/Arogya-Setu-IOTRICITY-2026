import { useState, useEffect } from "react";
import {
    Search,
    Stethoscope,
    CheckCircle,
    XCircle,
    Clock,
    FileText,
} from "lucide-react";
import { fetchDoctors, verifyDoctor } from "../../services/api";
import { type Doctor } from "../../data/mockData";
import "./AdminVerification.css";

function AdminVerification() {
    const [search, setSearch] = useState("");
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionMsg, setActionMsg] = useState("");

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
            doctor.specialization.toLowerCase().includes(search.toLowerCase()) ||
            doctor.registrationId.toLowerCase().includes(search.toLowerCase())
    );

    const updateStatus = async (
        id: string,
        status: "verified" | "rejected" | "pending"
    ) => {
        // Optimistic update
        setDoctors((current) =>
            current.map((doc) =>
                doc.id === id ? { ...doc, verificationStatus: status } : doc
            )
        );
        await verifyDoctor(id, status);
        setActionMsg(`Doctor status updated to ${status}.`);
        setTimeout(() => setActionMsg(""), 3000);
    };

    const pendingCount = doctors.filter(
        (doc) => doc.verificationStatus === "pending"
    ).length;

    return (
        <div className="admin-verification-page">
            <div className="admin-verification-header">
                <div>
                    <h1>Doctor Verification</h1>
                    <p>Review and verify doctor credentials before platform listing.</p>
                </div>

                <div className="verification-summary">
                    <Clock size={18} />
                    <span>{pendingCount} Pending Review</span>
                </div>
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

            <div className="verification-search">
                <Search size={19} />
                <input
                    type="text"
                    placeholder="Search doctor, specialty or registration ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    Loading doctor verifications...
                </div>
            ) : (
                <div className="verification-list">
                    {filteredDoctors.map((doctor) => (
                        <div className="verification-card" key={doctor.id}>
                            <div className="verification-main">
                                <div className="verification-avatar">
                                    <Stethoscope size={24} />
                                </div>

                                <div className="verification-info">
                                    <h3>{doctor.name}</h3>
                                    <p>{doctor.specialization} • {doctor.qualifications}</p>

                                    <div className="verification-meta">
                                        <span>License / Reg ID: {doctor.registrationId}</span>
                                        <span>Hospital: {doctor.hospital}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="verification-status">
                                {doctor.verificationStatus === "pending" && (
                                    <span className="status pending">
                                        <Clock size={14} />
                                        Pending
                                    </span>
                                )}

                                {doctor.verificationStatus === "verified" && (
                                    <span className="status verified">
                                        <CheckCircle size={14} />
                                        Verified
                                    </span>
                                )}

                                {doctor.verificationStatus === "rejected" && (
                                    <span className="status rejected">
                                        <XCircle size={14} />
                                        Rejected
                                    </span>
                                )}
                            </div>

                            <div className="verification-actions">
                                <button
                                    className="document-button"
                                    type="button"
                                    onClick={() =>
                                        alert(
                                            `Medical Council License: ${doctor.registrationId}\nDegrees: ${doctor.qualifications}\nExperience: ${doctor.experience} years\nHospital: ${doctor.hospital}`
                                        )
                                    }
                                >
                                    <FileText size={16} />
                                    View Credentials
                                </button>

                                {doctor.verificationStatus === "pending" && (
                                    <>
                                        <button
                                            type="button"
                                            className="reject-button"
                                            onClick={() => updateStatus(doctor.id, "rejected")}
                                        >
                                            <XCircle size={16} />
                                            Reject
                                        </button>

                                        <button
                                            type="button"
                                            className="verify-button"
                                            onClick={() => updateStatus(doctor.id, "verified")}
                                        >
                                            <CheckCircle size={16} />
                                            Verify
                                        </button>
                                    </>
                                )}

                                {doctor.verificationStatus === "rejected" && (
                                    <button
                                        type="button"
                                        className="verify-button"
                                        onClick={() => updateStatus(doctor.id, "verified")}
                                    >
                                        <CheckCircle size={16} />
                                        Re-verify
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {filteredDoctors.length === 0 && (
                        <div className="no-verification-results">
                            No doctors found matching '{search}'.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminVerification;
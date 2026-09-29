import { useState, useEffect } from "react";
import {
    FileText,
    Download,
    Eye,
    Calendar,
    UserRound,
    Stethoscope,
    X,
} from "lucide-react";
import { fetchPrescriptions, getStoredUser } from "../../services/api";
import { type Prescription } from "../../data/mockData";
import "./Prescriptions.css";

function Prescriptions() {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);

    const currentUser = getStoredUser();
    const patientId = currentUser?.profile?.id || "pat-1";

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetchPrescriptions(patientId).then((data) => {
            if (isMounted) {
                setPrescriptions(data);
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [patientId]);

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

    const handleDownload = (rx: Prescription) => {
        const text = `AROGYA SETU - PRESCRIPTION ${rx.id}\nDate: ${rx.date}\nDoctor: ${rx.doctorName}\nPatient: ${rx.patientName}\nDiagnosis: ${rx.diagnosis}\n\nMedicines:\n` +
            rx.medicines.map((m, i) => `${i + 1}. ${m.name} (${m.dosage}) - ${m.frequency} for ${m.duration}\n   Instructions: ${m.instructions}`).join("\n") +
            `\n\nNotes: ${rx.notes}\nFollow-up: ${rx.followUpDate || "As needed"}`;

        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Prescription_${rx.id}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="prescriptions-page">
            {/* Header */}
            <div className="prescriptions-header">
                <div>
                    <h1>Prescriptions</h1>
                    <p>View and manage your digital prescriptions in one place.</p>
                </div>

                <div className="prescription-count">
                    <FileText size={20} />
                    <span>{prescriptions.length} Prescriptions</span>
                </div>
            </div>

            {/* Info Card */}
            <div className="prescription-info">
                <div className="info-icon">
                    <FileText size={22} />
                </div>

                <div>
                    <h2>Digital Prescriptions</h2>
                    <p>
                        Your prescriptions from Arogya Setu consultations are securely stored here for easy access.
                    </p>
                </div>
            </div>

            {loading && (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    Loading prescriptions...
                </div>
            )}

            {/* Prescription List */}
            <div className="prescription-list">
                {prescriptions.map((prescription) => (
                    <div className="prescription-card" key={prescription.id}>
                        {/* Card Header */}
                        <div className="prescription-card-header">
                            <div className="prescription-title">
                                <div className="prescription-icon">
                                    <FileText size={21} />
                                </div>

                                <div>
                                    <h2>{prescription.id}</h2>
                                    <span>{prescription.date}</span>
                                </div>
                            </div>

                            <span
                                className={`prescription-status ${
                                    prescription.status === "active" ? "active" : "completed"
                                }`}
                                style={{ textTransform: "capitalize" }}
                            >
                                {prescription.status}
                            </span>
                        </div>

                        {/* Doctor */}
                        <div className="prescription-doctor">
                            <div className="doctor-avatar">
                                {getInitials(prescription.doctorName)}
                            </div>

                            <div>
                                <strong>{prescription.doctorName}</strong>
                                <span>
                                    <Stethoscope size={14} />
                                    Consultant
                                </span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="prescription-details">
                            <div className="detail-item">
                                <Calendar size={17} />
                                <div>
                                    <span>Date</span>
                                    <strong>{prescription.date}</strong>
                                </div>
                            </div>

                            <div className="detail-item">
                                <FileText size={17} />
                                <div>
                                    <span>Diagnosis</span>
                                    <strong>{prescription.diagnosis}</strong>
                                </div>
                            </div>

                            <div className="detail-item">
                                <UserRound size={17} />
                                <div>
                                    <span>Medicines</span>
                                    <strong>
                                        {prescription.medicines?.length || 0} Medicines
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="prescription-actions">
                            <button
                                className="view-prescription-button"
                                onClick={() => setSelectedRx(prescription)}
                            >
                                <Eye size={17} />
                                View Prescription
                            </button>

                            <button
                                className="download-prescription-button"
                                onClick={() => handleDownload(prescription)}
                            >
                                <Download size={17} />
                                Download
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View Modal */}
            {selectedRx && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(0,0,0,0.5)", zIndex: 1000,
                    display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
                }}>
                    <div style={{
                        background: "var(--white)", width: "100%", maxWidth: "600px",
                        borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xl)",
                        padding: "24px", maxHeight: "90vh", overflowY: "auto"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid var(--gray-200)", paddingBottom: "12px" }}>
                            <div>
                                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--gray-900)" }}>{selectedRx.id}</h2>
                                <span style={{ fontSize: "12px", color: "var(--gray-400)" }}>Prescribed by {selectedRx.doctorName} on {selectedRx.date}</span>
                            </div>
                            <button
                                onClick={() => setSelectedRx(null)}
                                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gray-500)" }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase" }}>Diagnosis</div>
                            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--gray-900)", marginTop: "2px" }}>{selectedRx.diagnosis}</div>
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", marginBottom: "8px" }}>Prescribed Medicines</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {selectedRx.medicines.map((med, idx) => (
                                    <div key={idx} style={{ padding: "10px 12px", background: "var(--gray-50)", borderRadius: "var(--radius)", border: "1px solid var(--gray-200)" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <strong style={{ fontSize: "14px", color: "var(--gray-900)" }}>{med.name}</strong>
                                            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--primary)" }}>{med.dosage}</span>
                                        </div>
                                        <div style={{ fontSize: "12px", color: "var(--gray-600)", marginTop: "4px" }}>
                                            {med.frequency} &nbsp;•&nbsp; {med.duration}
                                        </div>
                                        {med.instructions && (
                                            <div style={{ fontSize: "12px", color: "var(--gray-500)", marginTop: "2px", fontStyle: "italic" }}>
                                                Note: {med.instructions}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedRx.notes && (
                            <div style={{ marginBottom: "16px" }}>
                                <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase" }}>Clinical Notes</div>
                                <div style={{ fontSize: "13px", color: "var(--gray-700)", marginTop: "2px" }}>{selectedRx.notes}</div>
                            </div>
                        )}

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "20px" }}>
                            <button
                                className="download-prescription-button"
                                onClick={() => handleDownload(selectedRx)}
                            >
                                <Download size={16} />
                                Download Copy
                            </button>
                            <button
                                className="view-prescription-button"
                                onClick={() => setSelectedRx(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Prescriptions;
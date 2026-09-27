import {
    FileText,
    Download,
    Eye,
    Calendar,
    UserRound,
    Stethoscope,
} from "lucide-react";

import "./Prescriptions.css";

const prescriptions = [
    {
        id: "RX-1025",
        doctor: "Dr. Ananya Sharma",
        specialty: "General Physician",
        date: "25 Sep 2026",
        diagnosis: "Fever & Viral Infection",
        medicines: 3,
        status: "Active",
    },
    {
        id: "RX-1018",
        doctor: "Dr. Rahul Mehta",
        specialty: "Cardiologist",
        date: "12 Sep 2026",
        diagnosis: "Routine Cardiac Checkup",
        medicines: 2,
        status: "Active",
    },
    {
        id: "RX-1007",
        doctor: "Dr. Priya Sen",
        specialty: "Dermatologist",
        date: "28 Aug 2026",
        diagnosis: "Skin Allergy",
        medicines: 2,
        status: "Completed",
    },
];

function Prescriptions() {
    return (
        <div className="prescriptions-page">

            {/* Header */}
            <div className="prescriptions-header">
                <div>
                    <h1>Prescriptions</h1>
                    <p>
                        View and manage your digital prescriptions in one place.
                    </p>
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
                        Your prescriptions from Arogya Setu consultations are
                        securely stored here for easy access.
                    </p>
                </div>
            </div>

            {/* Prescription List */}
            <div className="prescription-list">

                {prescriptions.map((prescription) => (
                    <div
                        className="prescription-card"
                        key={prescription.id}
                    >

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
                                className={`prescription-status ${prescription.status === "Active"
                                        ? "active"
                                        : "completed"
                                    }`}
                            >
                                {prescription.status}
                            </span>

                        </div>

                        {/* Doctor */}
                        <div className="prescription-doctor">

                            <div className="doctor-avatar">
                                AS
                            </div>

                            <div>
                                <strong>{prescription.doctor}</strong>

                                <span>
                                    <Stethoscope size={14} />
                                    {prescription.specialty}
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
                                        {prescription.medicines} Medicines
                                    </strong>
                                </div>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="prescription-actions">

                            <button
                                className="view-prescription-button"
                                onClick={() =>
                                    alert(
                                        `Opening prescription ${prescription.id}`
                                    )
                                }
                            >
                                <Eye size={17} />
                                View Prescription
                            </button>

                            <button
                                className="download-prescription-button"
                                onClick={() =>
                                    alert(
                                        `Downloading prescription ${prescription.id}`
                                    )
                                }
                            >
                                <Download size={17} />
                                Download
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Prescriptions;
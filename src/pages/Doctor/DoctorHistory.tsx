import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, FileText, CalendarDays, User } from "lucide-react";
import { fetchPrescriptions } from "../../services/api";
import { type Prescription, type Patient } from "../../data/mockData";
import "./DoctorHistory.css";

function DoctorHistory() {
    const location = useLocation();
    const passedPatient: Patient | undefined = location.state?.patient;

    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [search, setSearch] = useState(passedPatient ? passedPatient.name : "");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetchPrescriptions().then((data) => {
            if (isMounted) {
                setPrescriptions(data);
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    const filtered = prescriptions.filter((rx) => {
        if (!search) return true;
        const s = search.toLowerCase();
        return (
            rx.patientName.toLowerCase().includes(s) ||
            rx.diagnosis.toLowerCase().includes(s) ||
            rx.notes.toLowerCase().includes(s)
        );
    });

    return (
        <div className="doctor-history-page">
            <div className="doctor-history-header">
                <div>
                    <h1>Patient Clinical History</h1>
                    <p>
                        {passedPatient
                            ? `Showing clinical records for ${passedPatient.name} (${passedPatient.age}y, ${passedPatient.gender})`
                            : "Review previous consultations and medical records."}
                    </p>
                </div>
            </div>

            <div className="history-search">
                <Search size={20} />
                <input
                    type="text"
                    placeholder="Search by patient name or diagnosis..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    Loading clinical history...
                </div>
            ) : filtered.length > 0 ? (
                <div className="history-list">
                    {filtered.map((record) => (
                        <div className="history-card" key={record.id}>
                            <div className="history-patient">
                                <div className="history-avatar">
                                    <User size={22} />
                                </div>

                                <div>
                                    <h3>{record.patientName}</h3>
                                    <span>Prescribed by {record.doctorName}</span>
                                </div>
                            </div>

                            <div className="history-details">
                                <div>
                                    <CalendarDays size={18} />
                                    <span>{record.date}</span>
                                </div>

                                <div>
                                    <FileText size={18} />
                                    <span>{record.diagnosis}</span>
                                </div>
                            </div>

                            <p className="history-notes">
                                {record.notes || "Standard clinical protocol observed. Follow-up as advised."}
                            </p>

                            <div style={{ marginTop: "10px", fontSize: "12px", color: "var(--gray-500)" }}>
                                Medicines: {record.medicines?.map((m) => m.name).join(", ") || "None"}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    No patient records found matching '{search}'.
                </div>
            )}
        </div>
    );
}

export default DoctorHistory;
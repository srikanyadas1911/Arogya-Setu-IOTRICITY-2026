import { useState, useEffect } from "react";
import {
    Pill,
    CheckCircle2,
    Clock3,
    CalendarDays,
    Circle,
    Plus,
    X,
} from "lucide-react";
import {
    fetchMedications,
    markMedicationTaken,
    addMedication,
    getStoredUser,
} from "../../services/api";
import { type Medication } from "../../data/mockData";
import "./MedicationTracker.css";

function MedicationTracker() {
    const [medications, setMedications] = useState<Medication[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDosage, setNewDosage] = useState("");
    const [newTime, setNewTime] = useState("08:00 AM");
    const [newInstructions, setNewInstructions] = useState("");

    const currentUser = getStoredUser();
    const patientId = currentUser?.profile?.id || "pat-1";

    const loadMeds = () => {
        setLoading(true);
        fetchMedications(patientId).then((data) => {
            setMedications(data);
            setLoading(false);
        });
    };

    useEffect(() => {
        loadMeds();
    }, [patientId]);

    const toggleMedication = async (id: string, currentStatus: string) => {
        const nextStatus = currentStatus === "taken" ? "pending" : "taken";
        // Optimistic UI update
        setMedications((current) =>
            current.map((m) =>
                m.id === id ? { ...m, status: nextStatus as any } : m
            )
        );
        if (nextStatus === "taken") {
            await markMedicationTaken(id);
        }
    };

    const handleAddMedicine = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newDosage) return;
        await addMedication({
            name: newName,
            dosage: newDosage,
            time: newTime,
            instructions: newInstructions,
            status: "pending",
        });
        setNewName("");
        setNewDosage("");
        setNewInstructions("");
        setShowAddModal(false);
        loadMeds();
    };

    const takenCount = medications.filter((m) => m.status === "taken").length;
    const progress =
        medications.length > 0
            ? Math.round((takenCount / medications.length) * 100)
            : 0;

    const nextPending = medications.find((m) => m.status !== "taken");

    return (
        <div className="medication-page">
            {/* Header */}
            <div className="medication-header">
                <div>
                    <div className="medication-title-row">
                        <div className="medication-main-icon">
                            <Pill size={25} />
                        </div>

                        <div>
                            <h1>Medication Tracker</h1>
                            <p>Keep track of your daily medicines and never miss a dose.</p>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button
                        type="button"
                        onClick={() => setShowAddModal(true)}
                        style={{
                            padding: "8px 14px",
                            background: "var(--primary)",
                            color: "white",
                            border: "none",
                            borderRadius: "var(--radius)",
                            fontSize: "13px",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            cursor: "pointer",
                        }}
                    >
                        <Plus size={16} />
                        Add Medicine
                    </button>
                    <div className="date-card">
                        <CalendarDays size={18} />
                        <span>Today</span>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="medication-progress-card">
                <div className="progress-info">
                    <div>
                        <span className="progress-label">Today's medication progress</span>
                        <strong>
                            {takenCount} of {medications.length} medicines taken
                        </strong>
                    </div>

                    <div className="progress-percentage">{progress}%</div>
                </div>

                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* Medication List */}
            <div className="medication-card">
                <div className="medication-card-header">
                    <div>
                        <h2>Today's Medicines</h2>
                        <p>Tap a medicine when you have taken it.</p>
                    </div>
                </div>

                {loading ? (
                    <div style={{ padding: "30px", textAlign: "center", color: "var(--gray-500)" }}>
                        Loading medications...
                    </div>
                ) : (
                    <div className="medication-list">
                        {medications.map((medicine) => (
                            <div
                                key={medicine.id}
                                className={`medication-item ${
                                    medicine.status === "taken" ? "medicine-taken" : ""
                                }`}
                            >
                                <div className="medicine-icon">
                                    <Pill size={21} />
                                </div>

                                <div className="medicine-info">
                                    <h3>{medicine.name}</h3>
                                    <p>{medicine.dosage}</p>
                                </div>

                                <div className="medicine-time">
                                    <Clock3 size={16} />
                                    <span>{medicine.time}</span>
                                </div>

                                <button
                                    type="button"
                                    className={`medicine-status-button ${
                                        medicine.status === "taken"
                                            ? "taken-button"
                                            : "pending-button"
                                    }`}
                                    onClick={() =>
                                        toggleMedication(medicine.id, medicine.status)
                                    }
                                >
                                    {medicine.status === "taken" ? (
                                        <>
                                            <CheckCircle2 size={18} />
                                            Taken
                                        </>
                                    ) : (
                                        <>
                                            <Circle size={18} />
                                            Mark Taken
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Reminder */}
            {nextPending && (
                <div className="medication-reminder">
                    <div className="reminder-icon">
                        <Clock3 size={21} />
                    </div>

                    <div>
                        <h3>Medication Reminder</h3>
                        <p>
                            Your next medicine is <strong>{nextPending.name}</strong> at
                            <strong> {nextPending.time}</strong>.
                        </p>
                    </div>
                </div>
            )}

            {/* Add Medicine Modal */}
            {showAddModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(0,0,0,0.5)", zIndex: 1000,
                    display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
                }}>
                    <div style={{
                        background: "var(--white)", width: "100%", maxWidth: "440px",
                        borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xl)",
                        padding: "24px"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                            <h2 style={{ fontSize: "17px", fontWeight: 700 }}>Add New Medicine</h2>
                            <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddMedicine}>
                            <div style={{ marginBottom: "12px" }}>
                                <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--gray-700)", display: "block", marginBottom: "4px" }}>Medicine Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Paracetamol"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius)", border: "1px solid var(--gray-300)" }}
                                />
                            </div>

                            <div style={{ marginBottom: "12px" }}>
                                <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--gray-700)", display: "block", marginBottom: "4px" }}>Dosage</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 500mg, 1 tablet"
                                    value={newDosage}
                                    onChange={(e) => setNewDosage(e.target.value)}
                                    style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius)", border: "1px solid var(--gray-300)" }}
                                />
                            </div>

                            <div style={{ marginBottom: "12px" }}>
                                <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--gray-700)", display: "block", marginBottom: "4px" }}>Schedule Time</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 09:00 AM"
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                    style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius)", border: "1px solid var(--gray-300)" }}
                                />
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--gray-700)", display: "block", marginBottom: "4px" }}>Instructions</label>
                                <input
                                    type="text"
                                    placeholder="e.g. After breakfast"
                                    value={newInstructions}
                                    onChange={(e) => setNewInstructions(e.target.value)}
                                    style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius)", border: "1px solid var(--gray-300)" }}
                                />
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    style={{ padding: "8px 16px", borderRadius: "var(--radius)", border: "1px solid var(--gray-300)", background: "white", cursor: "pointer" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ padding: "8px 16px", borderRadius: "var(--radius)", border: "none", background: "var(--primary)", color: "white", fontWeight: 600, cursor: "pointer" }}
                                >
                                    Add Medicine
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MedicationTracker;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FilePlus,
    User,
    Pill,
    Plus,
    Trash2,
    Save,
    CheckCircle2,
} from "lucide-react";
import { fetchPatients, createPrescription, getStoredUser } from "../../services/api";
import { type Patient } from "../../data/mockData";
import "./DoctorPrescription.css";

type Medicine = {
    name: string;
    dosage: string;
    duration: string;
    instructions: string;
    frequency?: string;
};

function DoctorPrescription() {
    const navigate = useNavigate();
    const currentUser = getStoredUser();
    const doctorName = currentUser?.name || "Dr. Ananya Sharma";
    const doctorId = currentUser?.profile?.id || "doc-1";

    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatientId, setSelectedPatientId] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [followUpDate, setFollowUpDate] = useState("");
    const [notes, setNotes] = useState("");
    const [saving, setSaving] = useState(false);
    const [savedMsg, setSavedMsg] = useState("");

    const [medicines, setMedicines] = useState<Medicine[]>([
        {
            name: "",
            dosage: "",
            duration: "",
            instructions: "",
            frequency: "Twice daily",
        },
    ]);

    useEffect(() => {
        fetchPatients().then((data) => {
            setPatients(data);
            if (data.length > 0) {
                setSelectedPatientId(data[0].id);
            }
        });
    }, []);

    const addMedicine = () => {
        setMedicines([
            ...medicines,
            {
                name: "",
                dosage: "",
                duration: "",
                instructions: "",
                frequency: "Twice daily",
            },
        ]);
    };

    const removeMedicine = (index: number) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const updateMedicine = (
        index: number,
        field: keyof Medicine,
        value: string
    ) => {
        setMedicines(
            medicines.map((medicine, i) =>
                i === index ? { ...medicine, [field]: value } : medicine
            )
        );
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const selectedPatient = patients.find((p) => p.id === selectedPatientId);
        if (!selectedPatient || !diagnosis) {
            alert("Please select a patient and enter a diagnosis.");
            return;
        }

        const validMeds = medicines.filter((m) => m.name.trim() !== "");
        if (validMeds.length === 0) {
            alert("Please add at least one medication.");
            return;
        }

        setSaving(true);
        await createPrescription({
            doctorId,
            doctorName,
            patientId: selectedPatient.id,
            patientName: selectedPatient.name,
            diagnosis,
            medicines: validMeds.map((m) => ({
                name: m.name,
                dosage: m.dosage || "1 tab",
                frequency: m.frequency || "Once daily",
                duration: m.duration || "5 days",
                instructions: m.instructions || "Take as directed",
            })),
            notes,
            followUpDate,
        });

        setSaving(false);
        setSavedMsg("Prescription created and synced to patient records!");
        setTimeout(() => {
            navigate("/doctor/dashboard");
        }, 1200);
    };

    return (
        <div className="doctor-prescription-page">
            <div className="doctor-prescription-header">
                <div>
                    <h1>Create Prescription</h1>
                    <p>Create and save a digital prescription for your patient.</p>
                </div>

                <div className="prescription-title-icon">
                    <FilePlus size={24} />
                </div>
            </div>

            {savedMsg && (
                <div style={{
                    marginBottom: "16px",
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
                    <span>{savedMsg}</span>
                </div>
            )}

            <form onSubmit={handleSave} className="prescription-form">
                <div className="form-section">
                    <h2>
                        <User size={20} />
                        Patient Information
                    </h2>

                    <label>
                        Select Patient
                        <select
                            value={selectedPatientId}
                            onChange={(e) => setSelectedPatientId(e.target.value)}
                        >
                            {patients.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name} ({p.age}y, {p.gender}, Blood: {p.bloodGroup})
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="form-section">
                    <h2>
                        <FilePlus size={20} />
                        Consultation Details
                    </h2>

                    <div className="form-grid">
                        <label>
                            Diagnosis
                            <input
                                type="text"
                                placeholder="e.g. Viral Pharyngitis / Hypertension"
                                required
                                value={diagnosis}
                                onChange={(e) => setDiagnosis(e.target.value)}
                            />
                        </label>

                        <label>
                            Follow-up Date
                            <input
                                type="date"
                                value={followUpDate}
                                onChange={(e) => setFollowUpDate(e.target.value)}
                            />
                        </label>
                    </div>

                    <label>
                        Doctor's Notes
                        <textarea
                            placeholder="Clinical observations, lifestyle advice, diet restrictions..."
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </label>
                </div>

                <div className="form-section">
                    <div className="medicine-heading">
                        <h2>
                            <Pill size={20} />
                            Medicines
                        </h2>

                        <button
                            type="button"
                            className="add-medicine-button"
                            onClick={addMedicine}
                        >
                            <Plus size={17} />
                            Add Medicine
                        </button>
                    </div>

                    <div className="medicine-list">
                        {medicines.map((medicine, index) => (
                            <div className="medicine-card" key={index}>
                                <div className="medicine-card-header">
                                    <strong>Medicine {index + 1}</strong>

                                    {medicines.length > 1 && (
                                        <button
                                            type="button"
                                            className="remove-medicine-button"
                                            onClick={() => removeMedicine(index)}
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    )}
                                </div>

                                <div className="form-grid">
                                    <label>
                                        Medicine Name
                                        <input
                                            type="text"
                                            placeholder="e.g. Paracetamol 650mg"
                                            value={medicine.name}
                                            onChange={(e) =>
                                                updateMedicine(index, "name", e.target.value)
                                            }
                                        />
                                    </label>

                                    <label>
                                        Dosage
                                        <input
                                            type="text"
                                            placeholder="e.g. 1 tablet (650mg)"
                                            value={medicine.dosage}
                                            onChange={(e) =>
                                                updateMedicine(index, "dosage", e.target.value)
                                            }
                                        />
                                    </label>

                                    <label>
                                        Duration
                                        <input
                                            type="text"
                                            placeholder="e.g. 5 days"
                                            value={medicine.duration}
                                            onChange={(e) =>
                                                updateMedicine(index, "duration", e.target.value)
                                            }
                                        />
                                    </label>

                                    <label>
                                        Instructions
                                        <input
                                            type="text"
                                            placeholder="e.g. After meals, twice daily"
                                            value={medicine.instructions}
                                            onChange={(e) =>
                                                updateMedicine(
                                                    index,
                                                    "instructions",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="prescription-actions">
                    <button
                        type="submit"
                        className="save-prescription-button"
                        disabled={saving}
                        style={{ opacity: saving ? 0.7 : 1 }}
                    >
                        <Save size={18} />
                        {saving ? "Saving & Syncing..." : "Save & Issue Prescription"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DoctorPrescription;
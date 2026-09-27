import { useState } from 'react';
import {
    FilePlus,
    User,
    Pill,
    Plus,
    Trash2,
    Save,
} from 'lucide-react';
import './DoctorPrescription.css';

type Medicine = {
    name: string;
    dosage: string;
    duration: string;
    instructions: string;
};

function DoctorPrescription() {
    const [patient, setPatient] = useState('Ananya Sen');

    const [medicines, setMedicines] = useState<Medicine[]>([
        {
            name: '',
            dosage: '',
            duration: '',
            instructions: '',
        },
    ]);

    const addMedicine = () => {
        setMedicines([
            ...medicines,
            {
                name: '',
                dosage: '',
                duration: '',
                instructions: '',
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
                i === index
                    ? { ...medicine, [field]: value }
                    : medicine
            )
        );
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

            <div className="prescription-form">
                <div className="form-section">
                    <h2>
                        <User size={20} />
                        Patient Information
                    </h2>

                    <label>
                        Select Patient
                        <select
                            value={patient}
                            onChange={(e) => setPatient(e.target.value)}
                        >
                            <option>Ananya Sen</option>
                            <option>Rahul Mehta</option>
                            <option>Shreya Kapoor</option>
                            <option>Arjun Das</option>
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
                                placeholder="e.g. Viral Fever"
                            />
                        </label>

                        <label>
                            Follow-up Date
                            <input type="date" />
                        </label>
                    </div>

                    <label>
                        Doctor's Notes
                        <textarea
                            placeholder="Enter consultation notes..."
                            rows={4}
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
                                            placeholder="Medicine name"
                                            value={medicine.name}
                                            onChange={(e) =>
                                                updateMedicine(index, 'name', e.target.value)
                                            }
                                        />
                                    </label>

                                    <label>
                                        Dosage
                                        <input
                                            type="text"
                                            placeholder="e.g. 500 mg"
                                            value={medicine.dosage}
                                            onChange={(e) =>
                                                updateMedicine(index, 'dosage', e.target.value)
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
                                                updateMedicine(index, 'duration', e.target.value)
                                            }
                                        />
                                    </label>

                                    <label>
                                        Instructions
                                        <input
                                            type="text"
                                            placeholder="e.g. After food"
                                            value={medicine.instructions}
                                            onChange={(e) =>
                                                updateMedicine(
                                                    index,
                                                    'instructions',
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
                    <button type="button" className="save-prescription-button">
                        <Save size={18} />
                        Save Prescription
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DoctorPrescription;
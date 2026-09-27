import { useState } from "react";
import {
    Pill,
    CheckCircle2,
    Clock3,
    CalendarDays,
    Circle,
} from "lucide-react";

import "./MedicationTracker.css";

type Medication = {
    id: number;
    name: string;
    dosage: string;
    time: string;
    period: string;
    status: "taken" | "pending";
};

const initialMedications: Medication[] = [
    {
        id: 1,
        name: "Vitamin D",
        dosage: "1 tablet",
        time: "8:00 AM",
        period: "Morning",
        status: "taken",
    },
    {
        id: 2,
        name: "Metformin",
        dosage: "500 mg",
        time: "1:00 PM",
        period: "Afternoon",
        status: "pending",
    },
    {
        id: 3,
        name: "Calcium",
        dosage: "1 tablet",
        time: "6:00 PM",
        period: "Evening",
        status: "pending",
    },
    {
        id: 4,
        name: "Medicine X",
        dosage: "1 tablet",
        time: "9:00 PM",
        period: "Night",
        status: "pending",
    },
];

function MedicationTracker() {
    const [medications, setMedications] =
        useState<Medication[]>(initialMedications);

    const toggleMedication = (id: number) => {
        setMedications((current) =>
            current.map((medicine) =>
                medicine.id === id
                    ? {
                        ...medicine,
                        status:
                            medicine.status === "taken"
                                ? "pending"
                                : "taken",
                    }
                    : medicine
            )
        );
    };

    const takenCount = medications.filter(
        (medicine) => medicine.status === "taken"
    ).length;

    const progress =
        Math.round((takenCount / medications.length) * 100);

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
                            <p>
                                Keep track of your daily medicines and never miss a dose.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="date-card">
                    <CalendarDays size={18} />
                    <span>Today</span>
                </div>
            </div>

            {/* Progress */}
            <div className="medication-progress-card">
                <div className="progress-info">
                    <div>
                        <span className="progress-label">
                            Today's medication progress
                        </span>

                        <strong>
                            {takenCount} of {medications.length} medicines taken
                        </strong>
                    </div>

                    <div className="progress-percentage">
                        {progress}%
                    </div>
                </div>

                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    />
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

                <div className="medication-list">
                    {medications.map((medicine) => (
                        <div
                            key={medicine.id}
                            className={`medication-item ${medicine.status === "taken"
                                    ? "medicine-taken"
                                    : ""
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
                                <small>{medicine.period}</small>
                            </div>

                            <button
                                type="button"
                                className={`medicine-status-button ${medicine.status === "taken"
                                        ? "taken-button"
                                        : "pending-button"
                                    }`}
                                onClick={() =>
                                    toggleMedication(medicine.id)
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
            </div>

            {/* Reminder */}
            <div className="medication-reminder">
                <div className="reminder-icon">
                    <Clock3 size={21} />
                </div>

                <div>
                    <h3>Medication Reminder</h3>
                    <p>
                        Your next medicine is <strong>Metformin</strong> at
                        <strong> 1:00 PM</strong>.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default MedicationTracker;
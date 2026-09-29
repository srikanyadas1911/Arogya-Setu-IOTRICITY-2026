import { useState, useEffect } from "react";
import { Search, UserRound } from "lucide-react";
import { fetchPatients } from "../../services/api";
import { type Patient } from "../../data/mockData";
import "./AdminPatients.css";

function AdminPatients() {
    const [search, setSearch] = useState("");
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        fetchPatients().then((data) => {
            if (isMounted) {
                setPatients(data);
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    const filteredPatients = patients.filter(
        (patient) =>
            patient.name.toLowerCase().includes(search.toLowerCase()) ||
            patient.phone.includes(search) ||
            patient.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-patients-page">
            <div className="admin-patients-header">
                <div>
                    <h1>Manage Patients</h1>
                    <p>View and manage registered patients across the network.</p>
                </div>
            </div>

            <div className="patient-search">
                <Search size={20} />
                <input
                    type="text"
                    placeholder="Search patients by name, email, or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    Loading patient database...
                </div>
            ) : (
                <div className="admin-patients-list">
                    {filteredPatients.map((patient) => (
                        <div className="admin-patient-card" key={patient.id}>
                            <div className="admin-patient-info">
                                <div className="admin-patient-avatar">
                                    <UserRound size={22} />
                                </div>

                                <div>
                                    <h3>{patient.name}</h3>
                                    <p>
                                        {patient.age} years • {patient.gender} • Blood: {patient.bloodGroup}
                                    </p>
                                    <span>{patient.phone} • {patient.email}</span>
                                </div>
                            </div>

                            <div className="patient-status active">
                                Active
                            </div>

                            <button
                                type="button"
                                className="view-patient-button"
                                onClick={() =>
                                    alert(
                                        `Patient Record: ${patient.name}\nAge: ${patient.age}\nConditions: ${patient.conditions?.join(", ") || "None"}\nAllergies: ${patient.allergies?.join(", ") || "None"}`
                                    )
                                }
                            >
                                View Record
                            </button>
                        </div>
                    ))}

                    {filteredPatients.length === 0 && (
                        <div className="no-patients">No patients found matching '{search}'.</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminPatients;
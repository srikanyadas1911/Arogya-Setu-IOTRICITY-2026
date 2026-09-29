import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserRound, Phone, CalendarDays } from "lucide-react";
import { fetchPatients } from "../../services/api";
import { type Patient } from "../../data/mockData";
import "./DoctorPatients.css";

function DoctorPatients() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [search, setSearch] = useState("");
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

    const filteredPatients = patients.filter((p) => {
        if (!search) return true;
        const s = search.toLowerCase();
        return (
            p.name.toLowerCase().includes(s) ||
            p.phone.includes(s) ||
            p.email.toLowerCase().includes(s)
        );
    });

    return (
        <div className="doctor-patients-page">
            <div className="doctor-patients-header">
                <div>
                    <h1>Patient List</h1>
                    <p>View and manage your registered patients.</p>
                </div>

                <div className="patient-count">
                    {filteredPatients.length} Patients
                </div>
            </div>

            <div className="patient-search">
                <Search size={19} />
                <input
                    type="text"
                    placeholder="Search patients by name or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    Loading patient list...
                </div>
            ) : (
                <div className="patients-table">
                    <div className="patients-table-header">
                        <span>Patient</span>
                        <span>Age / Gender</span>
                        <span>Phone</span>
                        <span>Last Visit</span>
                        <span>Action</span>
                    </div>

                    {filteredPatients.map((patient) => (
                        <div className="patient-row" key={patient.id}>
                            <div className="patient-name">
                                <div className="patient-avatar">
                                    <UserRound size={20} />
                                </div>

                                <strong>{patient.name}</strong>
                            </div>

                            <span>
                                {patient.age} / {patient.gender}
                            </span>

                            <div className="patient-phone">
                                <Phone size={15} />
                                {patient.phone}
                            </div>

                            <div className="patient-visit">
                                <CalendarDays size={15} />
                                {patient.lastVisit || "2026-03-25"}
                            </div>

                            <button
                                className="view-patient-button"
                                onClick={() =>
                                    navigate("/doctor/history", {
                                        state: { patient },
                                    })
                                }
                            >
                                View History
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DoctorPatients;
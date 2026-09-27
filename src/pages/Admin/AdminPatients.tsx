import { Search, UserRound } from 'lucide-react';
import { useState } from 'react';
import './AdminPatients.css';

const patients = [
    {
        name: 'Ananya Sen',
        age: 28,
        gender: 'Female',
        phone: '+91 98765 43210',
        status: 'Active',
    },
    {
        name: 'Rahul Mehta',
        age: 35,
        gender: 'Male',
        phone: '+91 91234 56789',
        status: 'Active',
    },
    {
        name: 'Shreya Kapoor',
        age: 24,
        gender: 'Female',
        phone: '+91 99887 66554',
        status: 'Active',
    },
    {
        name: 'Arjun Das',
        age: 42,
        gender: 'Male',
        phone: '+91 90123 45678',
        status: 'Inactive',
    },
];

function AdminPatients() {
    const [search, setSearch] = useState('');

    const filteredPatients = patients.filter(
        (patient) =>
            patient.name.toLowerCase().includes(search.toLowerCase()) ||
            patient.phone.includes(search)
    );

    return (
        <div className="admin-patients-page">
            <div className="admin-patients-header">
                <div>
                    <h1>Manage Patients</h1>
                    <p>View and manage registered patients.</p>
                </div>
            </div>

            <div className="patient-search">
                <Search size={20} />

                <input
                    type="text"
                    placeholder="Search patients..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="admin-patients-list">
                {filteredPatients.map((patient) => (
                    <div className="admin-patient-card" key={patient.name}>
                        <div className="admin-patient-info">
                            <div className="admin-patient-avatar">
                                <UserRound size={22} />
                            </div>

                            <div>
                                <h3>{patient.name}</h3>
                                <p>
                                    {patient.age} years • {patient.gender}
                                </p>
                                <span>{patient.phone}</span>
                            </div>
                        </div>

                        <div
                            className={
                                patient.status === 'Active'
                                    ? 'patient-status active'
                                    : 'patient-status inactive'
                            }
                        >
                            {patient.status}
                        </div>

                        <button className="view-patient-button">
                            View Profile
                        </button>
                    </div>
                ))}

                {filteredPatients.length === 0 && (
                    <div className="no-patients">
                        No patients found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPatients;
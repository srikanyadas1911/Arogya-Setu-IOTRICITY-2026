import { useState } from 'react';
import {
    Search,
    Stethoscope,
    CheckCircle,
    Clock,
    XCircle,
} from 'lucide-react';
import './AdminDoctors.css';

const initialDoctors = [
    {
        name: 'Dr. Priya Sharma',
        specialty: 'Cardiologist',
        status: 'Verified',
    },
    {
        name: 'Dr. Amit Roy',
        specialty: 'General Physician',
        status: 'Pending',
    },
    {
        name: 'Dr. Neha Kapoor',
        specialty: 'Dermatologist',
        status: 'Verified',
    },
    {
        name: 'Dr. Rahul Sen',
        specialty: 'Neurologist',
        status: 'Pending',
    },
];

function AdminDoctors() {
    const [search, setSearch] = useState('');
    const [doctors, setDoctors] = useState(initialDoctors);

    const filteredDoctors = doctors.filter(
        (doctor) =>
            doctor.name.toLowerCase().includes(search.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(search.toLowerCase())
    );

    const updateStatus = (
        index: number,
        status: 'Verified' | 'Rejected'
    ) => {
        setDoctors((current) =>
            current.map((doctor, i) =>
                i === index ? { ...doctor, status } : doctor
            )
        );
    };

    return (
        <div className="admin-doctors-page">
            <div className="admin-doctors-header">
                <div>
                    <h1>Manage Doctors</h1>
                    <p>Review and manage registered doctors.</p>
                </div>
            </div>

            <div className="doctor-search">
                <Search size={20} />
                <input
                    type="text"
                    placeholder="Search doctors or specialties..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="admin-doctors-list">
                {filteredDoctors.map((doctor, index) => (
                    <div className="admin-doctor-card" key={doctor.name}>
                        <div className="admin-doctor-info">
                            <div className="admin-doctor-avatar">
                                <Stethoscope size={22} />
                            </div>

                            <div>
                                <h3>{doctor.name}</h3>
                                <span>{doctor.specialty}</span>
                            </div>
                        </div>

                        <div
                            className={
                                doctor.status === 'Verified'
                                    ? 'doctor-status verified'
                                    : doctor.status === 'Pending'
                                        ? 'doctor-status pending'
                                        : 'doctor-status rejected'
                            }
                        >
                            {doctor.status === 'Verified' && (
                                <CheckCircle size={16} />
                            )}

                            {doctor.status === 'Pending' && (
                                <Clock size={16} />
                            )}

                            {doctor.status === 'Rejected' && (
                                <XCircle size={16} />
                            )}

                            {doctor.status}
                        </div>

                        <div className="doctor-actions">
                            {doctor.status === 'Pending' && (
                                <>
                                    <button
                                        className="verify-button"
                                        onClick={() => updateStatus(index, 'Verified')}
                                    >
                                        Verify
                                    </button>

                                    <button
                                        className="reject-button"
                                        onClick={() => updateStatus(index, 'Rejected')}
                                    >
                                        Reject
                                    </button>
                                </>
                            )}

                            {doctor.status === 'Verified' && (
                                <button className="view-doctor-button">
                                    View Profile
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {filteredDoctors.length === 0 && (
                    <div className="no-doctors">
                        No doctors found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDoctors;
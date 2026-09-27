import { useState } from 'react';
import {
    Search,
    Stethoscope,
    CheckCircle,
    XCircle,
    Clock,
    FileText,
} from 'lucide-react';
import './AdminVerification.css';

const initialDoctors = [
    {
        name: 'Dr. Amit Roy',
        specialty: 'General Physician',
        license: 'WB-MED-10234',
        submitted: '25 Sep 2026',
        status: 'Pending',
    },
    {
        name: 'Dr. Rahul Sen',
        specialty: 'Neurologist',
        license: 'WB-MED-11892',
        submitted: '24 Sep 2026',
        status: 'Pending',
    },
    {
        name: 'Dr. Sneha Das',
        specialty: 'Pediatrician',
        license: 'WB-MED-12761',
        submitted: '23 Sep 2026',
        status: 'Pending',
    },
];

function AdminVerification() {
    const [search, setSearch] = useState('');
    const [doctors, setDoctors] = useState(initialDoctors);

    const filteredDoctors = doctors.filter(
        (doctor) =>
            doctor.name.toLowerCase().includes(search.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
            doctor.license.toLowerCase().includes(search.toLowerCase())
    );

    const updateStatus = (
        name: string,
        status: 'Verified' | 'Rejected'
    ) => {
        setDoctors((current) =>
            current.map((doctor) =>
                doctor.name === name
                    ? { ...doctor, status }
                    : doctor
            )
        );
    };

    return (
        <div className="admin-verification-page">

            <div className="admin-verification-header">
                <div>
                    <h1>Doctor Verification</h1>
                    <p>
                        Review and verify doctor credentials before approval.
                    </p>
                </div>

                <div className="verification-summary">
                    <Clock size={18} />
                    <span>
                        {doctors.filter(
                            (doctor) => doctor.status === 'Pending'
                        ).length}{' '}
                        Pending
                    </span>
                </div>
            </div>

            <div className="verification-search">
                <Search size={19} />

                <input
                    type="text"
                    placeholder="Search doctor, specialty or license..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="verification-list">

                {filteredDoctors.map((doctor) => (
                    <div
                        className="verification-card"
                        key={doctor.name}
                    >

                        <div className="verification-main">

                            <div className="verification-avatar">
                                <Stethoscope size={24} />
                            </div>

                            <div className="verification-info">
                                <h3>{doctor.name}</h3>
                                <p>{doctor.specialty}</p>

                                <div className="verification-meta">
                                    <span>
                                        License: {doctor.license}
                                    </span>

                                    <span>
                                        Submitted: {doctor.submitted}
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className="verification-status">

                            {doctor.status === 'Pending' && (
                                <span className="status pending">
                                    <Clock size={14} />
                                    Pending
                                </span>
                            )}

                            {doctor.status === 'Verified' && (
                                <span className="status verified">
                                    <CheckCircle size={14} />
                                    Verified
                                </span>
                            )}

                            {doctor.status === 'Rejected' && (
                                <span className="status rejected">
                                    <XCircle size={14} />
                                    Rejected
                                </span>
                            )}

                        </div>

                        <div className="verification-actions">

                            <button className="document-button">
                                <FileText size={16} />
                                View Documents
                            </button>

                            {doctor.status === 'Pending' && (
                                <>
                                    <button
                                        className="reject-button"
                                        onClick={() =>
                                            updateStatus(
                                                doctor.name,
                                                'Rejected'
                                            )
                                        }
                                    >
                                        <XCircle size={16} />
                                        Reject
                                    </button>

                                    <button
                                        className="verify-button"
                                        onClick={() =>
                                            updateStatus(
                                                doctor.name,
                                                'Verified'
                                            )
                                        }
                                    >
                                        <CheckCircle size={16} />
                                        Verify
                                    </button>
                                </>
                            )}

                        </div>

                    </div>
                ))}

                {filteredDoctors.length === 0 && (
                    <div className="no-verification-results">
                        No doctors found.
                    </div>
                )}

            </div>
        </div>
    );
}

export default AdminVerification;
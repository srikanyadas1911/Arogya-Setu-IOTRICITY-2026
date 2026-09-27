import { Search, UserRound, Phone, CalendarDays } from 'lucide-react';
import './DoctorPatients.css';

const patients = [
    {
        name: 'Ananya Sen',
        age: 24,
        gender: 'Female',
        phone: '+91 98765 43210',
        lastVisit: '20 Sep 2026',
    },
    {
        name: 'Rahul Mehta',
        age: 42,
        gender: 'Male',
        phone: '+91 98765 12345',
        lastVisit: '18 Sep 2026',
    },
    {
        name: 'Shreya Kapoor',
        age: 31,
        gender: 'Female',
        phone: '+91 98765 67890',
        lastVisit: '15 Sep 2026',
    },
    {
        name: 'Arjun Das',
        age: 36,
        gender: 'Male',
        phone: '+91 98765 24680',
        lastVisit: '12 Sep 2026',
    },
];

function DoctorPatients() {
    return (
        <div className="doctor-patients-page">
            <div className="doctor-patients-header">
                <div>
                    <h1>Patient List</h1>
                    <p>View and manage your registered patients.</p>
                </div>

                <div className="patient-count">
                    {patients.length} Patients
                </div>
            </div>

            <div className="patient-search">
                <Search size={19} />
                <input
                    type="text"
                    placeholder="Search patients..."
                />
            </div>

            <div className="patients-table">
                <div className="patients-table-header">
                    <span>Patient</span>
                    <span>Age / Gender</span>
                    <span>Phone</span>
                    <span>Last Visit</span>
                    <span>Action</span>
                </div>

                {patients.map((patient) => (
                    <div className="patient-row" key={patient.name}>
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
                            {patient.lastVisit}
                        </div>

                        <button className="view-patient-button">
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DoctorPatients;
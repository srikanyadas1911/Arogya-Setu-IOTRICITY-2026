import { Search, FileText, CalendarDays, User } from 'lucide-react';
import './DoctorHistory.css';

const history = [
    {
        patient: 'Ananya Sen',
        age: 28,
        date: '27 Sep 2026',
        diagnosis: 'Viral Fever',
        notes: 'Mild fever and weakness for 3 days.',
    },
    {
        patient: 'Rahul Mehta',
        age: 35,
        date: '26 Sep 2026',
        diagnosis: 'Hypertension',
        notes: 'Blood pressure slightly elevated.',
    },
    {
        patient: 'Shreya Kapoor',
        age: 24,
        date: '25 Sep 2026',
        diagnosis: 'Migraine',
        notes: 'Recurring headache and sensitivity to light.',
    },
    {
        patient: 'Arjun Das',
        age: 41,
        date: '23 Sep 2026',
        diagnosis: 'Diabetes Follow-up',
        notes: 'Routine glucose monitoring follow-up.',
    },
];

function DoctorHistory() {
    return (
        <div className="doctor-history-page">
            <div className="doctor-history-header">
                <div>
                    <h1>Patient History</h1>
                    <p>Review previous consultations and medical records.</p>
                </div>
            </div>

            <div className="history-search">
                <Search size={20} />
                <input
                    type="text"
                    placeholder="Search patient history..."
                />
            </div>

            <div className="history-list">
                {history.map((record) => (
                    <div className="history-card" key={`${record.patient}-${record.date}`}>
                        <div className="history-patient">
                            <div className="history-avatar">
                                <User size={22} />
                            </div>

                            <div>
                                <h3>{record.patient}</h3>
                                <span>{record.age} years old</span>
                            </div>
                        </div>

                        <div className="history-details">
                            <div>
                                <CalendarDays size={18} />
                                <span>{record.date}</span>
                            </div>

                            <div>
                                <FileText size={18} />
                                <span>{record.diagnosis}</span>
                            </div>
                        </div>

                        <p className="history-notes">
                            {record.notes}
                        </p>

                        <button className="view-history-button">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DoctorHistory;
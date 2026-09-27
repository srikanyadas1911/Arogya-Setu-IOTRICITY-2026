import { CalendarDays, Clock, Video, UserRound } from 'lucide-react';
import './DoctorAppointments.css';

const appointments = [
    {
        patient: 'Ananya Sen',
        age: 24,
        time: '10:30 AM',
        type: 'Video Consultation',
        status: 'Upcoming',
    },
    {
        patient: 'Rahul Mehta',
        age: 42,
        time: '12:00 PM',
        type: 'Video Consultation',
        status: 'Upcoming',
    },
    {
        patient: 'Shreya Kapoor',
        age: 31,
        time: '3:30 PM',
        type: 'Follow-up',
        status: 'Upcoming',
    },
];

function DoctorAppointments() {
    return (
        <div className="doctor-appointments-page">
            <div className="doctor-appointments-header">
                <div>
                    <h1>Today's Appointments</h1>
                    <p>Manage your consultations and patient appointments.</p>
                </div>

                <div className="doctor-date-card">
                    <CalendarDays size={20} />
                    <span>Today</span>
                </div>
            </div>

            <div className="appointments-list">
                {appointments.map((appointment) => (
                    <div className="appointment-card" key={`${appointment.patient}-${appointment.time}`}>
                        <div className="appointment-patient">
                            <div className="patient-icon">
                                <UserRound size={22} />
                            </div>

                            <div>
                                <h3>{appointment.patient}</h3>
                                <p>Age {appointment.age}</p>
                            </div>
                        </div>

                        <div className="appointment-info">
                            <div>
                                <Clock size={17} />
                                <span>{appointment.time}</span>
                            </div>

                            <div>
                                <Video size={17} />
                                <span>{appointment.type}</span>
                            </div>
                        </div>

                        <span className="appointment-status">
                            {appointment.status}
                        </span>

                        <button className="join-button">
                            Join Consultation
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DoctorAppointments;
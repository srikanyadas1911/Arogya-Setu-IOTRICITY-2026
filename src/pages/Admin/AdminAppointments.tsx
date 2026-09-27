import { CalendarDays, Clock, UserRound, Stethoscope } from 'lucide-react';
import './AdminAppointments.css';

const appointments = [
    {
        patient: 'Ananya Sen',
        doctor: 'Dr. Priya Sharma',
        date: '27 Sep 2026',
        time: '10:00 AM',
        type: 'Video Consultation',
        status: 'Confirmed',
    },
    {
        patient: 'Rahul Mehta',
        doctor: 'Dr. Amit Roy',
        date: '27 Sep 2026',
        time: '11:30 AM',
        type: 'In-Person',
        status: 'Pending',
    },
    {
        patient: 'Shreya Kapoor',
        doctor: 'Dr. Neha Kapoor',
        date: '28 Sep 2026',
        time: '2:00 PM',
        type: 'Video Consultation',
        status: 'Confirmed',
    },
    {
        patient: 'Arjun Das',
        doctor: 'Dr. Rahul Sen',
        date: '28 Sep 2026',
        time: '4:00 PM',
        type: 'In-Person',
        status: 'Completed',
    },
];

function AdminAppointments() {
    return (
        <div className="admin-appointments-page">
            <div className="admin-appointments-header">
                <div>
                    <h1>Manage Appointments</h1>
                    <p>Monitor and manage patient appointments.</p>
                </div>
            </div>

            <div className="admin-appointments-list">
                {appointments.map((appointment, index) => (
                    <div className="admin-appointment-card" key={index}>

                        <div className="appointment-people">

                            <div className="appointment-person">
                                <div className="appointment-icon patient">
                                    <UserRound size={20} />
                                </div>

                                <div>
                                    <span>Patient</span>
                                    <h3>{appointment.patient}</h3>
                                </div>
                            </div>

                            <div className="appointment-person">
                                <div className="appointment-icon doctor">
                                    <Stethoscope size={20} />
                                </div>

                                <div>
                                    <span>Doctor</span>
                                    <h3>{appointment.doctor}</h3>
                                </div>
                            </div>

                        </div>

                        <div className="appointment-details">

                            <div>
                                <CalendarDays size={17} />
                                <span>{appointment.date}</span>
                            </div>

                            <div>
                                <Clock size={17} />
                                <span>{appointment.time}</span>
                            </div>

                            <span className="appointment-type">
                                {appointment.type}
                            </span>

                        </div>

                        <div
                            className={`appointment-status ${appointment.status.toLowerCase()}`}
                        >
                            {appointment.status}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminAppointments;
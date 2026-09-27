import { useState } from 'react';
import { CalendarDays, Clock, Plus } from 'lucide-react';
import './DoctorSchedule.css';

const initialSlots = [
    { time: '10:00 AM', status: 'Available' },
    { time: '11:00 AM', status: 'Booked' },
    { time: '12:00 PM', status: 'Available' },
    { time: '2:00 PM', status: 'Booked' },
    { time: '3:00 PM', status: 'Available' },
    { time: '4:00 PM', status: 'Available' },
];

function DoctorSchedule() {
    const [slots, setSlots] = useState(initialSlots);

    const toggleSlot = (index: number) => {
        setSlots((current) =>
            current.map((slot, i) =>
                i === index
                    ? {
                        ...slot,
                        status:
                            slot.status === 'Available' ? 'Booked' : 'Available',
                    }
                    : slot
            )
        );
    };

    return (
        <div className="doctor-schedule-page">
            <div className="doctor-schedule-header">
                <div>
                    <h1>My Schedule</h1>
                    <p>Manage your consultation availability.</p>
                </div>

                <button className="add-slot-button">
                    <Plus size={18} />
                    Add Time Slot
                </button>
            </div>

            <div className="schedule-date-card">
                <CalendarDays size={20} />
                <div>
                    <strong>Today</strong>
                    <span>Sunday, 27 September 2026</span>
                </div>
            </div>

            <div className="schedule-grid">
                {slots.map((slot, index) => (
                    <div className="schedule-card" key={slot.time}>
                        <div className="schedule-time">
                            <Clock size={20} />
                            <strong>{slot.time}</strong>
                        </div>

                        <span
                            className={
                                slot.status === 'Available'
                                    ? 'slot-available'
                                    : 'slot-booked'
                            }
                        >
                            {slot.status}
                        </span>

                        <button
                            className="slot-action"
                            onClick={() => toggleSlot(index)}
                        >
                            {slot.status === 'Available'
                                ? 'Mark Booked'
                                : 'Make Available'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DoctorSchedule;
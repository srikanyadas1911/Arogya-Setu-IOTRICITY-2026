import { useState, useEffect } from "react";
import { CalendarDays, Clock, Plus, Check } from "lucide-react";
import { fetchDoctorSchedule, saveDoctorSchedule, getStoredUser } from "../../services/api";
import { type TimeSlot } from "../../data/mockData";
import "./DoctorSchedule.css";

function DoctorSchedule() {
    const currentUser = getStoredUser();
    const doctorId = currentUser?.profile?.id || "doc-1";

    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(true);
    const [savedMsg, setSavedMsg] = useState("");

    useEffect(() => {
        let isMounted = true;
        fetchDoctorSchedule(doctorId).then((data) => {
            if (isMounted) {
                setSlots(data);
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [doctorId]);

    const toggleSlot = async (index: number) => {
        const updated = slots.map((s, i) =>
            i === index ? { ...s, available: !s.available } : s
        );
        setSlots(updated);
        await saveDoctorSchedule(updated, doctorId);
        setSavedMsg("Availability updated successfully");
        setTimeout(() => setSavedMsg(""), 2000);
    };

    const addSlot = async () => {
        const time = prompt("Enter new time slot (e.g. 05:30 PM):", "05:30 PM");
        if (!time) return;
        const updated = [...slots, { time, available: true }];
        setSlots(updated);
        await saveDoctorSchedule(updated, doctorId);
        setSavedMsg("New slot added");
        setTimeout(() => setSavedMsg(""), 2000);
    };

    return (
        <div className="doctor-schedule-page">
            <div className="doctor-schedule-header">
                <div>
                    <h1>My Schedule</h1>
                    <p>Manage your consultation availability for telehealth patients.</p>
                </div>

                <button className="add-slot-button" onClick={addSlot} type="button">
                    <Plus size={18} />
                    Add Time Slot
                </button>
            </div>

            {savedMsg && (
                <div style={{
                    marginBottom: "16px",
                    padding: "10px 14px",
                    background: "var(--success-bg)",
                    border: "1px solid #86efac",
                    borderRadius: "var(--radius)",
                    color: "var(--success)",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                }}>
                    <Check size={16} />
                    <span>{savedMsg}</span>
                </div>
            )}

            <div className="schedule-date-card">
                <CalendarDays size={20} />
                <div>
                    <strong>Today's Active Schedule</strong>
                    <span>Synchronized with patient booking engine</span>
                </div>
            </div>

            {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--gray-500)" }}>
                    Loading schedule slots...
                </div>
            ) : (
                <div className="schedule-grid">
                    {slots.map((slot, index) => (
                        <div className="schedule-card" key={slot.time}>
                            <div className="schedule-time">
                                <Clock size={20} />
                                <strong>{slot.time}</strong>
                            </div>

                            <span
                                className={
                                    slot.available ? "slot-available" : "slot-booked"
                                }
                            >
                                {slot.available ? "Available" : "Booked / Off"}
                            </span>

                            <button
                                type="button"
                                className="slot-action"
                                onClick={() => toggleSlot(index)}
                            >
                                {slot.available ? "Mark Off" : "Make Available"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DoctorSchedule;
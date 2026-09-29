import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Video,
    Mic,
    MicOff,
    VideoOff,
    PhoneOff,
    Copy,
    CheckCircle2,
    Clock,
    UserRound,
    CalendarDays,
} from "lucide-react";
import { getStoredUser, createConsultationSession, startConsultationSession, endConsultationSession } from "../../services/api";
import "./JoinConsultation.css";

function JoinConsultation() {
    const navigate = useNavigate();
    const location = useLocation();

    const appt = location.state?.appointment;
    const currentUser = getStoredUser();

    const doctorName = appt?.doctorName || "Dr. Ananya Sharma";
    const specialty = appt?.specialization || "General Physician";
    const doctorId = appt?.doctorId || "doc-1";
    const patientId = appt?.patientId || currentUser?.profile?.id || "pat-1";
    const apptId = appt?.id || "appt-1";

    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [copied, setCopied] = useState(false);
    const [inCall, setInCall] = useState(false);
    const [callDuration, setCallDuration] = useState(0);

    const [meetLink, setMeetLink] = useState(
        appt?.meetingLink || `https://meet.arogyasetu.demo/room/${apptId}`
    );

    useEffect(() => {
        // Create or get session on backend
        createConsultationSession(doctorId, patientId, apptId).then((res) => {
            if (res && res.meetingLink) {
                setMeetLink(res.meetingLink);
            }
        });
    }, [doctorId, patientId, apptId]);

    // Timer for active call
    useEffect(() => {
        let timer: any = null;
        if (inCall) {
            timer = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
        } else {
            setCallDuration(0);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [inCall]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const copyMeetLink = async () => {
        try {
            await navigator.clipboard.writeText(meetLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    const handleStartCall = async () => {
        setInCall(true);
        const roomName = meetLink.split("/").pop() || apptId;
        await startConsultationSession(roomName);
    };

    const handleEndCall = async () => {
        setInCall(false);
        const roomName = meetLink.split("/").pop() || apptId;
        await endConsultationSession(roomName);
        navigate("/patient/appointments");
    };

    const getInitials = (name: string) => {
        return name
            .replace("Dr.", "")
            .trim()
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <div className="consultation-page">
            {/* Header */}
            <div className="consultation-header">
                <div>
                    <h1>Join Consultation</h1>
                    <p>Connect with your doctor through a secure virtual consultation room.</p>
                </div>

                <div className="consultation-status">
                    <span
                        className="status-dot"
                        style={{ background: inCall ? "#22c55e" : "#3b82f6" }}
                    ></span>
                    {inCall ? `Call in Progress (${formatTime(callDuration)})` : "Appointment Confirmed"}
                </div>
            </div>

            <div className="consultation-layout">
                {/* Main Video Area */}
                <div className="video-section">
                    <div className="video-preview">
                        <div className="doctor-video-placeholder">
                            <div className="large-doctor-avatar">
                                {getInitials(doctorName)}
                            </div>

                            <h2>{doctorName}</h2>
                            <p>{specialty}</p>

                            <span className="waiting-text">
                                {inCall
                                    ? "Live Secure Telehealth Stream Connected"
                                    : "Waiting for you to join the call..."}
                            </span>
                        </div>

                        {/* Patient Preview */}
                        <div className="patient-preview">
                            <UserRound size={22} />
                            <span>You {cameraOn ? "" : "(Camera Off)"}</span>
                        </div>
                    </div>

                    {/* Video Controls */}
                    <div className="video-controls">
                        {/* Microphone */}
                        <button
                            type="button"
                            className={`control-button ${micOn ? "" : "off"}`}
                            onClick={() => setMicOn(!micOn)}
                            title={micOn ? "Mute Microphone" : "Unmute Microphone"}
                        >
                            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                        </button>

                        {/* Camera */}
                        <button
                            type="button"
                            className={`control-button ${cameraOn ? "" : "off"}`}
                            onClick={() => setCameraOn(!cameraOn)}
                            title={cameraOn ? "Turn Camera Off" : "Turn Camera On"}
                        >
                            {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
                        </button>

                        {/* Join / Leave Call */}
                        {!inCall ? (
                            <button
                                type="button"
                                onClick={handleStartCall}
                                style={{
                                    padding: "10px 24px",
                                    borderRadius: "30px",
                                    background: "#22c55e",
                                    color: "white",
                                    border: "none",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                <Video size={18} />
                                Start Call
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="control-button end-call"
                                onClick={handleEndCall}
                                title="End Call"
                            >
                                <PhoneOff size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Consultation Details Sidebar */}
                <div className="consultation-sidebar">
                    <div className="sidebar-card">
                        <h2>Consultation Details</h2>

                        <div className="consultation-doctor-card">
                            <div className="consultation-doctor-avatar">
                                {getInitials(doctorName)}
                            </div>

                            <div>
                                <strong>{doctorName}</strong>
                                <span>{specialty}</span>
                            </div>
                        </div>

                        <div className="consultation-info-list">
                            <div className="info-item">
                                <CalendarDays size={18} />
                                <div>
                                    <span>Date</span>
                                    <strong>{appt?.date || "Today"}</strong>
                                </div>
                            </div>

                            <div className="info-item">
                                <Clock size={18} />
                                <div>
                                    <span>Scheduled Time</span>
                                    <strong>{appt?.time || "10:30 AM"}</strong>
                                </div>
                            </div>

                            <div className="info-item">
                                <Video size={18} />
                                <div>
                                    <span>Type</span>
                                    <strong>Video Consultation</strong>
                                </div>
                            </div>
                        </div>

                        {/* Meeting Link */}
                        <div className="meeting-link-box">
                            <label>Secure Consultation Room Link</label>

                            <div className="link-copy-row">
                                <input type="text" value={meetLink} readOnly />

                                <button
                                    type="button"
                                    onClick={copyMeetLink}
                                    title="Copy meeting link"
                                >
                                    {copied ? (
                                        <CheckCircle2 size={16} />
                                    ) : (
                                        <Copy size={16} />
                                    )}
                                </button>
                            </div>

                            {copied && (
                                <span className="copied-text">
                                    Link copied to clipboard!
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinConsultation;

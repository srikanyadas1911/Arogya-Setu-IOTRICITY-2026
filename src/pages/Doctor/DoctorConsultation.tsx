import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Video,
    Mic,
    MicOff,
    VideoOff,
    PhoneOff,
    MessageSquare,
    User,
} from "lucide-react";
import { startConsultationSession, endConsultationSession } from "../../services/api";
import "./DoctorConsultation.css";

function DoctorConsultation() {
    const navigate = useNavigate();
    const location = useLocation();

    const appt = location.state?.appointment;
    const patientName = appt?.patientName || "Priya Sharma";
    const patientDetails = appt ? `${appt.reason || "General Consultation"} • ${appt.date}` : "Patient • 28 years";
    const apptId = appt?.id || "appt-1";

    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [inCall, setInCall] = useState(true);
    const [callDuration, setCallDuration] = useState(0);

    useEffect(() => {
        const roomName = appt?.meetingLink?.split("/").pop() || apptId;
        startConsultationSession(roomName);
    }, [appt, apptId]);

    useEffect(() => {
        let timer: any = null;
        if (inCall) {
            timer = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
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

    const handleEndCall = async () => {
        setInCall(false);
        const roomName = appt?.meetingLink?.split("/").pop() || apptId;
        await endConsultationSession(roomName);
        navigate("/doctor/dashboard");
    };

    return (
        <div className="doctor-consultation-page">
            <div className="consultation-header">
                <div>
                    <h1>Active Consultation</h1>
                    <p>Connect with your patient through a secure virtual consultation.</p>
                </div>

                <span className="consultation-status" style={{ background: inCall ? "#22c55e" : "#eab308" }}>
                    ● {inCall ? `In Call (${formatTime(callDuration)})` : "Waiting Room"}
                </span>
            </div>

            <div className="video-area">
                <div className="main-video">
                    <div className="patient-placeholder">
                        <div className="patient-avatar">
                            <User size={42} />
                        </div>
                        <h2>{patientName}</h2>
                        <p>{patientDetails}</p>
                        <span style={{ fontSize: "12px", color: "var(--gray-400)", marginTop: "8px" }}>
                            Secure WebRTC Video Tunnel Active
                        </span>
                    </div>

                    <div className="doctor-preview">
                        {cameraOn ? (
                            <div className="doctor-camera">
                                <Video size={24} />
                                <span>You</span>
                            </div>
                        ) : (
                            <div className="camera-off">
                                <VideoOff size={24} />
                                <span>Camera Off</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="consultation-controls">
                    <button
                        type="button"
                        className={`control-button ${!micOn ? "active-off" : ""}`}
                        onClick={() => setMicOn(!micOn)}
                        title={micOn ? "Mute" : "Unmute"}
                    >
                        {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>

                    <button
                        type="button"
                        className={`control-button ${!cameraOn ? "active-off" : ""}`}
                        onClick={() => setCameraOn(!cameraOn)}
                        title={cameraOn ? "Turn Camera Off" : "Turn Camera On"}
                    >
                        {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
                    </button>

                    <button
                        type="button"
                        className="control-button"
                        onClick={() => navigate("/doctor/prescription")}
                        title="Issue Prescription"
                    >
                        <MessageSquare size={20} />
                    </button>

                    <button
                        type="button"
                        className="end-call-button"
                        onClick={handleEndCall}
                    >
                        <PhoneOff size={20} />
                        End Consultation
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DoctorConsultation;
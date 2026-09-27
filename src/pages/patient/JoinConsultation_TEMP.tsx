
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

import "./JoinConsultation.css";
function JoinConsultation() {
    const navigate = useNavigate();

    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [copied, setCopied] = useState(false);
    const meetLink =
        "https://meet.arogyasetu.com/consult/AS1025";

    const copyMeetLink = async () => {
        try {
            await navigator.clipboard.writeText(meetLink);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="consultation-page">

            {/* Header */}
            <div className="consultation-header">
                <div>
                    <h1>Join Consultation</h1>

                    <p>
                        Connect with your doctor through a secure
                        virtual consultation.
                    </p>
                </div>

                <div className="consultation-status">
                    <span className="status-dot"></span>
                    Appointment Confirmed
                </div>
            </div>


            <div className="consultation-layout">

                {/* Main Video Area */}
                <div className="video-section">

                    <div className="video-preview">

                        <div className="doctor-video-placeholder">
                            <div className="large-doctor-avatar">
                                AS
                            </div>

                            <h2>Dr. Ananya Sharma</h2>

                            <p>
                                General Physician
                            </p>

                            <span className="waiting-text">
                                Waiting for you to join...
                            </span>
                        </div>


                        {/* Patient Preview */}
                        <div className="patient-preview">
                            <UserRound size={22} />
                            <span>You</span>
                        </div>

                    </div>


                    {/* Video Controls */}
                    <div className="video-controls">

                        {/* Microphone */}
                        <button
                            className={`control-button ${micOn ? "" : "off"
                                }`}
                            onClick={() => setMicOn(!micOn)}
                            title={
                                micOn
                                    ? "Mute microphone"
                                    : "Unmute microphone"
                            }
                        >
                            {micOn ? (
                                <Mic size={20} />
                            ) : (
                                <MicOff size={20} />
                            )}
                        </button>


                        {/* Camera */}
                        <button
                            className={`control-button ${cameraOn ? "" : "off"
                                }`}
                            onClick={() => setCameraOn(!cameraOn)}
                            title={
                                cameraOn
                                    ? "Turn off camera"
                                    : "Turn on camera"
                            }
                        >
                            {cameraOn ? (
                                <Video size={20} />
                            ) : (
                                <VideoOff size={20} />
                            )}
                        </button>


                        {/* Leave Consultation */}
                        <button
                            className="end-call-button"
                            onClick={() =>
                                navigate("/patient/appointments")
                            }
                        >
                            <PhoneOff size={19} />
                            Leave Consultation
                        </button>

                    </div>

                </div>


                {/* Consultation Information */}
                <div className="consultation-sidebar">

                    {/* Doctor Information */}
                    <div className="consultation-card">

                        <div className="consultation-card-title">
                            <UserRound size={19} />
                            <h2>Doctor</h2>
                        </div>

                        <div className="consultation-doctor">

                            <div className="consultation-avatar">
                                AS
                            </div>

                            <div>
                                <strong>
                                    Dr. Ananya Sharma
                                </strong>

                                <span>
                                    General Physician
                                </span>
                            </div>

                        </div>

                    </div>


                    {/* Appointment Details */}
                    <div className="consultation-card">

                        <div className="consultation-card-title">
                            <Clock size={19} />
                            <h2>Appointment</h2>
                        </div>

                        <div className="appointment-info">

                            <div>
                                <span>Date</span>
                                <strong>Today</strong>
                            </div>

                            <div>
                                <span>Time</span>
                                <strong>10:30 AM</strong>
                            </div>

                            <div>
                                <span>Type</span>
                                <strong>
                                    Video Consultation
                                </strong>
                            </div>

                        </div>

                    </div>


                    {/* Meeting Link */}
                    <div className="consultation-card">

                        <div className="consultation-card-title">
                            <Video size={19} />
                            <h2>Meeting Link</h2>
                        </div>

                        <div className="meeting-link-box">
                            <span>{meetLink}</span>
                        </div>

                        <button
                            className="copy-link-button"
                            onClick={copyMeetLink}
                        >
                            {copied ? (
                                <>
                                    <CheckCircle2 size={17} />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy size={17} />
                                    Copy Meeting Link
                                </>
                            )}
                        </button>

                    </div>


                    {/* Notice */}
                    <div className="consultation-notice">

                        <strong>Before joining</strong>

                        <p>
                            Please make sure your microphone
                            and camera are working properly.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default JoinConsultation;


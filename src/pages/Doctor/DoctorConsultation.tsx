import { useState } from 'react';
import {
    Video,
    Mic,
    MicOff,
    VideoOff,
    PhoneOff,
    MessageSquare,
    User,
} from 'lucide-react';
import './DoctorConsultation.css';

function DoctorConsultation() {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);

    return (
        <div className="doctor-consultation-page">
            <div className="consultation-header">
                <div>
                    <h1>Join Consultation</h1>
                    <p>Connect with your patient through a secure virtual consultation.</p>
                </div>

                <span className="consultation-status">
                    ● Waiting Room
                </span>
            </div>

            <div className="video-area">
                <div className="main-video">
                    <div className="patient-placeholder">
                        <div className="patient-avatar">
                            <User size={42} />
                        </div>
                        <h2>Ananya Sen</h2>
                        <p>Patient • 28 years</p>
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
                        className={`control-button ${!micOn ? 'active-off' : ''}`}
                        onClick={() => setMicOn(!micOn)}
                    >
                        {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>

                    <button
                        className={`control-button ${!cameraOn ? 'active-off' : ''}`}
                        onClick={() => setCameraOn(!cameraOn)}
                    >
                        {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
                    </button>

                    <button className="control-button">
                        <MessageSquare size={20} />
                    </button>

                    <button className="end-call-button">
                        <PhoneOff size={20} />
                        End Consultation
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DoctorConsultation;
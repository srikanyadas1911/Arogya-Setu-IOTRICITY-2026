import { useRef, useState } from "react";
import {
    Upload,
    FileImage,
    FileText,
    X,
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";

import "./UploadPrescription.css";

function UploadPrescription() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploaded, setUploaded] = useState(false);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setSelectedFile(file);
        setUploaded(false);
    };

    const removeFile = () => {
        setSelectedFile(null);
        setUploaded(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUpload = () => {
        if (!selectedFile) return;

        setUploaded(true);
    };

    return (
        <div className="upload-prescription-page">

            {/* Header */}

            <div className="upload-header">
                <div>
                    <h1>Upload Prescription</h1>

                    <p>
                        Upload your prescription and keep your medical
                        records organized digitally.
                    </p>
                </div>
            </div>

            {/* Upload Card */}

            <div className="upload-card">

                {!selectedFile && !uploaded && (
                    <div
                        className="upload-drop-zone"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="upload-icon">
                            <Upload size={28} />
                        </div>

                        <h2>Upload your prescription</h2>

                        <p>
                            Click here to select an image or PDF file
                        </p>

                        <span>
                            Supported formats: JPG, PNG, PDF
                        </span>

                        <button
                            type="button"
                            className="choose-file-button"
                            onClick={(event) => {
                                event.stopPropagation();
                                fileInputRef.current?.click();
                            }}
                        >
                            <Upload size={17} />
                            Choose File
                        </button>
                    </div>
                )}

                {/* Hidden Input */}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    hidden
                />

                {/* Selected File */}

                {selectedFile && !uploaded && (
                    <div className="selected-file-section">

                        <div className="selected-file">

                            <div className="file-icon">
                                {selectedFile.type === "application/pdf" ? (
                                    <FileText size={24} />
                                ) : (
                                    <FileImage size={24} />
                                )}
                            </div>

                            <div className="file-details">
                                <strong>{selectedFile.name}</strong>

                                <span>
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                            </div>

                            <button
                                type="button"
                                className="remove-file-button"
                                onClick={removeFile}
                                title="Remove file"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        <button
                            type="button"
                            className="upload-button"
                            onClick={handleUpload}
                        >
                            <Upload size={18} />
                            Upload Prescription
                        </button>

                    </div>
                )}

                {/* Success */}

                {uploaded && (
                    <div className="upload-success">

                        <div className="success-icon">
                            <CheckCircle2 size={42} />
                        </div>

                        <h2>Prescription Uploaded Successfully</h2>

                        <p>
                            Your prescription has been added to your
                            digital health records.
                        </p>

                        <button
                            type="button"
                            className="upload-another-button"
                            onClick={removeFile}
                        >
                            Upload Another Prescription
                        </button>

                    </div>
                )}

            </div>

            {/* Security Notice */}

            <div className="upload-security">

                <div className="security-icon">
                    <ShieldCheck size={22} />
                </div>

                <div>
                    <strong>Your health data is protected</strong>

                    <p>
                        Uploaded prescriptions are securely stored and
                        can be accessed from your Arogya Setu health records.
                    </p>
                </div>

            </div>

            {/* Tips */}

            <div className="upload-tips">

                <h2>Tips for a better upload</h2>

                <div className="tips-grid">

                    <div className="tip">
                        <FileImage size={20} />
                        <span>
                            Make sure the prescription image is clear.
                        </span>
                    </div>

                    <div className="tip">
                        <FileText size={20} />
                        <span>
                            PDF files should contain readable text.
                        </span>
                    </div>

                    <div className="tip">
                        <Upload size={20} />
                        <span>
                            Upload one prescription at a time.
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default UploadPrescription;
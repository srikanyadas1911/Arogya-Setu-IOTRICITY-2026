import { useRef, useState } from "react";
import {
    Upload,
    FileImage,
    FileText,
    X,
    CheckCircle2,
    ShieldCheck,
    Cpu,
} from "lucide-react";
import { uploadPrescription } from "../../services/api";
import "./UploadPrescription.css";

function UploadPrescription() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [ocrResult, setOcrResult] = useState<any>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        setUploaded(false);
        setOcrResult(null);
    };

    const removeFile = () => {
        setSelectedFile(null);
        setUploaded(false);
        setOcrResult(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setUploading(true);
        const result = await uploadPrescription(selectedFile);
        setUploading(false);
        setUploaded(true);
        setOcrResult(result);
    };

    return (
        <div className="upload-prescription-page">
            {/* Header */}
            <div className="upload-header">
                <div>
                    <h1>Upload Prescription</h1>
                    <p>
                        Upload your prescription and let Arogya Setu Medical OCR extract medication schedules into your digital health records.
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
                        <p>Click here to select an image or PDF file</p>
                        <span>Supported formats: JPG, PNG, PDF</span>

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
                                <span>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
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
                            disabled={uploading}
                            style={{ opacity: uploading ? 0.7 : 1 }}
                        >
                            <Upload size={18} />
                            {uploading ? "Analyzing document with OCR..." : "Upload & Analyze Prescription"}
                        </button>
                    </div>
                )}

                {/* Success & OCR Structured Information */}
                {uploaded && (
                    <div className="upload-success">
                        <div className="success-icon">
                            <CheckCircle2 size={42} />
                        </div>

                        <h2>Prescription Uploaded &amp; Verified</h2>
                        <p>{ocrResult?.message || "Your prescription has been added to your digital health records."}</p>

                        {ocrResult?.detectedMedicines && (
                            <div style={{
                                width: "100%", maxWidth: "540px", margin: "20px auto 0",
                                textAlign: "left", background: "var(--gray-50)",
                                borderRadius: "var(--radius)", padding: "16px",
                                border: "1px solid var(--gray-200)"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", color: "var(--primary)", fontWeight: 700, fontSize: "14px" }}>
                                    <Cpu size={18} />
                                    <span>OCR Extracted Medications ({ocrResult.detectedMedicines.length})</span>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {ocrResult.detectedMedicines.map((m: any, idx: number) => (
                                        <div key={idx} style={{ background: "white", padding: "10px 12px", borderRadius: "var(--radius)", border: "1px solid var(--gray-200)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div>
                                                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--gray-900)" }}>{m.name}</div>
                                                <div style={{ fontSize: "12px", color: "var(--gray-500)" }}>{m.frequency} &nbsp;•&nbsp; {m.duration}</div>
                                            </div>
                                            <span style={{ fontSize: "12px", fontWeight: 700, background: "var(--primary-bg)", color: "var(--primary)", padding: "4px 8px", borderRadius: "12px" }}>
                                                {m.dosage}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                            <button
                                type="button"
                                className="upload-another-button"
                                onClick={removeFile}
                            >
                                Upload Another Prescription
                            </button>
                        </div>
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
                        Uploaded prescriptions are securely encrypted and can be accessed from your Arogya Setu health records.
                    </p>
                </div>
            </div>

            {/* Tips */}
            <div className="upload-tips">
                <h2>Tips for a better upload</h2>
                <div className="tips-grid">
                    <div className="tip">
                        <FileImage size={20} />
                        <span>Make sure the prescription image is clear and well-lit.</span>
                    </div>

                    <div className="tip">
                        <FileText size={20} />
                        <span>PDF files should contain readable text or scans.</span>
                    </div>

                    <div className="tip">
                        <Upload size={20} />
                        <span>Upload one prescription document at a time.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadPrescription;
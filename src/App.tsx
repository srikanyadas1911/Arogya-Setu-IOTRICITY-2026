import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PatientLayout from './layouts/PatientLayout';
import DoctorLayout from './layouts/DoctorLayout';

// Public Pages
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import FindDoctor from './pages/patient/FindDoctor';
import BookAppointment from './pages/patient/BookAppointment';
import MyAppointments from './pages/patient/MyAppointments';
import JoinConsultation from './pages/patient/JoinConsultation_TEMP';
import Prescriptions from './pages/patient/Prescriptions';
import UploadPrescription from './pages/patient/UploadPrescription';
import AIHealthAssistant from './pages/patient/AIHealthAssistant';
import MedicationTracker from './pages/patient/MedicationTracker';

// Doctor Pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorPatients from './pages/Doctor/DoctorPatients';
import DoctorSchedule from './pages/Doctor/DoctorSchedule';
import DoctorConsultation from './pages/Doctor/DoctorConsultation';
import DoctorHistory from './pages/Doctor/DoctorHistory';
import DoctorPrescription from './pages/Doctor/DoctorPrescription';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminDoctors from './pages/Admin/AdminDoctors';
import AdminPatients from './pages/Admin/AdminPatients';
import AdminVerification from './pages/Admin/AdminVerification';
import AdminReports from './pages/Admin/AdminReports';


function Placeholder({ title }: { title: string }) {
  return (
    <div style={{ padding: '40px' }}>
      <h1>{title}</h1>
      <p>This page is coming soon.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />


        {/* =========================
            PATIENT PORTAL
        ========================== */}
        <Route path="/patient" element={<PatientLayout />}>

          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<PatientDashboard />}
          />

          <Route
            path="find-doctor"
            element={<FindDoctor />}
          />

          <Route
            path="book-appointment"
            element={<BookAppointment />}
          />

          <Route
            path="appointments"
            element={<MyAppointments />}
          />

          <Route
            path="consultation"
            element={<JoinConsultation />}
          />

          <Route
            path="prescriptions"
            element={<Prescriptions />}
          />

          <Route
            path="upload-prescription"
            element={<UploadPrescription />}
          />

          <Route
            path="ai-assistant"
            element={<AIHealthAssistant />}
          />

          <Route
            path="medications"
            element={<MedicationTracker />}
          />

        </Route>


        {/* =========================
            DOCTOR PORTAL
        ========================== */}
        <Route path="/doctor" element={<DoctorLayout />}>

          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<DoctorDashboard />}
          />

          <Route
            path="appointments"
            element={<DoctorAppointments />}
          />

          <Route
            path="patients"
            element={<DoctorPatients />}
          />

          <Route
            path="schedule"
            element={<DoctorSchedule />}
          />

          <Route
            path="consultation"
            element={<DoctorConsultation />}
          />

          <Route
            path="history"
            element={<DoctorHistory />}
          />

          <Route
            path="prescription"
            element={<DoctorPrescription />}
          />

        </Route>


        {/* =========================
            ADMIN PORTAL
        ========================== */}
        path="/admin"

        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="doctors"
          element={<AdminDoctors />}
        />

        <Route
          path="patients"
          element={<AdminPatients />}
        />

        <Route
          path="appointments"
          element={<Placeholder title="Manage Appointments" />}
        />

        <Route
          path="verification"
          element={<AdminVerification />}
        />

        <Route
          path="reports"
          element={<AdminReports />}
        />

        {/* =========================
            FALLBACK
        ========================== */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
// ============================================================
// AROGYA SETU — Mock API Service
// All functions return Promise-based mock data
// ============================================================

import {
  mockDoctors,
  mockPatients,
  mockAppointments,
  mockPrescriptions,
  mockMedications,
  mockMedicalRecords,
  mockVitals,
  mockNotifications,
  mockDoctorSchedule,
  type Doctor,
  type Patient,
  type Appointment,
  type Prescription,
  type Medication,
  type MedicalRecord,
  type Vitals,
  type Notification,
  type TimeSlot,
} from '../data/mockData';

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

// ─── DOCTORS ─────────────────────────────────────────────────
export const fetchDoctors = async (): Promise<Doctor[]> => {
  await delay();
  return [...mockDoctors];
};

export const fetchDoctorById = async (id: string): Promise<Doctor | undefined> => {
  await delay(200);
  return mockDoctors.find(d => d.id === id);
};

// ─── APPOINTMENTS ─────────────────────────────────────────────
export const fetchAppointments = async (patientId?: string): Promise<Appointment[]> => {
  await delay();
  return patientId
    ? mockAppointments.filter(a => a.patientId === patientId)
    : [...mockAppointments];
};

export const fetchDoctorAppointments = async (doctorId?: string): Promise<Appointment[]> => {
  await delay();
  return doctorId
    ? mockAppointments.filter(a => a.doctorId === doctorId)
    : [...mockAppointments];
};

export const bookAppointment = async (data: Partial<Appointment>): Promise<Appointment> => {
  await delay(600);
  const newAppt: Appointment = {
    id: `appt-${Date.now()}`,
    patientId: data.patientId ?? 'pat-1',
    patientName: data.patientName ?? 'Priya Sharma',
    doctorId: data.doctorId ?? 'doc-1',
    doctorName: data.doctorName ?? 'Dr. Ananya Sharma',
    specialization: data.specialization ?? 'General',
    date: data.date ?? new Date().toISOString().split('T')[0],
    time: data.time ?? '10:00 AM',
    consultationType: data.consultationType ?? 'video',
    status: 'upcoming',
    reason: data.reason ?? 'Consultation',
    meetingLink: `https://meet.arogyasetu.demo/room/appt-${Date.now()}`,
  };
  return newAppt;
};

export const cancelAppointment = async (id: string): Promise<boolean> => {
  await delay(400);
  const appt = mockAppointments.find(a => a.id === id);
  if (appt) appt.status = 'cancelled';
  return true;
};

export const rescheduleAppointment = async (id: string, newDate: string, newTime: string): Promise<boolean> => {
  await delay(400);
  const appt = mockAppointments.find(a => a.id === id);
  if (appt) {
    appt.date = newDate;
    appt.time = newTime;
  }
  return true;
};

// ─── PRESCRIPTIONS ───────────────────────────────────────────
export const fetchPrescriptions = async (patientId?: string): Promise<Prescription[]> => {
  await delay();
  return patientId
    ? mockPrescriptions.filter(p => p.patientId === patientId)
    : [...mockPrescriptions];
};

export const createPrescription = async (data: Partial<Prescription>): Promise<Prescription> => {
  await delay(600);
  const newRx: Prescription = {
    id: `rx-${Date.now()}`,
    doctorId: data.doctorId ?? 'doc-1',
    doctorName: data.doctorName ?? 'Dr. Ananya Sharma',
    patientId: data.patientId ?? 'pat-1',
    patientName: data.patientName ?? 'Priya Sharma',
    date: new Date().toISOString().split('T')[0],
    diagnosis: data.diagnosis ?? '',
    medicines: data.medicines ?? [],
    notes: data.notes ?? '',
    followUpDate: data.followUpDate ?? '',
    status: 'active',
  };
  return newRx;
};

// ─── MEDICATIONS ─────────────────────────────────────────────
export const fetchMedications = async (): Promise<Medication[]> => {
  await delay(300);
  return [...mockMedications];
};

export const markMedicationTaken = async (id: string): Promise<boolean> => {
  await delay(300);
  const med = mockMedications.find(m => m.id === id);
  if (med) med.status = 'taken';
  return true;
};

// ─── PRESCRIPTIONS UPLOAD ────────────────────────────────────
export const uploadPrescription = async (_file: File): Promise<{ success: boolean; message: string }> => {
  await delay(1200);
  return { success: true, message: 'Prescription uploaded successfully.' };
};

// ─── PATIENTS ────────────────────────────────────────────────
export const fetchPatients = async (): Promise<Patient[]> => {
  await delay();
  return [...mockPatients];
};

export const fetchPatientById = async (id: string): Promise<Patient | undefined> => {
  await delay(200);
  return mockPatients.find(p => p.id === id);
};

// ─── PATIENT HISTORY ─────────────────────────────────────────
export const fetchPatientHistory = async (patientId: string): Promise<MedicalRecord[]> => {
  await delay();
  return mockMedicalRecords.filter(r => r.patientId === patientId);
};

export const fetchPatientVitals = async (_patientId: string): Promise<Vitals> => {
  await delay(300);
  return { ...mockVitals };
};

// ─── SCHEDULE ────────────────────────────────────────────────
export const fetchDoctorSchedule = async (): Promise<TimeSlot[]> => {
  await delay();
  return [...mockDoctorSchedule];
};

export const saveDoctorSchedule = async (slots: TimeSlot[]): Promise<boolean> => {
  await delay(500);
  slots.forEach((s, i) => {
    if (mockDoctorSchedule[i]) mockDoctorSchedule[i].available = s.available;
  });
  return true;
};

// ─── NOTIFICATIONS ───────────────────────────────────────────
export const fetchNotifications = async (): Promise<Notification[]> => {
  await delay(200);
  return [...mockNotifications];
};

export const markNotificationRead = async (id: string): Promise<boolean> => {
  await delay(100);
  const n = mockNotifications.find(n => n.id === id);
  if (n) n.read = true;
  return true;
};

// ─── AI ──────────────────────────────────────────────────────
import { aiMockResponses } from '../data/mockData';

export const sendAIMessage = async (message: string): Promise<string> => {
  await delay(800 + Math.random() * 600);
  const lower = message.toLowerCase();
  if (lower.includes('consult') || lower.includes('prepare')) return aiMockResponses.consultation;
  if (lower.includes('medicine') || lower.includes('medic') || lower.includes('remem')) return aiMockResponses.medicines;
  if (lower.includes('prescription') || lower.includes('rx') || lower.includes('contain')) return aiMockResponses.prescription;
  if (lower.includes('contact') || lower.includes('doctor') || lower.includes('when')) return aiMockResponses.contact;
  return aiMockResponses.default;
};

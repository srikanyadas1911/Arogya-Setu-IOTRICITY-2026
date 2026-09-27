// ============================================================
// AROGYA SETU — Mock Data (All fictional / demo data)
// ============================================================

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  fee: number;
  availability: string;
  nextSlot: string;
  qualifications: string;
  hospital: string;
  consultationType: string[];
  registrationId: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  totalPatients: number;
  about: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  bloodGroup: string;
  lastVisit: string;
  conditions: string[];
  allergies: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  consultationType: 'video' | 'audio';
  status: 'upcoming' | 'completed' | 'cancelled' | 'waiting';
  reason: string;
  meetingLink?: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  date: string;
  diagnosis: string;
  medicines: Medicine[];
  notes: string;
  followUpDate: string;
  status: 'active' | 'completed';
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  instructions: string;
  status: 'pending' | 'taken' | 'missed';
  prescriptionId: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  type: 'consultation' | 'prescription' | 'upload' | 'medication';
  date: string;
  title: string;
  description: string;
  doctorName?: string;
}

export interface Vitals {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  weight: string;
  spo2: string;
  date: string;
}

export interface Notification {
  id: string;
  type: 'appointment' | 'medication' | 'prescription' | 'general';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

// ─── DOCTORS ─────────────────────────────────────────────────
export const mockDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Sharma',
    specialization: 'Cardiologist',
    experience: 12,
    rating: 4.9,
    fee: 800,
    availability: 'Mon–Sat',
    nextSlot: 'Today, 3:00 PM',
    qualifications: 'MBBS, MD (Cardiology), DM',
    hospital: 'Apollo Heart Institute, Mumbai',
    consultationType: ['video', 'audio'],
    registrationId: 'MCI-2014-MH-48291',
    verificationStatus: 'verified',
    totalPatients: 2840,
    about: 'Senior cardiologist with 12 years of experience in interventional cardiology and heart failure management.',
  },
  {
    id: 'doc-2',
    name: 'Dr. Rahul Mehta',
    specialization: 'General Physician',
    experience: 8,
    rating: 4.7,
    fee: 400,
    availability: 'Mon–Fri',
    nextSlot: 'Today, 5:00 PM',
    qualifications: 'MBBS, MD (General Medicine)',
    hospital: 'Fortis Hospital, Delhi',
    consultationType: ['video', 'audio'],
    registrationId: 'MCI-2016-DL-31045',
    verificationStatus: 'verified',
    totalPatients: 5200,
    about: 'Experienced general physician specializing in preventive care and chronic disease management.',
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya Sen',
    specialization: 'Dermatologist',
    experience: 6,
    rating: 4.8,
    fee: 600,
    availability: 'Tue–Sun',
    nextSlot: 'Tomorrow, 10:00 AM',
    qualifications: 'MBBS, MD (Dermatology), DVD',
    hospital: 'Manipal Hospital, Bangalore',
    consultationType: ['video'],
    registrationId: 'MCI-2018-KA-22167',
    verificationStatus: 'verified',
    totalPatients: 1600,
    about: 'Specialist in medical and cosmetic dermatology with expertise in acne, eczema, and skin cancer screening.',
  },
  {
    id: 'doc-4',
    name: 'Dr. Arjun Kapoor',
    specialization: 'Neurologist',
    experience: 15,
    rating: 4.9,
    fee: 1000,
    availability: 'Mon–Fri',
    nextSlot: 'Tomorrow, 2:00 PM',
    qualifications: 'MBBS, MD, DM (Neurology)',
    hospital: 'NIMHANS, Bangalore',
    consultationType: ['video', 'audio'],
    registrationId: 'MCI-2009-KA-10834',
    verificationStatus: 'verified',
    totalPatients: 3100,
    about: 'Leading neurologist with expertise in epilepsy, stroke management, and movement disorders.',
  },
  {
    id: 'doc-5',
    name: 'Dr. Meera Iyer',
    specialization: 'Pediatrician',
    experience: 10,
    rating: 4.8,
    fee: 500,
    availability: 'Mon–Sat',
    nextSlot: 'Today, 4:30 PM',
    qualifications: 'MBBS, MD (Pediatrics), DCH',
    hospital: 'Rainbow Children Hospital, Hyderabad',
    consultationType: ['video', 'audio'],
    registrationId: 'MCI-2014-TS-39021',
    verificationStatus: 'pending',
    totalPatients: 4200,
    about: 'Compassionate pediatrician dedicated to child health and development from newborns to adolescents.',
  },
  {
    id: 'doc-6',
    name: 'Dr. Vikram Bose',
    specialization: 'Orthopedic Surgeon',
    experience: 14,
    rating: 4.6,
    fee: 900,
    availability: 'Mon–Sat',
    nextSlot: 'Today, 6:00 PM',
    qualifications: 'MBBS, MS (Ortho), DNB',
    hospital: 'AIIMS, New Delhi',
    consultationType: ['video'],
    registrationId: 'MCI-2010-DL-18234',
    verificationStatus: 'pending',
    totalPatients: 2100,
    about: 'Expert in joint replacement, sports medicine, and spine surgery with minimally invasive techniques.',
  },
];

// ─── PATIENTS ────────────────────────────────────────────────
export const mockPatients: Patient[] = [
  {
    id: 'pat-1',
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    bloodGroup: 'O+',
    lastVisit: '2026-09-18',
    conditions: ['Mild hypertension'],
    allergies: ['Penicillin'],
  },
  {
    id: 'pat-2',
    name: 'Rohan Verma',
    age: 34,
    gender: 'Male',
    email: 'rohan.verma@email.com',
    phone: '+91 99887 65432',
    bloodGroup: 'A+',
    lastVisit: '2026-09-20',
    conditions: ['Type 2 Diabetes'],
    allergies: ['Sulfa drugs'],
  },
  {
    id: 'pat-3',
    name: 'Kavita Reddy',
    age: 45,
    gender: 'Female',
    email: 'kavita.reddy@email.com',
    phone: '+91 98112 34567',
    bloodGroup: 'B+',
    lastVisit: '2026-09-15',
    conditions: ['Arthritis', 'Hypothyroidism'],
    allergies: [],
  },
  {
    id: 'pat-4',
    name: 'Amit Joshi',
    age: 52,
    gender: 'Male',
    email: 'amit.joshi@email.com',
    phone: '+91 97654 32109',
    bloodGroup: 'AB-',
    lastVisit: '2026-09-22',
    conditions: ['Hypertension', 'High Cholesterol'],
    allergies: ['Aspirin'],
  },
  {
    id: 'pat-5',
    name: 'Sunita Nair',
    age: 38,
    gender: 'Female',
    email: 'sunita.nair@email.com',
    phone: '+91 96543 21098',
    bloodGroup: 'O-',
    lastVisit: '2026-09-10',
    conditions: ['Anxiety', 'Migraine'],
    allergies: ['Latex'],
  },
];

// ─── APPOINTMENTS ────────────────────────────────────────────
export const mockAppointments: Appointment[] = [
  {
    id: 'appt-1',
    patientId: 'pat-1',
    patientName: 'Priya Sharma',
    doctorId: 'doc-1',
    doctorName: 'Dr. Ananya Sharma',
    specialization: 'Cardiologist',
    date: '2026-09-28',
    time: '10:00 AM',
    consultationType: 'video',
    status: 'upcoming',
    reason: 'Routine heart checkup',
    meetingLink: 'https://meet.arogyasetu.demo/room/appt-1',
  },
  {
    id: 'appt-2',
    patientId: 'pat-1',
    patientName: 'Priya Sharma',
    doctorId: 'doc-2',
    doctorName: 'Dr. Rahul Mehta',
    specialization: 'General Physician',
    date: '2026-09-27',
    time: '5:00 PM',
    consultationType: 'video',
    status: 'waiting',
    reason: 'Fever and cold symptoms',
    meetingLink: 'https://meet.arogyasetu.demo/room/appt-2',
  },
  {
    id: 'appt-3',
    patientId: 'pat-1',
    patientName: 'Priya Sharma',
    doctorId: 'doc-3',
    doctorName: 'Dr. Priya Sen',
    specialization: 'Dermatologist',
    date: '2026-09-10',
    time: '11:00 AM',
    consultationType: 'video',
    status: 'completed',
    reason: 'Skin rash consultation',
  },
  {
    id: 'appt-4',
    patientId: 'pat-2',
    patientName: 'Rohan Verma',
    doctorId: 'doc-1',
    doctorName: 'Dr. Ananya Sharma',
    specialization: 'Cardiologist',
    date: '2026-09-28',
    time: '11:00 AM',
    consultationType: 'audio',
    status: 'upcoming',
    reason: 'Chest pain follow-up',
    meetingLink: 'https://meet.arogyasetu.demo/room/appt-4',
  },
  {
    id: 'appt-5',
    patientId: 'pat-3',
    patientName: 'Kavita Reddy',
    doctorId: 'doc-4',
    doctorName: 'Dr. Arjun Kapoor',
    specialization: 'Neurologist',
    date: '2026-09-27',
    time: '2:00 PM',
    consultationType: 'video',
    status: 'waiting',
    reason: 'Migraine management',
    meetingLink: 'https://meet.arogyasetu.demo/room/appt-5',
  },
  {
    id: 'appt-6',
    patientId: 'pat-1',
    patientName: 'Priya Sharma',
    doctorId: 'doc-5',
    doctorName: 'Dr. Meera Iyer',
    specialization: 'Pediatrician',
    date: '2026-08-20',
    time: '3:30 PM',
    consultationType: 'video',
    status: 'cancelled',
    reason: 'Child health checkup',
  },
];

// ─── PRESCRIPTIONS ───────────────────────────────────────────
export const mockPrescriptions: Prescription[] = [
  {
    id: 'rx-1',
    doctorId: 'doc-3',
    doctorName: 'Dr. Priya Sen',
    patientId: 'pat-1',
    patientName: 'Priya Sharma',
    date: '2026-09-10',
    diagnosis: 'Contact Dermatitis — mild allergic reaction on forearm',
    medicines: [
      { name: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'Once daily', duration: '7 days', instructions: 'Take at night after food' },
      { name: 'Hydrocortisone Cream 1%', dosage: 'Apply thin layer', frequency: 'Twice daily', duration: '10 days', instructions: 'Apply on affected area only' },
    ],
    notes: 'Avoid contact with known allergens. Keep skin moisturized.',
    followUpDate: '2026-09-24',
    status: 'completed',
  },
  {
    id: 'rx-2',
    doctorId: 'doc-2',
    doctorName: 'Dr. Rahul Mehta',
    patientId: 'pat-1',
    patientName: 'Priya Sharma',
    date: '2026-09-18',
    diagnosis: 'Viral Upper Respiratory Tract Infection',
    medicines: [
      { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Three times daily', duration: '5 days', instructions: 'Take after meals' },
      { name: 'Vitamin C 500mg', dosage: '1 tablet', frequency: 'Once daily', duration: '14 days', instructions: 'Take in the morning' },
      { name: 'Zinc 50mg', dosage: '1 tablet', frequency: 'Once daily', duration: '14 days', instructions: 'Take with food' },
    ],
    notes: 'Drink plenty of fluids. Rest adequately. Return if fever persists beyond 3 days.',
    followUpDate: '2026-09-25',
    status: 'active',
  },
];

// ─── MEDICATIONS ─────────────────────────────────────────────
export const mockMedications: Medication[] = [
  { id: 'med-1', name: 'Paracetamol 500mg', dosage: '1 tablet', time: '8:00 AM', instructions: 'After breakfast', status: 'taken', prescriptionId: 'rx-2' },
  { id: 'med-2', name: 'Vitamin C 500mg', dosage: '1 tablet', time: '9:00 AM', instructions: 'Morning, with water', status: 'taken', prescriptionId: 'rx-2' },
  { id: 'med-3', name: 'Zinc 50mg', dosage: '1 tablet', time: '1:00 PM', instructions: 'After lunch', status: 'taken', prescriptionId: 'rx-2' },
  { id: 'med-4', name: 'Paracetamol 500mg', dosage: '1 tablet', time: '8:00 PM', instructions: 'After dinner', status: 'pending', prescriptionId: 'rx-2' },
];

// ─── MEDICAL RECORDS ─────────────────────────────────────────
export const mockMedicalRecords: MedicalRecord[] = [
  { id: 'rec-1', patientId: 'pat-1', type: 'consultation', date: '2026-09-18', title: 'General Physician Consultation', description: 'Viral URTI diagnosis. Prescribed Paracetamol, Vitamin C, Zinc.', doctorName: 'Dr. Rahul Mehta' },
  { id: 'rec-2', patientId: 'pat-1', type: 'prescription', date: '2026-09-18', title: 'Prescription Created', description: 'Rx #rx-2 issued for viral URTI treatment.', doctorName: 'Dr. Rahul Mehta' },
  { id: 'rec-3', patientId: 'pat-1', type: 'consultation', date: '2026-09-10', title: 'Dermatology Consultation', description: 'Contact dermatitis. Prescribed antihistamine and topical cream.', doctorName: 'Dr. Priya Sen' },
  { id: 'rec-4', patientId: 'pat-1', type: 'upload', date: '2026-09-05', title: 'Prescription Uploaded', description: 'Uploaded offline prescription document (PDF).' },
  { id: 'rec-5', patientId: 'pat-1', type: 'medication', date: '2026-09-19', title: 'Medication Adherence', description: '3/4 medications marked as taken.' },
];

export const mockVitals: Vitals = {
  bloodPressure: '118/76 mmHg',
  heartRate: '72 bpm',
  temperature: '98.6°F',
  weight: '62 kg',
  spo2: '98%',
  date: '2026-09-22',
};

// ─── NOTIFICATIONS ───────────────────────────────────────────
export const mockNotifications: Notification[] = [
  { id: 'notif-1', type: 'appointment', title: 'Upcoming Appointment', message: 'Your appointment with Dr. Ananya Sharma is tomorrow at 10:00 AM.', time: '30m ago', read: false },
  { id: 'notif-2', type: 'medication', title: 'Medication Reminder', message: 'Time to take Paracetamol 500mg — 1 tablet after dinner.', time: '2h ago', read: false },
  { id: 'notif-3', type: 'prescription', title: 'Prescription Ready', message: 'Dr. Rahul Mehta has created a new prescription for you.', time: '1d ago', read: true },
  { id: 'notif-4', type: 'general', title: 'Consultation Starting Soon', message: 'Your video consultation with Dr. Rahul Mehta starts in 15 minutes.', time: '2d ago', read: true },
];

// ─── AI CHAT ─────────────────────────────────────────────────
export const defaultAIMessages: ChatMessage[] = [
  {
    id: 'ai-0',
    role: 'assistant',
    content: "Hello! I'm your Arogya Setu Health Assistant. I can provide general health information and care guidance. How can I help you today?\n\n⚠️ Note: I provide general information only and am not a substitute for professional medical advice.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

export const aiMockResponses: Record<string, string> = {
  default: 'Thank you for your question. While I can provide general health information, please consult your doctor for personalized medical advice. Is there something specific about your health or your upcoming consultation I can help you with?',
  consultation: 'Great question! Before your consultation, I recommend:\n• Jot down your symptoms with dates and severity\n• List all current medications and supplements\n• Note any allergies or past adverse reactions\n• Prepare questions you want to ask your doctor\n• Have a list of your medical history ready',
  medicines: 'To remember your medicines consistently:\n• Set phone alarms for each dose\n• Use the Arogya Setu Medication Tracker\n• Keep medicines in a visible place\n• Use a pill organizer by day/time\n• Ask a family member to remind you',
  prescription: 'Your prescription from Dr. Rahul Mehta (dated 18 Sep 2026) includes:\n• Paracetamol 500mg — 3 times daily for 5 days\n• Vitamin C 500mg — once daily for 14 days\n• Zinc 50mg — once daily for 14 days\n\nAll should be taken after food. Tap "Prescriptions" in the sidebar to view the full details.',
  contact: 'You should contact your doctor if you experience:\n• Fever above 103°F (39.4°C) for more than 2 days\n• Difficulty breathing or chest pain\n• Severe headache or sudden vision changes\n• Symptoms that are getting significantly worse\n• Any new unusual symptoms not mentioned in your diagnosis\n\nFor emergencies, tap the red Emergency button on your dashboard.',
};

export const suggestedQuestions = [
  'What should I prepare before my consultation?',
  'How can I remember my medicines?',
  'What does my prescription contain?',
  'When should I contact my doctor?',
];

// ─── DOCTOR SCHEDULE ─────────────────────────────────────────
export const mockDoctorSchedule: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: false },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: false },
  { time: '05:00 PM', available: true },
  { time: '06:00 PM', available: true },
];

// ─── ADMIN STATS ─────────────────────────────────────────────
export const adminStats = {
  totalPatients: 12480,
  totalDoctors: 348,
  appointmentsToday: 892,
  pendingVerifications: 14,
};

// ─── CHART DATA ──────────────────────────────────────────────
export const medicationAdherenceData = [
  { day: 'Mon', taken: 4, missed: 0 },
  { day: 'Tue', taken: 3, missed: 1 },
  { day: 'Wed', taken: 4, missed: 0 },
  { day: 'Thu', taken: 2, missed: 2 },
  { day: 'Fri', taken: 4, missed: 0 },
  { day: 'Sat', taken: 3, missed: 1 },
  { day: 'Sun', taken: 4, missed: 0 },
];

export const doctorAppointmentsData = [
  { day: 'Mon', count: 8 },
  { day: 'Tue', count: 12 },
  { day: 'Wed', count: 6 },
  { day: 'Thu', count: 14 },
  { day: 'Fri', count: 10 },
  { day: 'Sat', count: 5 },
  { day: 'Sun', count: 3 },
];

export const adminAppointmentsChartData = [
  { month: 'Apr', count: 3200 },
  { month: 'May', count: 4100 },
  { month: 'Jun', count: 3800 },
  { month: 'Jul', count: 4600 },
  { month: 'Aug', count: 5100 },
  { month: 'Sep', count: 5241 },
];

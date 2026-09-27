import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, MessageSquare, Video, Pill, FileText, Search,
  ShieldCheck, FolderOpen, Calendar, CalendarDays, ChevronRight, Star,
  Activity, Zap, Users,
} from 'lucide-react';

const features = [
  { icon: MessageSquare, color: '#eff6ff', iconColor: 'var(--primary)', title: 'AI Health Assistant', desc: 'Get instant health information and guidance powered by intelligent AI.' },
  { icon: Video,         color: '#ecfdf5', iconColor: 'var(--secondary)', title: 'Virtual Consultation', desc: 'Connect with your doctor via secure high-quality video or audio calls.' },
  { icon: Pill,          color: '#fffbeb', iconColor: 'var(--accent)', title: 'Medication Tracking', desc: 'Never miss a dose with smart reminders and adherence tracking.' },
  { icon: FileText,      color: '#fdf4ff', iconColor: '#a855f7', title: 'Digital Prescriptions', desc: 'Receive and manage digital prescriptions from your doctors instantly.' },
  { icon: Search,        color: '#f0fdf4', iconColor: '#16a34a', title: 'Doctor Discovery', desc: 'Find the right specialist by specialization, rating, and availability.' },
  { icon: ShieldCheck,   color: '#fff7ed', iconColor: '#ea580c', title: 'Verified Doctors', desc: 'All doctors verified through our credential validation system.' },
  { icon: FolderOpen,    color: '#fef2f2', iconColor: 'var(--danger)', title: 'Health Records', desc: 'Unified timeline of all your consultations, prescriptions, and uploads.' },
  { icon: Calendar,      color: '#f0f9ff', iconColor: '#0284c7', title: 'Appointment Management', desc: 'Book, reschedule, and manage appointments effortlessly.' },
];

const steps = [
  { num: 1, title: 'Register',       desc: 'Create your free Arogya Setu account in minutes.' },
  { num: 2, title: 'Find a Doctor',  desc: 'Search by specialty, rating, or availability.' },
  { num: 3, title: 'Consult Online', desc: 'Meet your doctor via secure video or audio call.' },
  { num: 4, title: 'Manage Care',    desc: 'Track medications, prescriptions, and health records.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      {/* ─── NAVBAR ─────────────────────────────────────────────── */}
      <nav className="landing-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="logo-icon"><Heart size={20} /></div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--gray-900)', lineHeight: 1.1 }}>Arogya Setu</div>
            <div style={{ fontSize: '10px', color: 'var(--gray-400)', fontWeight: 500 }}>AI-Driven Telemedicine</div>
          </div>
        </div>

        <div className="nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {['Home', 'How It Works', 'Features', 'For Patients', 'For Doctors', 'About'].map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ fontSize: '14px', color: 'var(--gray-600)', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-600)')}
            >{link}</a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate('/login')}
            aria-label="Patient login"
          >
            Patient Login
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/login')}
            aria-label="Doctor login"
          >
            Doctor Login
          </button>
          <button
            className="hamburger"
            style={{ display: 'flex' }}
            onClick={() => setMobileMenu(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div style={{ background: 'var(--white)', padding: '16px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['Home', 'How It Works', 'Features', 'For Patients', 'For Doctors'].map(link => (
            <a key={link} href="#" style={{ fontSize: '14px', color: 'var(--gray-700)', fontWeight: 500 }}>{link}</a>
          ))}
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/login')}>Login</button>
        </div>
      )}

      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section id="home" className="landing-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} />
            Healthcare &amp; Safety — IOTRICITY 2026
          </div>

          <h1 className="hero-title">
            Healthcare That<br />
            <span>Connects You</span><br />
            to the Right Care
          </h1>
          <p className="hero-subtitle">AI-Driven Telemedicine &amp; Health Management</p>
          <p className="hero-desc">
            Connecting patients and doctors through smarter digital healthcare — virtual consultations,
            digital prescriptions, and intelligent care management. Built by Team Arogya Setu.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {[
              { label: '10K+ Patients', icon: Users },
              { label: '4.9★ Rating', icon: Star },
              { label: '300+ Doctors', icon: Activity },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--gray-600)', fontWeight: 600 }}>
                <item.icon size={14} color="var(--primary)" />
                {item.label}
              </div>
            ))}
          </div>

          <div className="hero-cta">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/login')}
              aria-label="Patient login button"
            >
              <Heart size={18} />
              Patient Login
              <ChevronRight size={16} />
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => navigate('/login')}
              aria-label="Doctor login button"
            >
              <Activity size={18} />
              Doctor Login
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hero-visual">
          <div className="hero-visual-grid" style={{ position: 'relative', maxWidth: '460px', width: '100%' }}>
            {/* Main card */}
            <div className="hero-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div className="avatar avatar-lg" style={{ background: 'var(--primary)', color: 'white' }}>AS</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--gray-900)' }}>Dr. Ananya Sharma</div>
                  <div style={{ fontSize: '12px', color: 'var(--primary)' }}>Cardiologist • ⭐ 4.9</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <span className="status-dot online" />
                    <span style={{ fontSize: '11px', color: 'var(--secondary)' }}>Available Now</span>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius)', padding: '14px', marginBottom: '14px' }}>
                <div style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '6px' }}>Next Available Slot</div>
                <div style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Today, 3:00 PM</div>
                <div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Video Consultation • ₹800</div>
              </div>

              <button className="btn btn-primary w-full" style={{ width: '100%', justifyContent: 'center' }}>
                <Video size={16} />
                Book Video Consultation
              </button>
            </div>

            {/* Floating cards */}
            <div style={{
              position: 'absolute', top: '-20px', right: '-20px',
              background: 'var(--white)', borderRadius: 'var(--radius)', padding: '12px 16px',
              boxShadow: 'var(--shadow-lg)', border: '1px solid var(--gray-200)',
              fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--secondary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={16} color="var(--secondary)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Verified Doctor</div>
                <div style={{ color: 'var(--gray-400)', fontSize: '11px' }}>MCI Registered</div>
              </div>
            </div>

            <div style={{
              position: 'absolute', bottom: '-20px', left: '-20px',
              background: 'var(--white)', borderRadius: 'var(--radius)', padding: '12px 16px',
              boxShadow: 'var(--shadow-lg)', border: '1px solid var(--gray-200)',
              fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare size={16} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>AI Assistant</div>
                <div style={{ color: 'var(--gray-400)', fontSize: '11px' }}>Health guidance 24/7</div>
              </div>
            </div>

            <div style={{
              position: 'absolute', bottom: '60px', right: '-30px',
              background: 'var(--secondary)', borderRadius: 'var(--radius)', padding: '10px 14px',
              boxShadow: 'var(--shadow-lg)', fontSize: '12px', color: 'white'
            }}>
              <div style={{ fontWeight: 700 }}>3/4 medicines taken ✓</div>
              <div style={{ opacity: 0.8 }}>Medication Tracker</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ────────────────────────────────────────────── */}
      <section id="features" style={{ background: 'var(--gray-50)', padding: '80px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label">Platform Features</div>
            <h2 className="section-heading">Everything You Need for Better Healthcare</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              A complete telemedicine platform built for patients and doctors in India.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon" style={{ background: f.color }}>
                  <f.icon size={24} color={f.iconColor} />
                </div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────── */}
      <section id="how-it-works" className="section-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-label">Simple Process</div>
          <h2 className="section-heading">How Arogya Setu Works</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {steps.map(step => (
            <div key={step.num} className="step-item">
              <div className="step-number">{step.num}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px', color: 'var(--gray-900)' }}>{step.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOR PATIENTS ────────────────────────────────────────── */}
      <section id="for-patients" style={{ background: 'var(--primary-bg)', padding: '80px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <div className="section-label">For Patients</div>
            <h2 className="section-heading">Your Health, Simplified</h2>
            <p className="section-desc" style={{ marginBottom: '28px' }}>
              Take control of your healthcare journey from the comfort of your home.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Find trusted verified doctors by specialty',
                'Book appointments in under 2 minutes',
                'Consult online via secure video/audio',
                'Manage prescriptions digitally',
                'Track medications with smart reminders',
                'Get 24/7 AI Health Assistant support',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--gray-700)', fontWeight: 500 }}>
                  <ShieldCheck size={16} color="var(--secondary)" style={{ flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <button className="btn btn-primary btn-lg" style={{ marginTop: '28px' }} onClick={() => navigate('/login')}>
              Get Started as Patient
              <ChevronRight size={16} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { icon: Search,     label: 'Find Doctor',     count: '300+ Doctors' },
              { icon: Calendar,   label: 'Book Appointment', count: 'In 2 Minutes'  },
              { icon: Video,      label: 'Consult Online',  count: 'HD Video Call' },
              { icon: Pill,       label: 'Medication Track', count: 'Smart Reminders'},
            ].map(item => (
              <div key={item.label} className="card" style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius)', background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: 'var(--shadow-sm)' }}>
                  <item.icon size={20} color="var(--primary)" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--gray-900)', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOR DOCTORS ─────────────────────────────────────────── */}
      <section id="for-doctors" className="section-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { icon: CalendarDays, label: 'Manage Schedule',    sub: 'Full control' },
              { icon: Users,        label: 'View Patients',      sub: 'Complete records' },
              { icon: Video,        label: 'Conduct Consults',   sub: 'HD Video' },
              { icon: FileText,     label: 'Create Rx',          sub: 'Digital Prescriptions' },
            ].map(item => (
              <div key={item.label} className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius)', background: 'var(--secondary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <item.icon size={20} color="var(--secondary)" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--gray-900)', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--secondary-dark)', fontWeight: 600 }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="section-label" style={{ background: 'var(--secondary-bg)', color: 'var(--secondary-dark)' }}>For Doctors</div>
            <h2 className="section-heading">Practice Medicine, Digitally</h2>
            <p className="section-desc" style={{ marginBottom: '28px' }}>
              Arogya Setu gives you the tools to deliver excellent care to more patients, anywhere.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Manage appointments and availability easily',
                'View complete patient history and records',
                'Conduct secure video/audio consultations',
                'Create and send digital prescriptions',
                'Track patient medication adherence',
                'Get verified badge for your credentials',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--gray-700)', fontWeight: 500 }}>
                  <ShieldCheck size={16} color="var(--secondary)" style={{ flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <button className="btn btn-secondary btn-lg" style={{ marginTop: '28px' }} onClick={() => navigate('/login')}>
              Join as Doctor
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <footer id="about" style={{ background: 'var(--navy)', color: 'white', padding: '48px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '38px', height: '38px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800 }}>Arogya Setu</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>AI-Driven Telemedicine &amp; Health Management</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '320px' }}>
                Bridging the gap between patients and quality healthcare through technology.
                IOTRICITY 2026 — Team Arogya Setu.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
              {[
                { title: 'Platform', links: ['For Patients', 'For Doctors', 'Features', 'How It Works'] },
                { title: 'Support', links: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us'] },
              ].map(col => (
                <div key={col.title}>
                  <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '14px', color: 'rgba(255,255,255,0.9)' }}>{col.title}</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {col.links.map(l => (
                      <li key={l}>
                        <a href="#" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                        >{l}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
              © 2026 Arogya Setu. Built for IOTRICITY 2026 Hackathon. Team Arogya Setu.
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-primary" style={{ fontSize: '11px' }}>IOTRICITY 2026</span>
              <span className="badge badge-success" style={{ fontSize: '11px' }}>Healthcare Track</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


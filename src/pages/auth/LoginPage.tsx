import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Stethoscope, Shield, Eye, EyeOff, Mail, Lock } from 'lucide-react';

type Role = 'patient' | 'doctor' | 'admin';

const roleConfig: Record<Role, { label: string; icon: typeof User; color: string; path: string; bg: string }> = {
  patient: { label: 'Patient',    icon: User,        color: 'var(--primary)',   path: '/patient/dashboard', bg: 'var(--primary-bg)' },
  doctor:  { label: 'Doctor',     icon: Stethoscope, color: 'var(--secondary)', path: '/doctor/dashboard',  bg: 'var(--secondary-bg)' },
  admin:   { label: 'Admin',      icon: Shield,      color: 'var(--navy)',      path: '/admin/dashboard',   bg: 'var(--gray-100)' },
};

const demos: Record<Role, { email: string; password: string }> = {
  patient: { email: 'priya.sharma@email.com',   password: 'patient123' },
  doctor:  { email: 'dr.ananya@email.com',       password: 'doctor123'  },
  admin:   { email: 'admin@arogyasetu.com',      password: 'admin123'   },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    navigate(roleConfig[role].path);
  };

  const handleDemo = (demoRole: Role) => {
    setRole(demoRole);
    setEmail(demos[demoRole].email);
    setPassword(demos[demoRole].password);
    setError('');
  };

  const cfg = roleConfig[role];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f0fdf4 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px', height: '56px', background: 'var(--primary)', borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
          }}>
            <Heart size={28} color="white" />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '4px' }}>
            Arogya Setu
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--gray-400)', fontWeight: 500 }}>
            AI-Driven Telemedicine &amp; Health Management
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: '32px', boxShadow: 'var(--shadow-lg)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px', color: 'var(--gray-900)' }}>
            Welcome back
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '24px' }}>
            Sign in to access your {cfg.label.toLowerCase()} dashboard
          </p>

          {/* Role Selector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '24px' }}>
            {(Object.keys(roleConfig) as Role[]).map(r => {
              const rc = roleConfig[r];
              const active = role === r;
              return (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    padding: '12px 8px',
                    borderRadius: 'var(--radius)',
                    border: `2px solid ${active ? rc.color : 'var(--gray-200)'}`,
                    background: active ? rc.bg : 'var(--white)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  aria-pressed={active}
                >
                  <rc.icon size={18} color={active ? rc.color : 'var(--gray-400)'} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: active ? rc.color : 'var(--gray-500)' }}>
                    {rc.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} noValidate>
            {error && (
              <div style={{ padding: '10px 14px', background: 'var(--danger-bg)', border: '1px solid #fca5a5', borderRadius: 'var(--radius)', marginBottom: '16px', fontSize: '13px', color: 'var(--danger)' }}>
                {error}
              </div>
            )}

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label" htmlFor="email">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--gray-400)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ paddingLeft: '38px', width: '100%' }}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label" htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--gray-400)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingLeft: '38px', paddingRight: '40px', width: '100%' }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(o => !o)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', display: 'flex' }}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--gray-600)' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                />
                Remember me
              </label>
              <button type="button" style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '15px', marginBottom: '12px' }}
              aria-busy={loading}
            >
              {loading ? 'Signing in...' : `Sign in as ${cfg.label}`}
            </button>

            <button
              type="button"
              className="btn btn-ghost"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '15px' }}
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </form>

          {/* Demo Logins */}
          <div style={{ marginTop: '24px', padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
              Quick Demo Access
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(Object.keys(demos) as Role[]).map(r => (
                <button
                  key={r}
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleDemo(r)}
                  aria-label={`Demo ${r} login`}
                >
                  Demo {roleConfig[r].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--gray-400)', marginTop: '20px' }}>
          IOTRICITY 2026 — Team Arogya Setu &nbsp;•&nbsp; Demo Application
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Stethoscope, Shield, Eye, EyeOff, Mail, Lock, UserPlus } from 'lucide-react';
import { loginUser, registerUser } from '../../services/api';

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
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<Role>('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (isRegister && !name.trim()) { setError('Please enter your full name.'); return; }
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isRegister) {
        const res = await registerUser({
          email,
          password,
          role,
          name: name.trim(),
        });
        if (res.success) {
          setSuccessMsg('Account registered successfully! Redirecting...');
          setTimeout(() => navigate(roleConfig[role].path), 500);
        } else {
          setError(res.error || 'Registration failed');
        }
      } else {
        const res = await loginUser(email, password, role);
        if (res.success) {
          navigate(roleConfig[role].path);
        } else {
          setError(res.error || 'Invalid email or password');
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = (demoRole: Role) => {
    setIsRegister(false);
    setRole(demoRole);
    setEmail(demos[demoRole].email);
    setPassword(demos[demoRole].password);
    setError('');
    setSuccessMsg('');
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
            {isRegister ? `Create ${cfg.label} Account` : 'Welcome back'}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '20px' }}>
            {isRegister ? `Register as a new ${cfg.label.toLowerCase()} on Arogya Setu` : `Sign in to access your ${cfg.label.toLowerCase()} dashboard`}
          </p>

          {/* Mode Switch (Sign in / Register) */}
          <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 'var(--radius)', padding: '4px', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(''); setSuccessMsg(''); }}
              style={{
                flex: 1, padding: '8px', fontSize: '13px', fontWeight: 600, border: 'none', borderRadius: 'calc(var(--radius) - 2px)',
                background: !isRegister ? 'var(--white)' : 'transparent',
                color: !isRegister ? 'var(--gray-900)' : 'var(--gray-500)',
                boxShadow: !isRegister ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(''); setSuccessMsg(''); }}
              style={{
                flex: 1, padding: '8px', fontSize: '13px', fontWeight: 600, border: 'none', borderRadius: 'calc(var(--radius) - 2px)',
                background: isRegister ? 'var(--white)' : 'transparent',
                color: isRegister ? 'var(--gray-900)' : 'var(--gray-500)',
                boxShadow: isRegister ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>

          {/* Role Selector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '24px' }}>
            {(Object.keys(roleConfig) as Role[]).map(r => {
              const rc = roleConfig[r];
              const active = role === r;
              return (
                <button
                  key={r}
                  type="button"
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
          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div style={{ padding: '10px 14px', background: 'var(--danger-bg)', border: '1px solid #fca5a5', borderRadius: 'var(--radius)', marginBottom: '16px', fontSize: '13px', color: 'var(--danger)' }}>
                {error}
              </div>
            )}
            {successMsg && (
              <div style={{ padding: '10px 14px', background: 'var(--success-bg)', border: '1px solid #86efac', borderRadius: 'var(--radius)', marginBottom: '16px', fontSize: '13px', color: 'var(--success)' }}>
                {successMsg}
              </div>
            )}

            {isRegister && (
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="name">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <UserPlus size={16} color="var(--gray-400)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Dr. / Mr. / Ms. Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ paddingLeft: '38px', width: '100%' }}
                    required
                  />
                </div>
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

            {!isRegister && (
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
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '15px', marginBottom: '12px', marginTop: isRegister ? '16px' : '0' }}
              aria-busy={loading}
            >
              {loading ? (isRegister ? 'Creating account...' : 'Signing in...') : (isRegister ? `Register as ${cfg.label}` : `Sign in as ${cfg.label}`)}
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

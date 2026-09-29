import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Search, CalendarPlus, CalendarDays, Video,
  FileText, Upload, MessageSquare, Pill, User, Settings, LogOut,
  Bell, Menu, X, Heart, Globe, WifiOff,
} from 'lucide-react';
import { fetchNotifications, markNotificationRead, clearAuth, getStoredUser } from '../services/api';
import { type Notification } from '../data/mockData';
import NotificationPanel from '../components/NotificationPanel';

const navItems = [
  { to: '/patient/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/patient/find-doctor', icon: Search, label: 'Find Doctor' },
  { to: '/patient/book-appointment', icon: CalendarPlus, label: 'Book Appointment' },
  { to: '/patient/appointments', icon: CalendarDays, label: 'My Appointments' },
  { to: '/patient/consultation', icon: Video, label: 'Join Consultation' },
  { to: '/patient/prescriptions', icon: FileText, label: 'Prescriptions' },
  { to: '/patient/upload-prescription', icon: Upload, label: 'Upload Prescription' },
  { to: '/patient/ai-assistant', icon: MessageSquare, label: 'AI Health Assistant' },
  { to: '/patient/medications', icon: Pill, label: 'Medication Tracker' },
];

export default function PatientLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [lang, setLang] = useState('English');

  const currentUser = getStoredUser();
  const userName = currentUser?.name || 'Priya Sharma';

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    fetchNotifications('patient').then(setNotifications);
  }, []);

  useEffect(() => {
    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const handleMarkRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    await markNotificationRead(id);
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gray-50)' }}>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Heart size={20} />
          </div>
          <div>
            <div className="logo-text">Arogya Setu</div>
            <div className="logo-sub">Patient Portal</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Main Menu</div>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}

          <div className="nav-section-label" style={{ marginTop: '16px' }}>Account</div>
          <button className="nav-item" onClick={() => { setSidebarOpen(false); navigate('/patient/dashboard'); }}>
            <User size={18} />
            Profile
          </button>
          <button className="nav-item">
            <Settings size={18} />
            Settings
          </button>
          <button className="nav-item" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </nav>

        <div className="sidebar-footer">
          <div style={{ padding: '8px 12px', borderRadius: 'var(--radius)', background: 'var(--primary-bg)' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary)', marginBottom: '2px' }}>
              IOTRICITY 2026
            </div>
            <div style={{ fontSize: '10px', color: 'var(--gray-500)' }}>Team Arogya Setu</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="main-content">
        {isOffline && (
          <div className="offline-banner">
            <WifiOff size={14} />
            Offline Mode — Changes will sync when connection is restored.
          </div>
        )}

        {/* Top Navbar */}
        <header className="top-navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="hamburger"
              onClick={() => setSidebarOpen(o => !o)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)' }}>
                Welcome back 👋
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>
                Here is your health overview for today.
              </span>
            </div>
          </div>

          <div className="nav-actions">
            <select
              className="lang-select"
              value={lang}
              onChange={e => setLang(e.target.value)}
              aria-label="Language selector"
            >
              <option>English</option>
              <option>বাংলা</option>
              <option>हिन्दी</option>
            </select>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={14} color="var(--gray-400)" />
              <span style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{lang}</span>
            </div>

            <div style={{ position: 'relative' }}>
              <button
                className="icon-btn"
                onClick={() => setShowNotifs(o => !o)}
                aria-label={`Notifications — ${unreadCount} unread`}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </button>
              {showNotifs && (
                <NotificationPanel
                  notifications={notifications}
                  onClose={() => setShowNotifs(false)}
                  onMarkRead={handleMarkRead}
                />
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="avatar avatar-md" style={{ background: 'var(--primary)', color: 'white' }}>PS</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-800)' }}>{userName}</div>
                <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>Patient</div>
              </div>
            </div>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

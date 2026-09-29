import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, UserCheck, CalendarDays,
  ShieldCheck, BarChart2, Settings, LogOut, Bell, Menu, X, Shield,
} from 'lucide-react';
import { fetchNotifications, markNotificationRead, clearAuth } from '../services/api';
import { type Notification } from '../data/mockData';
import NotificationPanel from '../components/NotificationPanel';

const navItems = [
  { to: '/admin/dashboard',    icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/admin/doctors',      icon: UserCheck,       label: 'Doctors'      },
  { to: '/admin/patients',     icon: Users,           label: 'Patients'     },
  { to: '/admin/appointments', icon: CalendarDays,    label: 'Appointments' },
  { to: '/admin/verification', icon: ShieldCheck,     label: 'Verification' },
  { to: '/admin/reports',      icon: BarChart2,       label: 'Reports'      },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    fetchNotifications('admin').then(setNotifications);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

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
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon" style={{ background: 'var(--navy)' }}>
            <Shield size={20} />
          </div>
          <div>
            <div className="logo-text">Arogya Setu</div>
            <div className="logo-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Management</div>
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
          <div style={{ padding: '8px 12px', borderRadius: 'var(--radius)', background: 'var(--gray-100)' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '2px' }}>
              IOTRICITY 2026
            </div>
            <div style={{ fontSize: '10px', color: 'var(--gray-500)' }}>Team Arogya Setu</div>
          </div>
        </div>
      </aside>

      <div className="main-content">
        <header className="top-navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="hamburger" onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle sidebar">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gray-900)' }}>Admin Dashboard</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Arogya Setu Platform</div>
            </div>
          </div>
          <div className="nav-actions">
            <div style={{ position: 'relative' }}>
              <button className="icon-btn" onClick={() => setShowNotifs(o => !o)} aria-label="Notifications">
                <Bell size={18} />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
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
              <div className="avatar avatar-md" style={{ background: 'var(--navy)', color: 'white' }}>AD</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-800)' }}>Admin User</div>
                <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>Administrator</div>
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

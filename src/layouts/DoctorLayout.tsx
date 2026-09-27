import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  CalendarClock,
  Video,
  ClipboardList,
  FilePlus,
  User,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Stethoscope,
} from "lucide-react";

import { mockNotifications } from "../data/mockData";
import { type Notification } from "../data/mockData";
import NotificationPanel from "../components/NotificationPanel";

const navItems = [
  {
    to: "/doctor/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    to: "/doctor/appointments",
    icon: CalendarDays,
    label: "Today's Appointments",
  },
  {
    to: "/doctor/patients",
    icon: Users,
    label: "Patient List",
  },
  {
    to: "/doctor/schedule",
    icon: CalendarClock,
    label: "Schedule",
  },
  {
    to: "/doctor/consultation",
    icon: Video,
    label: "Join Consultation",
  },
  {
    to: "/doctor/history",
    icon: ClipboardList,
    label: "Patient History",
  },
  {
    to: "/doctor/prescription",
    icon: FilePlus,
    label: "Create Prescription",
  },
];

export default function DoctorLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [notifications, setNotifications] =
    useState<Notification[]>([...mockNotifications]);

  const [showNotifs, setShowNotifs] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleMarkRead = (id: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleLogout = () => {
    setSidebarOpen(false);
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--gray-50)",
      }}
    >
      {/* Mobile Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "visible" : ""
          }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarOpen ? "mobile-open" : ""
          }`}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <div
            className="logo-icon"
            style={{
              background: "var(--secondary)",
            }}
          >
            <Stethoscope size={20} />
          </div>

          <div>
            <div className="logo-text">
              Arogya Setu
            </div>

            <div className="logo-sub">
              Doctor Portal
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            className="doctor-mobile-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">

          <div className="nav-section-label">
            Main Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />

                <span>
                  {item.label}
                </span>
              </NavLink>
            );
          })}

          {/* Account */}
          <div
            className="nav-section-label"
            style={{
              marginTop: "16px",
            }}
          >
            Account
          </div>

          <button
            type="button"
            className="nav-item"
          >
            <User size={18} />
            <span>Profile</span>
          </button>

          <button
            type="button"
            className="nav-item"
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div
            style={{
              padding: "10px 12px",
              borderRadius: "var(--radius)",
              background: "var(--secondary-bg)",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--secondary-dark)",
                marginBottom: "3px",
              }}
            >
              IOTRICITY 2026
            </div>

            <div
              style={{
                fontSize: "10px",
                color: "var(--gray-500)",
              }}
            >
              Team Arogya Setu
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">

        {/* Top Navbar */}
        <header className="top-navbar">

          {/* Left Side */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Mobile Menu */}
            <button
              type="button"
              className="hamburger"
              onClick={() =>
                setSidebarOpen((current) => !current)
              }
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>

            <div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "var(--gray-900)",
                }}
              >
                Welcome back, Doctor 👋
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "var(--gray-400)",
                }}
              >
                Doctor Dashboard
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="nav-actions">

            {/* Notifications */}
            <div
              style={{
                position: "relative",
              }}
            >
              <button
                type="button"
                className="icon-btn"
                onClick={() =>
                  setShowNotifs(
                    (current) => !current
                  )
                }
                aria-label={`Notifications — ${unreadCount} unread`}
              >
                <Bell size={18} />

                {unreadCount > 0 && (
                  <span className="notification-badge">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifs && (
                <NotificationPanel
                  notifications={notifications}
                  onClose={() =>
                    setShowNotifs(false)
                  }
                  onMarkRead={handleMarkRead}
                />
              )}
            </div>

            {/* Doctor Profile */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                className="avatar avatar-md"
                style={{
                  background: "var(--secondary)",
                  color: "white",
                }}
              >
                AS
              </div>

              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--gray-800)",
                  }}
                >
                  Dr. Ananya Sharma
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--gray-400)",
                  }}
                >
                  Cardiologist
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
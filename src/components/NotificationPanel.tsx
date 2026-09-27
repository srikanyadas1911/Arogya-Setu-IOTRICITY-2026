import { useRef, useEffect } from 'react';
import { Bell, Calendar, Pill, FileText, Info, X } from 'lucide-react';
import { type Notification } from '../data/mockData';

const iconMap = {
  appointment: { icon: Calendar, color: 'var(--primary-bg)', iconColor: 'var(--primary)' },
  medication: { icon: Pill, color: 'var(--secondary-bg)', iconColor: 'var(--secondary)' },
  prescription: { icon: FileText, color: 'var(--accent-bg)', iconColor: 'var(--accent)' },
  general: { icon: Info, color: 'var(--gray-100)', iconColor: 'var(--gray-500)' },
};

interface Props {
  notifications: Notification[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
}

export default function NotificationPanel({ notifications, onClose, onMarkRead }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-dropdown" ref={ref}>
      <div className="notif-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} />
          <span>Notifications</span>
          {unread > 0 && (
            <span className="badge badge-danger" style={{ padding: '2px 8px', fontSize: '11px' }}>
              {unread} new
            </span>
          )}
        </div>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)' }}
          onClick={onClose}
          aria-label="Close notifications"
        >
          <X size={16} />
        </button>
      </div>

      {notifications.length === 0 ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--gray-400)' }}>
          <Bell size={32} style={{ marginBottom: '8px', opacity: 0.3 }} />
          <p style={{ fontSize: '14px' }}>No notifications</p>
        </div>
      ) : (
        notifications.map(n => {
          const cfg = iconMap[n.type];
          const IconComp = cfg.icon;
          return (
            <div
              key={n.id}
              className={`notif-item ${!n.read ? 'unread' : ''}`}
              onClick={() => onMarkRead(n.id)}
            >
              <div className="notif-icon" style={{ background: cfg.color }}>
                <IconComp size={16} color={cfg.iconColor} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-800)', marginBottom: '2px' }}>
                  {n.title}
                </div>
                <div className="notif-text">{n.message}</div>
                <div className="notif-time">{n.time}</div>
              </div>
              {!n.read && (
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: '4px' }} />
              )}
            </div>
          );
        })
      )}

      {notifications.length > 0 && (
        <div style={{ padding: '12px 20px', textAlign: 'center', borderTop: '1px solid var(--gray-100)' }}>
          <button
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
}

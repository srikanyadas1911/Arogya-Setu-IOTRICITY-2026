import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon"><Icon size={48} /></div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div style={{ marginTop: '20px' }}>{action}</div>}
    </div>
  );
}

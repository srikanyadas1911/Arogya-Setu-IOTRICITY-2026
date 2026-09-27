import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'amber' | 'red';
  change?: string;
  subtitle?: string;
}

export default function StatCard({ label, value, icon: Icon, color = 'blue', change, subtitle }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {subtitle && <div className="stat-change" style={{ color: 'var(--gray-400)' }}>{subtitle}</div>}
        {change && <div className="stat-change">{change}</div>}
      </div>
    </div>
  );
}

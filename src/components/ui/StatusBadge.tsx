type Status = 'upcoming' | 'completed' | 'cancelled' | 'waiting' | 'active' | 'verified' | 'pending' | 'rejected' | 'taken' | 'missed';

const CONFIG: Record<Status, { label: string; cls: string }> = {
  upcoming:  { label: 'Upcoming',  cls: 'badge badge-primary' },
  waiting:   { label: 'Waiting',   cls: 'badge badge-warning' },
  completed: { label: 'Completed', cls: 'badge badge-success' },
  cancelled: { label: 'Cancelled', cls: 'badge badge-danger'  },
  active:    { label: 'Active',    cls: 'badge badge-success' },
  verified:  { label: 'Verified',  cls: 'badge badge-success' },
  pending:   { label: 'Pending',   cls: 'badge badge-warning' },
  rejected:  { label: 'Rejected',  cls: 'badge badge-danger'  },
  taken:     { label: 'Taken',     cls: 'badge badge-success' },
  missed:    { label: 'Missed',    cls: 'badge badge-danger'  },
};

interface Props { status: Status; }

export default function StatusBadge({ status }: Props) {
  const cfg = CONFIG[status];
  return <span className={cfg.cls}>{cfg.label}</span>;
}

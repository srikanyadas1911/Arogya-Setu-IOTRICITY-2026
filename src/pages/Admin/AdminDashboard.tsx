import {
    Users,
    Stethoscope,
    CalendarDays,
    UserCheck,
    TrendingUp,
} from 'lucide-react';
import './AdminDashboard.css';

const stats = [
    {
        title: 'Total Patients',
        value: '1,248',
        change: '+12%',
        icon: Users,
    },
    {
        title: 'Verified Doctors',
        value: '86',
        change: '+8%',
        icon: Stethoscope,
    },
    {
        title: 'Appointments',
        value: '342',
        change: '+15%',
        icon: CalendarDays,
    },
    {
        title: 'Pending Verification',
        value: '7',
        change: 'Requires Action',
        icon: UserCheck,
    },
];

function AdminDashboard() {
    return (
        <div className="admin-dashboard-page">
            <div className="admin-dashboard-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Monitor and manage the Arogya Setu platform.</p>
                </div>
            </div>

            <div className="admin-stats-grid">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div className="admin-stat-card" key={stat.title}>
                            <div className="admin-stat-top">
                                <div className="admin-stat-icon">
                                    <Icon size={22} />
                                </div>

                                <TrendingUp size={17} />
                            </div>

                            <h2>{stat.value}</h2>
                            <p>{stat.title}</p>

                            <span>{stat.change}</span>
                        </div>
                    );
                })}
            </div>

            <div className="admin-overview-card">
                <h2>Platform Overview</h2>

                <div className="overview-grid">
                    <div>
                        <strong>24</strong>
                        <span>Consultations Today</span>
                    </div>

                    <div>
                        <strong>18</strong>
                        <span>New Patients Today</span>
                    </div>

                    <div>
                        <strong>5</strong>
                        <span>Doctors Online</span>
                    </div>

                    <div>
                        <strong>3</strong>
                        <span>Pending Reports</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
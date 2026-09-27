import {
    Users,
    Stethoscope,
    CalendarDays,
    CheckCircle,
    TrendingUp,
} from 'lucide-react';
import './AdminReports.css';

const reportStats = [
    {
        title: 'Total Patients',
        value: '1,248',
        change: '+12.5%',
        icon: Users,
    },
    {
        title: 'Total Doctors',
        value: '186',
        change: '+8.2%',
        icon: Stethoscope,
    },
    {
        title: 'Appointments',
        value: '3,426',
        change: '+15.4%',
        icon: CalendarDays,
    },
    {
        title: 'Completed Consultations',
        value: '2,891',
        change: '+10.8%',
        icon: CheckCircle,
    },
];

const monthlyData = [
    { month: 'Apr', appointments: 420 },
    { month: 'May', appointments: 510 },
    { month: 'Jun', appointments: 580 },
    { month: 'Jul', appointments: 640 },
    { month: 'Aug', appointments: 710 },
    { month: 'Sep', appointments: 820 },
];

function AdminReports() {
    return (
        <div className="admin-reports-page">

            <div className="admin-reports-header">
                <div>
                    <h1>Reports & Analytics</h1>
                    <p>
                        Monitor platform activity and healthcare service statistics.
                    </p>
                </div>
            </div>

            <div className="report-stats-grid">
                {reportStats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div className="report-stat-card" key={stat.title}>
                            <div className="report-stat-top">
                                <div className="report-stat-icon">
                                    <Icon size={21} />
                                </div>

                                <span className="report-change">
                                    <TrendingUp size={14} />
                                    {stat.change}
                                </span>
                            </div>

                            <h2>{stat.value}</h2>
                            <p>{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            <div className="appointments-report-card">

                <div className="report-card-header">
                    <div>
                        <h2>Monthly Appointments</h2>
                        <p>Appointment activity over the last six months.</p>
                    </div>
                </div>

                <div className="monthly-bars">
                    {monthlyData.map((item) => (
                        <div className="monthly-bar-item" key={item.month}>

                            <div className="bar-value">
                                {item.appointments}
                            </div>

                            <div
                                className="monthly-bar"
                                style={{
                                    height: `${(item.appointments / 820) * 180}px`,
                                }}
                            />

                            <span>{item.month}</span>

                        </div>
                    ))}
                </div>

            </div>

            <div className="report-summary-grid">

                <div className="report-summary-card">
                    <h3>Consultation Completion</h3>
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: '84%' }}
                        />
                    </div>
                    <strong>84%</strong>
                    <p>of scheduled consultations completed successfully.</p>
                </div>

                <div className="report-summary-card">
                    <h3>Doctor Verification</h3>
                    <div className="progress-container">
                        <div
                            className="progress-bar verification-progress"
                            style={{ width: '91%' }}
                        />
                    </div>
                    <strong>91%</strong>
                    <p>of registered doctors have verified credentials.</p>
                </div>

            </div>

        </div>
    );
}

export default AdminReports;
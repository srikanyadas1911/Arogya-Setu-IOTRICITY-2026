import { useState, useEffect } from "react";
import {
    Users,
    Stethoscope,
    CalendarDays,
    CheckCircle,
    TrendingUp,
} from "lucide-react";
import { fetchAdminReports, fetchAdminStats } from "../../services/api";
import "./AdminReports.css";

function AdminReports() {
    const [reports, setReports] = useState<any>({
        monthlyAppointments: [
            { month: "Nov", appointments: 140 },
            { month: "Dec", appointments: 210 },
            { month: "Jan", appointments: 290 },
            { month: "Feb", appointments: 380 },
            { month: "Mar", appointments: 450 },
        ],
        satisfactionRate: 96.4,
    });
    const [stats, setStats] = useState<any>({
        totalPatients: 5,
        totalDoctors: 4,
        totalAppointments: 5,
        completedAppointments: 2,
    });

    useEffect(() => {
        let isMounted = true;
        Promise.all([fetchAdminReports(), fetchAdminStats()]).then(
            ([repData, statData]) => {
                if (isMounted) {
                    if (repData) setReports(repData);
                    if (statData) setStats(statData);
                }
            }
        );
        return () => {
            isMounted = false;
        };
    }, []);

    const reportStats = [
        {
            title: "Total Patients",
            value: stats.totalPatients,
            change: "+12.5%",
            icon: Users,
        },
        {
            title: "Total Doctors",
            value: stats.totalDoctors,
            change: "+8.2%",
            icon: Stethoscope,
        },
        {
            title: "Appointments",
            value: stats.totalAppointments,
            change: "+15.4%",
            icon: CalendarDays,
        },
        {
            title: "Completed Consultations",
            value: stats.completedAppointments,
            change: "+10.8%",
            icon: CheckCircle,
        },
    ];

    const monthlyList = reports.monthlyAppointments || [];
    const maxVal = Math.max(...monthlyList.map((m: any) => m.appointments), 500);

    return (
        <div className="admin-reports-page">
            <div className="admin-reports-header">
                <div>
                    <h1>Reports &amp; Analytics</h1>
                    <p>
                        Monitor platform activity and healthcare service statistics in real-time.
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
                        <h2>Monthly Consultations Trend</h2>
                        <p>Appointment volume trend over recent periods.</p>
                    </div>
                </div>

                <div className="monthly-bars">
                    {monthlyList.map((item: any) => (
                        <div className="monthly-bar-item" key={item.month}>
                            <div className="bar-value">{item.appointments}</div>

                            <div
                                className="monthly-bar"
                                style={{
                                    height: `${Math.max(30, (item.appointments / maxVal) * 180)}px`,
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
                        <div className="progress-bar" style={{ width: "88%" }} />
                    </div>
                    <strong>88%</strong>
                    <p>of scheduled teleconsultations completed successfully without drops.</p>
                </div>

                <div className="report-summary-card">
                    <h3>Doctor Verification Rate</h3>
                    <div className="progress-container">
                        <div
                            className="progress-bar verification-progress"
                            style={{ width: "92%" }}
                        />
                    </div>
                    <strong>92%</strong>
                    <p>of registered doctors have verified medical council credentials.</p>
                </div>
            </div>
        </div>
    );
}

export default AdminReports;
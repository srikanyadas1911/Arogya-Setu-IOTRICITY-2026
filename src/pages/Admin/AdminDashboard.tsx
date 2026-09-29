import { useState, useEffect } from "react";
import {
    Users,
    Stethoscope,
    CalendarDays,
    UserCheck,
    TrendingUp,
} from "lucide-react";
import { fetchAdminStats } from "../../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
    const [stats, setStats] = useState<any>({
        totalDoctors: 4,
        verifiedDoctors: 3,
        pendingVerification: 1,
        totalPatients: 5,
        totalAppointments: 5,
        completedAppointments: 2,
    });

    useEffect(() => {
        let isMounted = true;
        fetchAdminStats().then((data) => {
            if (isMounted) {
                setStats(data);
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    const statCards = [
        {
            title: "Total Patients",
            value: stats.totalPatients,
            change: "+12% this month",
            icon: Users,
        },
        {
            title: "Verified Doctors",
            value: stats.verifiedDoctors,
            change: "+8% active",
            icon: Stethoscope,
        },
        {
            title: "Total Appointments",
            value: stats.totalAppointments,
            change: "+15% volume",
            icon: CalendarDays,
        },
        {
            title: "Pending Verification",
            value: stats.pendingVerification,
            change: stats.pendingVerification > 0 ? "Requires Review" : "All cleared",
            icon: UserCheck,
        },
    ];

    return (
        <div className="admin-dashboard-page">
            <div className="admin-dashboard-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Monitor, audit, and manage the Arogya Setu platform in real-time.</p>
                </div>
            </div>

            <div className="admin-stats-grid">
                {statCards.map((stat) => {
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
                <h2>Platform Real-Time Health</h2>

                <div className="overview-grid">
                    <div>
                        <strong>{stats.completedAppointments || 2}</strong>
                        <span>Completed Consultations</span>
                    </div>

                    <div>
                        <strong>{stats.totalPatients || 5}</strong>
                        <span>Registered Patients</span>
                    </div>

                    <div>
                        <strong>{stats.totalDoctors || 4}</strong>
                        <span>Enrolled Doctors</span>
                    </div>

                    <div>
                        <strong>99.98%</strong>
                        <span>System Availability</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"

function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/dashboard/admin")
      .then(res => setStats(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <div className="skeleton skeleton-title"></div>
        <div className="grid-container mt-6">
          <div className="skeleton" style={{ height: '150px' }}></div>
          <div className="skeleton" style={{ height: '150px' }}></div>
          <div className="skeleton" style={{ height: '150px' }}></div>
          <div className="skeleton" style={{ height: '150px' }}></div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Students",
      value: stats?.students || 0,
      color: "var(--primary)",
      bgColor: "var(--primary-light)",
      path: "/admin/students"
    },
    {
      label: "Total Clubs",
      value: stats?.clubs || 0,
      color: "var(--accent-purple)",
      bgColor: "var(--accent-purple-light)",
      path: "/admin/clubs"
    },
    {
      label: "Total Events",
      value: stats?.events || 0,
      color: "var(--success)",
      bgColor: "var(--success-light)",
      path: "/admin/events"
    },
    {
      label: "Event Registrations",
      value: stats?.registrations || 0,
      color: "var(--warning)",
      bgColor: "var(--warning-light)",
      path: "/admin/registrations"
    }
  ];

  return (
    <div>

      <div className="page-header">
        <h2>Admin Dashboard</h2>
        <p className="text-secondary">Welcome back! Here's an overview of your platform.</p>
      </div>

      <div className="grid-container">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            onClick={() => navigate(stat.path)}
          >
            <div
              className="stat-icon"
              style={{
                background: stat.bgColor,
                color: stat.color
              }}
            >
              {index === 0 && '👥'}
              {index === 1 && '🎯'}
              {index === 2 && '📅'}
              {index === 3 && '✓'}
            </div>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="card mt-8">
        <div className="card-header">
          <h4 className="card-title">Quick Actions</h4>
          <p className="card-subtitle">Manage your platform efficiently</p>
        </div>
        <div className="card-body">
          <div className="grid-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/create-student")}
            >
              ➕ Add Student
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/create-event")}
            >
              📅 Create Event
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/create-announcement")}
            >
              📢 New Announcement
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/admin/club-registrations")}
            >
              📋 Club Registrations
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/admin/upload-gallery")}
            >
              🖼️ Upload Gallery
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/admin/upload-resource")}
            >
              📁 Upload Resource
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard/student")
      .then(res => {
        setStats(res.data);
      })
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
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Clubs Joined",
      value: stats?.clubs || 0,
      color: "var(--primary)",
      bgColor: "var(--primary-light)",
      icon: "🎯"
    },
    {
      label: "Events Registered",
      value: stats?.registrations || 0,
      color: "var(--success)",
      bgColor: "var(--success-light)",
      icon: "📅"
    },
    {
      label: "Certificates Earned",
      value: stats?.certificates || 0,
      color: "var(--warning)",
      bgColor: "var(--warning-light)",
      icon: "🏆"
    }
  ];

  const quickLinks = [
    { label: "Browse Events", path: "/student/events", variant: "btn-primary", icon: "📅" },
    { label: "View Clubs", path: "/student/clubs", variant: "btn-secondary", icon: "🎯" },
    { label: "My Resources", path: "/student/resources", variant: "btn-secondary", icon: "📚" },
    { label: "My Certificates", path: "/student/certificates", variant: "btn-secondary", icon: "🏆" }
  ];

  return (
    <div>

      <div className="page-header">
        <h2>Student Dashboard</h2>
        <p className="text-secondary">Welcome back! Here's your activity overview.</p>
      </div>

      <div className="grid-container">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div
              className="stat-icon"
              style={{
                background: stat.bgColor,
                color: stat.color
              }}
            >
              {stat.icon}
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
          <h4 className="card-title">Quick Links</h4>
          <p className="card-subtitle">Access your most used features</p>
        </div>
        <div className="card-body">
          <div className="grid-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`btn ${link.variant}`}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState(null);

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
      value: stats?.clubsCount ?? 0,
      color: "var(--primary)",
      bgColor: "var(--primary-light)",
      icon: "🎯",
      view: "clubs"
    },
    {
      label: "Events Registered",
      value: stats?.registrationsCount ?? 0,
      color: "var(--success)",
      bgColor: "var(--success-light)",
      icon: "📅",
      view: "registrations"
    },
    {
      label: "Certificates Earned",
      value: stats?.certificates || 0,
      color: "var(--warning)",
      bgColor: "var(--warning-light)",
      icon: "🏆",
      view: "certificates"
    }
  ];

  const quickLinks = [
    { label: "Browse Events", path: "/events", variant: "btn-primary", icon: "📅" },
    { label: "View Clubs", path: "/clubs", variant: "btn-secondary", icon: "🎯" },
    { label: "My Resources", path: "/resources", variant: "btn-secondary", icon: "📚" },
    { label: "My Certificates", path: "/certificates", variant: "btn-secondary", icon: "🏆" }
  ];

  return (
    <div>

      <div className="page-header">
        <h2>Student Dashboard</h2>
        <p className="text-secondary">Welcome back! Here's your activity overview.</p>
      </div>

      <div className="grid-container">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            onClick={() => setSelectedView(selectedView === stat.view ? null : stat.view)}
            style={{ cursor: "pointer", border: selectedView === stat.view ? `2px solid ${stat.color}` : "none" }}
          >
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

      {/* Conditional Rendering Section */}
      <div className="mt-8">

        {selectedView === "clubs" && (
          <div className="animation-fade-in">
            <h4 className="mb-3">Joined Clubs</h4>
            {Array.isArray(stats?.clubs) && stats.clubs.length > 0 ? (
              <div className="grid-2">
                {stats.clubs.map((club) => (
                  <div key={club._id} className="card" style={{ padding: "1.5rem" }}>
                    <h5 style={{ marginBottom: "0.5rem", color: "var(--primary)" }}>{club.clubName}</h5>
                    <p className="text-secondary text-sm">
                      {club.description
                        ? (club.description.length > 100
                          ? club.description.substring(0, 100) + "..."
                          : club.description)
                        : "No description available."}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center text-muted" style={{ padding: "2rem" }}>
                <p>You haven't joined any clubs yet.</p>
                <Link to="/clubs" className="btn btn-sm btn-primary mt-2">Browse Clubs</Link>
              </div>
            )}
          </div>
        )}

        {selectedView === "registrations" && (
          <div className="animation-fade-in">
            <h4 className="mb-3">My Events</h4>
            {Array.isArray(stats?.registrations) && stats.registrations.length > 0 ? (
              <div className="card table-container">
                <table className="table-styled" style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ textAlign: "left" }}>
                      <th style={{ padding: "1rem" }}>Event</th>
                      <th style={{ padding: "1rem" }}>Date</th>
                      <th style={{ padding: "1rem" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.registrations.map((reg) => (
                      <tr key={reg._id} style={{ borderTop: "1px solid var(--border-light)" }}>
                        <td style={{ fontWeight: "500", padding: "1rem" }}>
                          {reg.eventId?.title || "Unknown Event"}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          {reg.eventId?.eventDate
                            ? new Date(reg.eventId.eventDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <span
                            className={`badge ${reg.status === "approved"
                              ? "badge-success"
                              : reg.status === "rejected"
                                ? "badge-danger"
                                : "badge-warning"
                              }`}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                              backgroundColor:
                                reg.status === "approved" ? "var(--success-light)" :
                                  reg.status === "rejected" ? "var(--danger-light)" :
                                    "var(--warning-light)",
                              color:
                                reg.status === "approved" ? "var(--success-dark)" :
                                  reg.status === "rejected" ? "var(--danger-dark)" :
                                    "var(--warning-dark)",
                              fontWeight: "600"
                            }}
                          >
                            {reg.status ? (reg.status.charAt(0).toUpperCase() + reg.status.slice(1)) : "Unknown"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="card text-center text-muted" style={{ padding: "2rem" }}>
                <p>You haven't registered for any events yet.</p>
                <Link to="/events" className="btn btn-sm btn-primary mt-2">Browse Events</Link>
              </div>
            )}
          </div>
        )}

        {selectedView === "certificates" && (
          <div className="animation-fade-in card text-center text-muted" style={{ padding: "2rem" }}>
            <p>No certificates available yet.</p>
            <Link to="/certificates" className="btn btn-sm btn-primary mt-2">View Certificates</Link>
          </div>
        )}

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

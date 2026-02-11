import { useEffect, useState } from "react";
import api from "../../api/api";

const StudentDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard/student")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center p-5">Loading dashboard...</p>;
  if (error) return <p className="text-center p-5 text-danger">{error}</p>;
  if (!stats) return <p className="text-center p-5">No data available.</p>;

  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>

      {/* Stats Cards */}
      <div className="grid-container mb-5">
        <div className="card">
          <h2>{stats.registrationsCount ?? 0}</h2>
          <p>Events Registered</p>
        </div>

        <div className="card">
          <h2>{stats.clubsCount ?? 0}</h2>
          <p>Clubs Joined</p>
        </div>

        <div className="card">
          <h2>{stats.certificates ?? 0}</h2>
          <p>Certificates</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>

        {/* Joined Clubs Section */}
        <div>
          <h4 className="mb-3">Joined Clubs</h4>
          {Array.isArray(stats.clubs) && stats.clubs.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
            <div className="card text-center text-muted">
              <p>You haven't joined any clubs yet.</p>
            </div>
          )}
        </div>

        {/* Registered Events Section */}
        <div>
          <h4 className="mb-3">My Events</h4>
          {Array.isArray(stats.registrations) && stats.registrations.length > 0 ? (
            <div className="card table-container">
              <table className="table-styled">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.registrations.map((reg) => (
                    <tr key={reg._id}>
                      <td style={{ fontWeight: "500" }}>
                        {reg.eventId?.title || "Unknown Event"}
                      </td>
                      <td>
                        {reg.eventId?.eventDate
                          ? new Date(reg.eventId.eventDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
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
            <div className="card text-center text-muted">
              <p>You haven't registered for any events yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;

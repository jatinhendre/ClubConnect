import { useEffect, useState } from "react";
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

  if (loading) return <p>Loading...</p>;

  return (
    <div>

      <h3 className="mb-4">Student Dashboard</h3>

      <div className="grid-container">

        <div className="card">
          <h2 style={{ fontSize: "2.5rem", color: "var(--primary)", marginBottom: "8px" }}>
            {stats?.clubs || 0}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Clubs Joined
          </p>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "2.5rem", color: "var(--success)", marginBottom: "8px" }}>
            {stats?.registrations || 0}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Events Registered
          </p>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "2.5rem", color: "var(--warning)", marginBottom: "8px" }}>
            {stats?.certificates || 0}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Certificates Earned
          </p>
        </div>

      </div>

      <div className="card" style={{ marginTop: "32px" }}>
        <h4 style={{ marginBottom: "16px", color: "var(--primary)" }}>Quick Links</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <a href="/events" className="btn btn-primary" style={{ textDecoration: "none" }}>
            Browse Events
          </a>
          <a href="/clubs" className="btn btn-secondary" style={{ textDecoration: "none" }}>
            View Clubs
          </a>
          <a href="/announcements" className="btn btn-secondary" style={{ textDecoration: "none" }}>
            Announcements
          </a>
          <a href="/certificates" className="btn btn-secondary" style={{ textDecoration: "none" }}>
            My Certificates
          </a>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;

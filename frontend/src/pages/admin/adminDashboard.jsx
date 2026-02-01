import { useEffect, useState } from "react";
import api from "../../api/api"

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/admin")
      .then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>

      <h3 className="mb-4">Admin Dashboard</h3>

      <div className="grid-container">

        <div className="card">
          <h2>{stats.students}</h2>
          <p>Total Students</p>
        </div>

        <div className="card">
          <h2>{stats.clubs}</h2>
          <p>Total Clubs</p>
        </div>

        <div className="card">
          <h2>{stats.events}</h2>
          <p>Total Events</p>
        </div>

        <div className="card">
          <h2>{stats.registrations}</h2>
          <p>Total Registrations</p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;

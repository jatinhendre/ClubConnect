import { useEffect, useState } from "react";
import api from "../../api/api";

function StudentDashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/student")
      .then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>

      <h3 className="mb-4">Dashboard</h3>

      <div className="grid-container">

        <div className="card">
          <h2>{stats.registrations}</h2>
          <p>Events Registered</p>
        </div>

        <div className="card">
          <h2>{stats.clubs}</h2>
          <p>Clubs Joined</p>
        </div>

        <div className="card">
          <h2>{stats.certificates}</h2>
          <p>Certificates</p>
        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;

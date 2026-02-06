import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"

function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/dashboard/admin")
      .then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  const cardStyle = {
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s"
  };

  const handleCardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
  };

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "";
  };

  return (
    <div>

      <h3 className="mb-4">Admin Dashboard</h3>

      <div className="grid-container">

        <div 
          className="card" 
          style={cardStyle}
          onClick={() => navigate("/admin/students")}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <h2>{stats.students}</h2>
          <p>Total Students</p>
        </div>

        <div 
          className="card" 
          style={cardStyle}
          onClick={() => navigate("/admin/clubs")}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <h2>{stats.clubs}</h2>
          <p>Total Clubs</p>
        </div>

        <div 
          className="card" 
          style={cardStyle}
          onClick={() => navigate("/admin/events")}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <h2>{stats.events}</h2>
          <p>Total Events</p>
        </div>

        <div 
          className="card" 
          style={cardStyle}
          onClick={() => navigate("/admin/registrations")}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <h2>{stats.registrations}</h2>
          <p>Total Registrations</p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;

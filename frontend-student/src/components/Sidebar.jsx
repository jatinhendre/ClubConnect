import { NavLink } from "react-router-dom";

function Sidebar() {

  return (
    <div className="sidebar">

      <div className="logo-container">
        <h2 style={{ color: "white", margin: 0 }}>ClubConnect</h2>
        <p style={{ color: "#94A3B8", fontSize: "12px", margin: 0 }}>Student Portal</p>
      </div>

      <NavLink to="/dashboard" end>Dashboard</NavLink>
      <NavLink to="/clubs">View Clubs</NavLink>
      <NavLink to="/events">Events</NavLink>
      <NavLink to="/announcements">Announcements</NavLink>
      <NavLink to="/gallery">Gallery</NavLink>
      <NavLink to="/resources">Resources</NavLink>
      <NavLink to="/certificates">My Certificates</NavLink>
      <NavLink to="/feedback">Feedback</NavLink>

    </div>
  );
}

export default Sidebar;

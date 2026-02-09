import { NavLink } from "react-router-dom";

function Sidebar() {

  return (
    <div className="sidebar">

        <div className="logo-container">
        <img src="/logo.png" alt="ClubConnect Logo" className="logo-icon" />
        <img src="/logo-name.png" alt="ClubConnect" className="logo-text" />
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

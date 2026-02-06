import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import ViewClubs from "../pages/ViewClubs"
function Sidebar() {

  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar" style={{overflow:"scroll"}}>

      <div className="logo-container">
        <img src="/logo.png" alt="ClubConnect Logo" className="logo-icon" />
        <img src="/logo-name.png" alt="ClubConnect" className="logo-text" />
      </div>

      {user?.role === "admin" && (
        <>
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/students">View Students</NavLink>
          <NavLink to="/admin/clubs">View Clubs</NavLink>
          <NavLink to="/admin/events">View Events</NavLink>
          <NavLink to="/admin/registrations">Event Registrations</NavLink>
          <NavLink to="/admin/club-registrations">Club Registrations</NavLink>
          <NavLink to="/admin/create-student">Create Student</NavLink>
          <NavLink to="/admin/create-event">Create Event</NavLink>
          <NavLink to="/admin/create-announcement">Create Announcement</NavLink>
          <NavLink to="/admin/announcements">View Announcements</NavLink>
          <NavLink to="/admin/upload-gallery">Upload Gallery</NavLink>
          <NavLink to="/admin/gallery">Gallery</NavLink>
          <NavLink to="/admin/upload-resource">Upload Resource</NavLink>
        </>
      )}

      {user?.role === "student" && (
        <>
          <NavLink to="/student" end>Dashboard</NavLink>
          <NavLink to="/student/clubs">View Clubs</NavLink>
          <NavLink to="/student/events">Events</NavLink>
          <NavLink to="/student/resources">Resources</NavLink>
          <NavLink to="/student/feedback">Feedback</NavLink>
          <NavLink to="/student/gallery">Gallery</NavLink>
          <NavLink to="/student/certificates">Certificates</NavLink>
        </>
      )}

    </div>
  );
}

export default Sidebar;

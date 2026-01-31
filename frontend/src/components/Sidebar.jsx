import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Sidebar() {

  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">

      <h2 className="logo">ClubConnect</h2>

      {user?.role === "admin" && (
        <>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/create-student">Create Student</Link>
          <Link to="/admin/create-club">Create Club</Link>
          <Link to="/admin/create-event">Create Event</Link>
          <Link to="/admin/registrations">Registrations</Link>
          <Link to="/admin/upload-resource">Upload Resource</Link>
        </>
      )}

      {user?.role === "student" && (
        <>
          <Link to="/student">Dashboard</Link>
          <Link to="/student/events">Events</Link>
          <Link to="/student/resources">Resources</Link>
          <Link to="/student/feedback">Feedback</Link>
          <Link to="/student/certificates">Certificates</Link>
        </>
      )}

    </div>
  );
}

export default Sidebar;

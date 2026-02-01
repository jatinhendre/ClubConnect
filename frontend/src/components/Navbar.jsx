import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{gap:"10px"}} className="navbar">
      <NavLink to="/student/change-password">Change Password</NavLink>
      <button style={{color:"black"}} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;

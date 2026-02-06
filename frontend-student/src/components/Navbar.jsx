import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
        Welcome, <strong style={{ color: "var(--primary)" }}>{user?.name}</strong>
      </div>
      
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <NavLink to="/change-password" style={{ fontSize: "14px" }}>Change Password</NavLink>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;

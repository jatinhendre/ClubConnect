import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);

    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
        Welcome, <strong style={{ color: "var(--primary)" }}>{user?.name}</strong>
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={toggleDarkMode}
          className="btn-secondary btn-sm"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{ padding: "8px 12px" }}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <NavLink to="/change-password" style={{ fontSize: "14px" }}>Change Password</NavLink>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;

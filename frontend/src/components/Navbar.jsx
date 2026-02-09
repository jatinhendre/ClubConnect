import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const { logout } = useContext(AuthContext);
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
    <div className="navbar">
      <div className="navbar-left">
        <h3 className="navbar-title">Admin Portal</h3>
      </div>
      <div className="navbar-right" style={{ gap: "10px" }}>
        <button
          onClick={toggleDarkMode}
          className="btn-secondary btn-sm"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{ padding: "8px 12px" }}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <NavLink to="/admin/change-password">Change Password</NavLink>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;

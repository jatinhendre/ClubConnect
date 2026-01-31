import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/layout.css";

function DashboardLayout() {
  return (
    <div className="app-container" style={{fontSize: "14px"}}>
      <Sidebar />

      <div style={{ display: "flex", height: "100vh", width: "80vw" }} className="right-section">
        <Navbar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;

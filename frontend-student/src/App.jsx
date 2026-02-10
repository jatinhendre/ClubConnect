import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ViewClubs from "./pages/ViewClubs";
import "./index.css";
import "./App.css";
import "./styles/components.css";
import "./styles/layout.css";
import ViewEvents from "./pages/ViewEvents";
import ViewAnnouncements from "./pages/ViewAnnouncements";
import Gallery from "./pages/Gallery";
import Resources from "./pages/Resources";
import MyCertificates from "./pages/MyCertificates";
import Feedback from "./pages/Feedback";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* LOGIN */}
          <Route path="/" element={<Login />} />

          {/* DASHBOARD - Protected */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clubs" element={<ViewClubs />} />
            <Route path='/events' element={<ViewEvents/>}/>
            <Route path='/announcements' element={<ViewAnnouncements/>}/>
            <Route path='/gallery' element={<Gallery/>}/>
            <Route path='/resources' element={<Resources/>}/>
            <Route path='/certificates' element={<MyCertificates/>}/>
            <Route path='/feedback' element={<Feedback/>}/>
            <Route path='/change-password' element={<ChangePassword/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

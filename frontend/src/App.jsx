import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

// ADMIN
import AdminDashboard from "./pages/admin/adminDashboard.jsx";
import CreateClub from "./pages/admin/CreateClub";
import CreateEvent from "./pages/admin/CreateEvent";
import Registrations from "./pages/admin/Registrations";
import UploadResources from "./pages/admin/UploadResources.jsx";
import CreateStudent from "./pages/admin/CreateStudent";
import ViewStudents from "./pages/admin/ViewStudents";

// STUDENT
import StudentDashboard from "./pages/student/studentDashboard.jsx";
import ViewClubs from "./pages/student/ViewClubs";
import ViewEvents from "./pages/student/ViewEvents";
import Resources from "./pages/student/Resources";
import Feedback from "./pages/student/Feedback";
import MyCertificates from "./pages/student/MyCertificates";

// COMMON
import ChangePassword from "./pages/ChangePassword.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* ADMIN AREA */}
        <Route
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create-club" element={<CreateClub />} />
          <Route path="/admin/create-event" element={<CreateEvent />} />
          <Route path="/admin/registrations" element={<Registrations />} />
          <Route path="/admin/upload-resource" element={<UploadResources />} />
          <Route path="/admin/create-student" element={<CreateStudent />} />
          <Route path="/admin/students" element={<ViewStudents />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        {/* STUDENT AREA */}
        <Route
          element={
            <ProtectedRoute role="student">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/clubs" element={<ViewClubs />} />
          <Route path="/student/events" element={<ViewEvents />} />
          <Route path="/student/resources" element={<Resources />} />
          <Route path="/student/feedback" element={<Feedback />} />
          <Route path="/student/certificates" element={<MyCertificates />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

// ADMIN
import AdminDashboard from "./pages/admin/adminDashboard.jsx";
import CreateEvent from "./pages/admin/CreateEvent";
import Registrations from "./pages/admin/Registrations";
import UploadResources from "./pages/admin/UploadResources.jsx";
import CreateStudent from "./pages/admin/CreateStudent";
import ViewStudents from "./pages/admin/ViewStudents";
import AdminViewEvents from "./pages/admin/ViewEvents";
import CreateAnnouncement from "./pages/admin/CreateAnnouncement";
import ViewAnnouncements from "./pages/admin/ViewAnnouncements";
import UploadGallery from "./pages/admin/UploadGallery";
import ClubRegistrations from "./pages/admin/ClubRegistrations";

// STUDENT
import StudentDashboard from "./pages/student/studentDashboard.jsx";
import ViewClubs from "./pages/ViewClubs.jsx"
import ViewEvents from "./pages/student/ViewEvents";
import Resources from "./pages/student/Resources";
import Feedback from "./pages/student/Feedback";
import MyCertificates from "./pages/student/MyCertificates";
import Gallery from "./pages/Gallery.jsx"
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
          <Route path="/admin/clubs" element={<ViewClubs />} />
          <Route path="/admin/events" element={<AdminViewEvents />} />
          <Route path="/admin/create-event" element={<CreateEvent />} />
          <Route path="/admin/registrations" element={<Registrations />} />
          <Route path="/admin/club-registrations" element={<ClubRegistrations />} />
          <Route path="/admin/upload-resource" element={<UploadResources />} />
          <Route path="/admin/create-student" element={<CreateStudent />} />
          <Route path="/admin/gallery" element={<Gallery />} />
          <Route path="/admin/students" element={<ViewStudents />} />
          <Route path="/admin/create-announcement" element={<CreateAnnouncement />} />
          <Route path="/admin/announcements" element={<ViewAnnouncements />} />
          <Route path="/admin/upload-gallery" element={<UploadGallery />} />
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
          <Route path="/student/gallery" element={<Gallery />} />
          <Route path="/student/feedback" element={<Feedback />} />
          <Route path="/student/certificates" element={<MyCertificates />} />
          <Route path="/student/change-password" element={<ChangePassword />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

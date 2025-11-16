// src/App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Pages publiques
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Dashboard + profil
import DashboardRoutes from "./pages/Dashboard";
import Profile from "./pages/Profile";

// 👉 nouvelles pages Assignments
import ParentAssignments from "./pages/parent/Assignments";     // /dashboard/profs
import TeacherAssignments from "./pages/teacher/MyAssignments"; // /teacher/assignments
import AssignmentsAdmin from "./pages/admin/AssignmentsAdmin";  // /admin/assignments

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public */}
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/inscription" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/connexion" element={<PublicRoute><Login /></PublicRoute>} />
            {/* Profil (protégé) */}
            <Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* Dashboard parent (protégé) */}
            <Route path="/dashboard/*" element={<ProtectedRoute /* roles={['ROLE_PARENT']} si ton ProtectedRoute gère les rôles */>
                  <DashboardRoutes /></ProtectedRoute>}/>
            {/* 👉 Assignments Parent : page “Professeurs” */}
            <Route path="/dashboard/profs" element={<ProtectedRoute /* roles={['ROLE_PARENT']} */>
                  <ParentAssignments /></ProtectedRoute>} />
            {/* 👉 Assignments Prof */}
            <Route path="/teacher/assignments" element={<ProtectedRoute /* roles={['ROLE_TEACHER']} */>
                  <TeacherAssignments /></ProtectedRoute>} />

            {/* 👉 Assignments Admin */}
            <Route
              path="/admin/assignments"
              element={
                <ProtectedRoute /* roles={['ROLE_ADMIN']} */>
                  <AssignmentsAdmin />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<div style={{ padding: 24 }}>Page introuvable</div>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
// src/App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Hooks et contexte
import { AuthProvider, useAuth } from "./context/AuthContext";

// Composants de layout et de protection
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Pages publiques
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Import des routes des dashboards
import { TeacherRoutes } from "./dashboard/teacher/TeacherDashboard";
// import { ParentRoutes } from "./dashboard/parent/ParentDashboard";
// import { StudentRoutes } from "./dashboard/student/StudentDashboard";

const DashboardRoutes = () => {
  const { user } = useAuth();

  if (!user) return null;

  // récupération du profil avec fallback
  const profile = (user.profile || user.profileType || "").toUpperCase();

  switch (profile) {
    case "TEACHER":
      return <>{TeacherRoutes}</>;
    // case "PARENT":
    //   return <>{ParentRoutes}</>;
    // case "STUDENT":
    //   return <>{StudentRoutes}</>;
    default:
      return <div style={{ padding: 24 }}>Profil non valide : "{profile}"</div>;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/inscription" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/connexion" element={<PublicRoute><Login /></PublicRoute>} />

            {/* Routes protégées */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    {DashboardRoutes()}
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<div style={{ padding: 24 }}>Page introuvable</div>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
// src/App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Hooks et contexte
import { AuthProvider } from "./context/AuthContext";

// Composants
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Pages publiques
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Dashboards
import DashboardRoutes from "./pages/Dashboard";

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
                  <DashboardRoutes />   {/* 👉 composant, pas fonction */}
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

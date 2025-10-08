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

// MISE À JOUR 1: Importer les définitions de routes pour chaque profil
// (Ces composants doivent être créés comme dans la réponse précédente)
import { TeacherRoutes } from './dashboard/teacher/TeacherDashboard';
// import { ParentRoutes } from './dashboard/parent/ParentDashboard';
// import { StudentRoutes } from './dashboard/student/StudentDashboard';


// MISE À JOUR 2: Création du composant "aiguilleur" de routes
const DashboardRoutes = () => {
  const { user } = useAuth();
  
  // Attendre que l'utilisateur soit chargé pour éviter un rendu incorrect
  if (!user) return null;

  // Récupération robuste du profil (indifférent à la casse)
  const profile = (user.profile || user.profileType || '').toUpperCase();

  // Afficher les routes correspondant au profil de l'utilisateur
  switch (profile) {
    case 'TEACHER':
      return <TeacherRoutes />;
    // case 'PARENT':
    //   return <ParentRoutes />;
    // case 'STUDENT':
    //   return <StudentRoutes />;
    default:
      // Si le profil n'est pas reconnu, on peut afficher un message
      return <div style={{ padding: 24 }}>Profil non valide.</div>;
  }
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="main-content"> {/* Ajout d'une balise main pour la sémantique et le style */}
          <Routes>
            {/* Routes publiques (uniquement si NON connecté) */}
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/inscription" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/connexion" element={<PublicRoute><Login /></PublicRoute>} />

            {/* MISE À JOUR 3: Modification de la route privée */}
            <Route
              path="/dashboard/*" // L'astérisque est crucial pour les routes imbriquées
              element={
                <ProtectedRoute>
                  <DashboardRoutes />
                </ProtectedRoute>
              }
            />

            {/* Fallback 404 simple */}
            <Route path="*" element={<div style={{ padding: 24 }}>Page introuvable</div>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
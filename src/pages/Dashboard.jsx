// src/pages/Dashboard.jsx
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TeacherRoutes } from "../dashboard/teacher/TeacherDashboard";
// import { ParentRoutes } from "../dashboard/parent/ParentDashboard";
// import { StudentRoutes } from "../dashboard/student/StudentDashboard";

const DashboardRoutes = () => {
  const { user } = useAuth();
  if (!user) return null;

  const profile = (user.profile || user.profileType || "").toUpperCase();

  return (
    <Routes>
      {profile === "TEACHER" && TeacherRoutes}
      {/* {profile === "PARENT" && ParentRoutes} */}
      {/* {profile === "STUDENT" && StudentRoutes} */}
      <Route
        path="*"
        element={<div style={{ padding: 24 }}>Profil non valide : "{profile}"</div>}
      />
    </Routes>
  );
};

export default DashboardRoutes;
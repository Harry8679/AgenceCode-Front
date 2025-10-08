import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TeacherRoutes } from "../dashboard/teacher/TeacherDashboard";
// import { ParentRoutes } from "../dashboard/parent/ParentDashboard";
// import { StudentRoutes } from "../dashboard/student/StudentDashboard";

const DashboardRoutes = () => {
  const { user } = useAuth();
  if (!user) return null;

  // lecture tolérante (quelle que soit la forme)
  const profile = (
    user?.profileType ??
    user?.profile ??
    user?.role ??
    user?.user?.profile ?? // au cas où tu aurais un user imbriqué
    user?.data?.profile ??
    ""
  ).toString().toUpperCase();

  return (
    <Routes>
      {profile === "TEACHER" && (
        <>
          <Route index element={<Navigate to="mes-eleves" replace />} />
          {TeacherRoutes}
        </>
      )}

      {profile === "PARENT" && (
        <>
          <Route index element={<Navigate to="accueil-parent" replace />} />
          {/* {ParentRoutes} */}
        </>
      )}

      {profile === "STUDENT" && (
        <>
          <Route index element={<Navigate to="accueil-eleve" replace />} />
          {/* {StudentRoutes} */}
        </>
      )}

      <Route
        path="*"
        element={<div style={{ padding: 24 }}>Profil non valide : "{profile}"</div>}
      />
    </Routes>
  );
};

export default DashboardRoutes;
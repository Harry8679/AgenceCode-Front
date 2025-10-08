import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TeacherRoutes } from "../dashboard/teacher/TeacherDashboard";
// import { ParentRoutes } from "../dashboard/parent/ParentDashboard";
// import { StudentRoutes } from "../dashboard/student/StudentDashboard";

const normalizeProfile = (raw) => {
  if (!raw) return "";
  let s = String(raw).toUpperCase().trim();
  if (s.startsWith("ROLE_")) s = s.slice(5);
  if (["TEACHER", "ENSEIGNANT", "PROFESSEUR"].includes(s)) return "TEACHER";
  if (["PARENT", "PARENTS", "TUTEUR"].includes(s)) return "PARENT";
  if (["STUDENT", "ELEVE", "ÉLÈVE"].includes(s)) return "STUDENT";
  return ["TEACHER", "PARENT", "STUDENT"].includes(s) ? s : "";
};

const DashboardRoutes = () => {
  const { user } = useAuth();
  if (!user) return null;

  // Cherche le profile dans toutes les formes possibles (y compris anciennes)
  const profile = normalizeProfile(
    user?.profile ??
    user?.profileType ??
    user?.role ??
    (Array.isArray(user?.roles) ? user.roles[0] : undefined) ??
    user?.user?.profile ?? // si jamais tu avais stocké user.user
    user?.data?.profile
  );

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
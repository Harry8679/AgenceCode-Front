import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { TeacherRoutes } from "../dashboard/teacher/TeacherDashboard";
import { ParentRoutes }  from "../dashboard/parent/ParentDashboard";
import { StudentRoutes } from "../dashboard/student/StudentDashboard";

const normalize = (raw) => {
  if (!raw) return "";
  let s = String(raw).toUpperCase();
  if (s.startsWith("ROLE_")) s = s.slice(5);
  if (["ENSEIGNANT","PROFESSEUR"].includes(s)) return "TEACHER";
  if (["ELEVE","ÉLÈVE"].includes(s)) return "STUDENT";
  return ["TEACHER","PARENT","STUDENT"].includes(s) ? s : "";
};

const DashboardRoutes = () => {
  const { user } = useAuth();
  if (!user) return null;

  const profile = normalize(user.profile || user.profileType || user.role || (user.roles?.[0]));

  return (
    <Routes>
      {profile === "TEACHER" && (
        <>
          <Route index element={<Navigate to="overview" replace />} />
          {TeacherRoutes}
        </>
      )}

      {profile === "PARENT" && (
        <>
          <Route index element={<Navigate to="overview" replace />} />
          {ParentRoutes}
        </>
      )}

      {profile === "STUDENT" && (
        <>
          <Route index element={<Navigate to="overview" replace />} />
          {StudentRoutes}
        </>
      )}

      <Route path="*" element={<div className="p-6">Profil non valide : "{profile}"</div>} />
    </Routes>
  );
};

export default DashboardRoutes;

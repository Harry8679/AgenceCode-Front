// src/pages/Dashboard.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { TeacherRoutes } from "../dashboard/teacher/TeacherDashboard";
import { ParentRoutes }  from "../dashboard/parent/ParentDashboard";
import { StudentRoutes } from "../dashboard/student/StudentDashboard";

/* ---------- Normalisation du profil ---------- */
const normalize = (raw) => {
  if (!raw) return "";
  let s = String(raw).toUpperCase();
  if (s.startsWith("ROLE_")) s = s.slice(5);
  if (["ENSEIGNANT","PROFESSEUR"].includes(s)) return "TEACHER";
  if (["ELEVE","ÉLÈVE"].includes(s)) return "STUDENT";
  return ["TEACHER","PARENT","STUDENT"].includes(s) ? s : "";
};

/* ---------- Thèmes par profil ---------- */
const PROFILE_THEME = {
  STUDENT: {
    bg: "bg-gradient-to-br from-sky-200 via-sky-100 to-white",
    ring: "ring-sky-300",
    panel: "bg-white/95", // carte intérieure légèrement teintée
  },
  PARENT: {
    bg: "bg-gradient-to-br from-emerald-200 via-emerald-100 to-white",
    ring: "ring-emerald-300",
    panel: "bg-white/95",
  },
  TEACHER: {
    bg: "bg-gradient-to-br from-amber-200 via-amber-100 to-white",
    ring: "ring-amber-300",
    panel: "bg-white/95",
  },
  DEFAULT: {
    bg: "bg-gradient-to-br from-gray-100 via-gray-50 to-white",
    ring: "ring-gray-200",
    panel: "bg-white",
  },
};


const DashboardRoutes = () => {
  const { user } = useAuth();
  if (!user) return null;

  const profile =
    normalize(user.profile || user.profileType || user.role || (user.roles?.[0]));
  const theme = PROFILE_THEME[profile] || PROFILE_THEME.DEFAULT;

  return (
    // ✅ Fond de page selon le profil
    <div className={`min-h-[calc(100vh-64px)] ${theme.bg}`}>
      {/* conteneur du contenu du dashboard */}
      <div className={`mx-auto max-w-7xl px-4 py-6 md:py-8`}>
        {/* (optionnel) une carte globale qui contraste avec le fond */}
        <div className={`rounded-2xl bg-white shadow-sm ring-1 ${theme.ring}`}>
          <div className="p-4 md:p-6">
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

              <Route
                path="*"
                element={
                  <div className="p-6 text-sm text-slate-600">
                    Profil non valide : "<span className="font-mono">{profile}</span>"
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoutes;
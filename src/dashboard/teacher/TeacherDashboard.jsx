import { Route, Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

// ⚠️ on ajoute le lien "Vue d'ensemble" qui pointe sur /dashboard/overview
const teacherLinks = [
  { to: "/dashboard/overview",   label: "Vue d'ensemble" },
  { to: "/dashboard/mes-eleves", label: "Mes élèves" },
  { to: "/dashboard/calendrier", label: "Calendrier" },
  { to: "/dashboard/ressources", label: "Ressources" },
];

// Pages (déportées dans src/pages/teacher)
import Overview   from "../../pages/teacher/Overview";
import Students   from "../../pages/teacher/Students";
import Calendar   from "../../pages/teacher/Calendar";
import Resources  from "../../pages/teacher/Resources";

// Shell avec Outlet pour rendre les routes enfants
const TeacherShell = () => (
  <DashboardLayout sidebarLinks={teacherLinks}>
    <Outlet />
  </DashboardLayout>
);

// On exporte une collection de <Route> relatives à /dashboard/*
export const TeacherRoutes = (
  <Route element={<TeacherShell />}>
    <Route index element={<Overview />} />                {/* /dashboard */}
    <Route path="overview"   element={<Overview />} />
    <Route path="mes-eleves" element={<Students />} />
    <Route path="calendrier" element={<Calendar />} />
    <Route path="ressources" element={<Resources />} />
  </Route>
);

export default TeacherShell;
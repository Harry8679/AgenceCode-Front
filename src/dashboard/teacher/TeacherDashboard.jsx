import React from "react";
import { Route, Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

// ✅ imports des pages en haut du fichier
import Overview  from "../../pages/teacher/Overview";
import Students  from "../../pages/teacher/Students";
import Calendar  from "../../pages/teacher/Calendar";
import Resources from "../../pages/teacher/Resources";

// Liens de la sidebar
const teacherLinks = [
  { to: "/dashboard/overview",   label: "Vue d'ensemble" },
  { to: "/dashboard/mes-eleves", label: "Mes élèves" },
  { to: "/dashboard/calendrier", label: "Calendrier" },
  { to: "/dashboard/ressources", label: "Ressources" },
];

// Shell avec Outlet pour les routes enfant
const TeacherShell = () => (
  <DashboardLayout sidebarLinks={teacherLinks}>
    <Outlet />
  </DashboardLayout>
);

// Routes imbriquées relatives à /dashboard/*
export const TeacherRoutes = (
  <Route element={<TeacherShell />}>
    <Route index element={<Overview />} />            {/* /dashboard */}
    <Route path="overview"   element={<Overview />} />
    <Route path="mes-eleves" element={<Students />} />
    <Route path="calendrier" element={<Calendar />} />
    <Route path="ressources" element={<Resources />} />
  </Route>
);

export default TeacherShell;
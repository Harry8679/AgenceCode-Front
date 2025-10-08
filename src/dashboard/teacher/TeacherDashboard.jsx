import React from "react";
import { Route, Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const teacherLinks = [
  { to: "/dashboard/mes-eleves", label: "Mes élèves" },
  { to: "/dashboard/calendrier", label: "Calendrier" },
  { to: "/dashboard/ressources", label: "Ressources" },
];

const Overview  = () => <h1 className="text-2xl font-bold">Vue d'ensemble</h1>;
const Students  = () => <h1 className="text-2xl font-bold">Mes élèves</h1>;
const Calendar  = () => <h1 className="text-2xl font-bold">Calendrier</h1>;
const Resources = () => <h1 className="text-2xl font-bold">Ressources</h1>;

// Shell avec Outlet pour rendre les routes enfants
const TeacherShell = () => (
  <DashboardLayout sidebarLinks={teacherLinks}>
    <Outlet />
  </DashboardLayout>
);

// On exporte une collection de <Route> relatives à /dashboard/*
export const TeacherRoutes = (
  <Route element={<TeacherShell />}>
    <Route path="mes-eleves" element={<Students />} />
    <Route path="calendrier" element={<Calendar />} />
    <Route path="ressources" element={<Resources />} />
    {/* Si tu veux une page d'accueil prof: */}
    <Route path="overview" element={<Overview />} />
  </Route>
);

export default TeacherShell;
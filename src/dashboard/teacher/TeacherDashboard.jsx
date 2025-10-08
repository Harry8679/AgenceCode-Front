import React from "react";
import { Route, Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const teacherLinks = [
  { to: "/dashboard", label: "Vue d'ensemble" },
  { to: "/dashboard/mes-eleves", label: "Mes élèves" },
  { to: "/dashboard/calendrier", label: "Calendrier" },
  { to: "/dashboard/ressources", label: "Ressources" },
];

const Overview = () => <h1 className="text-2xl font-bold">Vue d'ensemble du Professeur</h1>;
const Students = () => <h1 className="text-2xl font-bold">Liste de mes élèves</h1>;
const Calendar = () => <h1 className="text-2xl font-bold">Mon calendrier</h1>;
const Resources = () => <h1 className="text-2xl font-bold">Mes ressources pédagogiques</h1>;

const TeacherDashboard = () => {
  return (
    <DashboardLayout sidebarLinks={teacherLinks}>
      <Outlet />
    </DashboardLayout>
  );
};

// ⚡ On exporte un tableau de <Route>
export const TeacherRoutes = [
  <Route key="teacher" path="" element={<TeacherDashboard />}>
    <Route index element={<Overview />} />
    <Route path="mes-eleves" element={<Students />} />
    <Route path="calendrier" element={<Calendar />} />
    <Route path="ressources" element={<Resources />} />
  </Route>
];

export default TeacherDashboard;
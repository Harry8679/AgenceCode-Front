// src/dashboard/teacher/TeacherDashboard.jsx
import { Route } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const teacherLinks = [
  { to: "/dashboard", label: "Vue d'ensemble" },
  { to: "/dashboard/mes-eleves", label: "Mes élèves" },
  { to: "/dashboard/calendrier", label: "Calendrier" },
  { to: "/dashboard/ressources", label: "Ressources" },
];

const Overview = () => <h1>Vue d'ensemble du Professeur</h1>;
const Students = () => <h1>Mes élèves</h1>;
const Calendar = () => <h1>Calendrier</h1>;
const Resources = () => <h1>Ressources</h1>;

export const TeacherRoutes = [
  <Route
    key="teacher"
    path="/*"
    element={<DashboardLayout sidebarLinks={teacherLinks} />}
  >
    <Route index element={<Overview />} />
    <Route path="mes-eleves" element={<Students />} />
    <Route path="calendrier" element={<Calendar />} />
    <Route path="ressources" element={<Resources />} />
  </Route>
];

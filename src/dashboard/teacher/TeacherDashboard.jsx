import React from "react";
import { Route, Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

// Icônes
import {
  LayoutDashboard, Users, CalendarDays, BookOpen,
  ClipboardList, Clock, CreditCard, MessageCircle
} from "lucide-react";

// Pages (déportées)
import Overview        from "../../pages/teacher/Overview";
import Students        from "../../pages/teacher/Students";
import Calendar        from "../../pages/teacher/Calendar";
import Resources       from "../../pages/teacher/Resources";
import CourseOffers    from "../../pages/teacher/CourseOffers";
import Availability    from "../../pages/teacher/Availability";
import Payments        from "../../pages/teacher/Payments";
import ContactSupport  from "../../pages/teacher/ContactSupport";

// Liens de la sidebar (avec icônes)
const teacherLinks = [
  { to: "/dashboard/overview",           label: "Vue d'ensemble",  icon: LayoutDashboard },
  { to: "/dashboard/mes-eleves",         label: "Mes élèves",      icon: Users },
  { to: "/dashboard/calendrier",         label: "Calendrier",      icon: CalendarDays },
  { to: "/dashboard/ressources",         label: "Ressources",      icon: BookOpen },
  { to: "/dashboard/mes-offres",         label: "Mes offres",      icon: ClipboardList },
  { to: "/dashboard/mes-disponibilites", label: "Mes disponibilités", icon: Clock },
  { to: "/dashboard/mes-paiements",      label: "Mes paiements",   icon: CreditCard },
  { to: "/dashboard/nous-contacter",     label: "Nous contacter",  icon: MessageCircle },
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
    <Route index element={<Overview />} />                 {/* /dashboard */}
    <Route path="overview"           element={<Overview />} />
    <Route path="mes-eleves"         element={<Students />} />
    <Route path="calendrier"         element={<Calendar />} />
    <Route path="ressources"         element={<Resources />} />
    <Route path="mes-offres"         element={<CourseOffers />} />
    <Route path="mes-disponibilites" element={<Availability />} />
    <Route path="mes-paiements"      element={<Payments />} />
    <Route path="nous-contacter"     element={<ContactSupport />} />
  </Route>
);

export default TeacherShell;
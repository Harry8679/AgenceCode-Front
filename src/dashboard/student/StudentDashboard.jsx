import React from "react";
import { Route, Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

import {
  LayoutDashboard, BookOpen, ShoppingCart, Ticket,
  GraduationCap, CalendarDays, CreditCard, MessageCircle
} from "lucide-react";

import Overview       from "../../pages/student/Overview";
import Courses        from "../../pages/student/Courses";
import BuyCourses     from "../../pages/student/BuyCourses";
import Coupons        from "../../pages/student/Coupons";
import Teachers       from "../../pages/student/Teachers";
import Calendar       from "../../pages/student/Calendar";
import Payments       from "../../pages/student/Payments";
import ContactSupport from "../../pages/student/ContactSupport";

const studentLinks = [
  { to: "/dashboard/overview",  label: "Vue d'ensemble", icon: LayoutDashboard },
  { to: "/dashboard/mes-cours", label: "Mes cours",      icon: BookOpen },
  { to: "/dashboard/acheter",   label: "Acheter des cours", icon: ShoppingCart },
  { to: "/dashboard/coupons",   label: "Mes coupons",    icon: Ticket },
  { to: "/dashboard/profs",     label: "Mes professeurs", icon: GraduationCap },
  { to: "/dashboard/calendrier",label: "Calendrier",     icon: CalendarDays },
  { to: "/dashboard/paiements", label: "Paiements",      icon: CreditCard },
  { to: "/dashboard/support",   label: "Nous contacter", icon: MessageCircle },
];

const StudentShell = () => (
  <DashboardLayout sidebarLinks={studentLinks}>
    <Outlet />
  </DashboardLayout>
);

export const StudentRoutes = (
  <Route element={<StudentShell />}>
    <Route index element={<Overview />} />
    <Route path="overview"     element={<Overview />} />
    <Route path="mes-cours"    element={<Courses />} />
    <Route path="acheter"      element={<BuyCourses />} />
    <Route path="coupons"      element={<Coupons />} />
    <Route path="profs"        element={<Teachers />} />
    <Route path="calendrier"   element={<Calendar />} />
    <Route path="paiements"    element={<Payments />} />
    <Route path="support"      element={<ContactSupport />} />
  </Route>
);

export default StudentShell;

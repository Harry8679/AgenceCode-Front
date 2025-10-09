import React from "react";
import { Route, Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

// Icônes
import {
  LayoutDashboard, Users, Ticket, GraduationCap,
  CreditCard, FilePlus2, MessageCircle, Settings
} from "lucide-react";

// Pages
import Overview        from "../../pages/parent/Overview";
import Children        from "../../pages/parent/Children";
import Coupons         from "../../pages/parent/Coupons";
import Teachers        from "../../pages/parent/Teachers";
import Payments        from "../../pages/parent/Payments";
import Requests        from "../../pages/parent/Requests";
import ContactSupport  from "../../pages/parent/ContactSupport";
import FamilySettings  from "../../pages/parent/FamilySettings";

// Liens sidebar
const parentLinks = [
  { to: "/dashboard/overview",  label: "Vue d'ensemble", icon: LayoutDashboard },
  { to: "/dashboard/enfants",   label: "Mes enfants",    icon: Users },
  { to: "/dashboard/coupons",   label: "Mes coupons",    icon: Ticket },
  { to: "/dashboard/profs",     label: "Professeurs",    icon: GraduationCap },
  { to: "/dashboard/paiements", label: "Paiements",      icon: CreditCard },
  { to: "/dashboard/demandes",  label: "Demandes",       icon: FilePlus2 },
  { to: "/dashboard/support",   label: "Nous contacter", icon: MessageCircle },
  { to: "/dashboard/famille",   label: "Paramètres",     icon: Settings },
];

const ParentShell = () => (
  <DashboardLayout sidebarLinks={parentLinks}>
    <Outlet />
  </DashboardLayout>
);

export const ParentRoutes = (
  <Route element={<ParentShell />}>
    <Route index element={<Overview />} />
    <Route path="overview"  element={<Overview />} />
    <Route path="enfants"   element={<Children />} />
    <Route path="coupons"   element={<Coupons />} />
    <Route path="profs"     element={<Teachers />} />
    <Route path="paiements" element={<Payments />} />
    <Route path="demandes"  element={<Requests />} />
    <Route path="support"   element={<ContactSupport />} />
    <Route path="famille"   element={<FamilySettings />} />
  </Route>
);

export default ParentShell;
// src/dashboard/teacher/TeacherDashboard.js
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

// Liens spécifiques pour le professeur
const teacherLinks = [
  { to: '/dashboard', label: 'Vue d\'ensemble' },
  { to: '/dashboard/mes-eleves', label: 'Mes élèves' },
  { to: '/dashboard/calendrier', label: 'Calendrier' },
  { to: '/dashboard/ressources', label: 'Ressources' },
];

// Composants de pages pour chaque lien
const Overview = () => <h1 className="text-2xl font-bold">Vue d'ensemble du Professeur</h1>;
const Students = () => <h1 className="text-2xl font-bold">Liste de mes élèves</h1>;
const Calendar = () => <h1 className="text-2xl font-bold">Mon calendrier</h1>;
const Resources = () => <h1 className="text-2xl font-bold">Mes ressources pédagogiques</h1>;

const TeacherDashboard = () => {
  return (
    <DashboardLayout sidebarLinks={teacherLinks}>
      {/* Outlet va afficher le composant correspondant à la route imbriquée */}
      <Outlet /> 
    </DashboardLayout>
  );
};

// On peut définir les routes ici pour garder le composant principal propre
export const TeacherRoutes = () => (
  <Route path="/dashboard" element={<TeacherDashboard />}>
    <Route index element={<Overview />} />
    <Route path="mes-eleves" element={<Students />} />
    <Route path="calendrier" element={<Calendar />} />
    <Route path="ressources" element={<Resources />} />
  </Route>
);

// Pour l'export dans l'aiguilleur, on exporte le composant qui contient le layout
export default TeacherDashboard;
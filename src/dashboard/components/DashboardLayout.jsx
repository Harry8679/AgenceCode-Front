// src/dashboard/components/DashboardLayout.js
import React from 'react';
import Sidebar from './Sidebar';

// Le layout reçoit les liens pour la sidebar et le contenu à afficher (children)
const DashboardLayout = ({ sidebarLinks, children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar links={sidebarLinks} />
      <main className="flex-1 p-6 md:p-8">
        {/* Le contenu de la page spécifique (ex: "Mes cours", "Mes factures") sera affiché ici */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
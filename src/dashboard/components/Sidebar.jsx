import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ links }) => {
  const linkBase = "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors";
  const linkIdle = "text-gray-600 hover:bg-gray-200";
  const linkActive = "bg-indigo-100 text-indigo-700";

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:block">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        <nav className="mt-6 space-y-2">
          {links.map((link, index) => {
            const Icon = link.icon; // <— icône optionnelle
            return (
              <NavLink
                key={index}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
              >
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
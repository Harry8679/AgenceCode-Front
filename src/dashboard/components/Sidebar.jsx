import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Styles par profil.
 * Tu peux ajuster les couleurs/gradients comme tu veux.
 */
const PROFILE_STYLES = {
  STUDENT: {
    wrapper: "bg-gradient-to-b from-sky-50 via-white to-white",
    border: "border-sky-100",
    title: "text-sky-800",
    idle: "text-sky-700/80 hover:bg-sky-50",
    active: "bg-sky-100 text-sky-800",
    badge: "bg-sky-100 text-sky-700",
  },
  PARENT: {
    wrapper: "bg-gradient-to-b from-emerald-50 via-white to-white",
    border: "border-emerald-100",
    title: "text-emerald-800",
    idle: "text-emerald-700/80 hover:bg-emerald-50",
    active: "bg-emerald-100 text-emerald-800",
    badge: "bg-emerald-100 text-emerald-700",
  },
  TEACHER: {
    wrapper: "bg-gradient-to-b from-amber-50 via-white to-white",
    border: "border-amber-100",
    title: "text-amber-800",
    idle: "text-amber-700/80 hover:bg-amber-50",
    active: "bg-amber-100 text-amber-800",
    badge: "bg-amber-100 text-amber-700",
  },
  DEFAULT: {
    wrapper: "bg-white",
    border: "border-gray-200",
    title: "text-gray-800",
    idle: "text-gray-600 hover:bg-gray-100",
    active: "bg-indigo-100 text-indigo-700",
    badge: "bg-gray-100 text-gray-700",
  },
};

function normalizeProfile(profile) {
  // Le back peut renvoyer "STUDENT" ou { value: "STUDENT" }
  if (!profile) return "DEFAULT";
  if (typeof profile === "string") return profile.toUpperCase();
  if (typeof profile === "object" && profile.value) return String(profile.value).toUpperCase();
  return "DEFAULT";
}

const Sidebar = ({ links = [], profile }) => {
  const p = normalizeProfile(profile);
  const theme = PROFILE_STYLES[p] || PROFILE_STYLES.DEFAULT;

  const linkBase =
    "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors";
  const linkIdle = theme.idle;
  const linkActive = theme.active;

  return (
    <aside
      className={`hidden w-64 flex-shrink-0 md:block ${theme.wrapper} border-r ${theme.border}`}
    >
      <div className="p-4">
        {/* En-tête : titre + badge profil */}
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-semibold ${theme.title}`}>Menu</h2>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${theme.badge}`}>
            {p === "DEFAULT" ? "Invité" : p}
          </span>
        </div>

        <nav className="mt-6 space-y-2">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={index}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkIdle}`
                }
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
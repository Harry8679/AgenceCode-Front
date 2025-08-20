import { useState } from "react";
import { Link, NavLink } from 'react-router-dom';

const cn = (...a) => {
    return a.filter(Boolean).join('');
}

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkBase = "block px-3 py-2 rounded-lg text-sm font-medium transition";
  const linkIdle = "text-gray-600 hover:text-gray-900 hover:bg-gray-100";
  const linkActive = "text-indigo-700 bg-indigo-50";

  const navItems = [
    { to: '/', label: 'Accueil' },
  ]

  return (
    <h1>Test</h1>
  )
}
export default Navbar;
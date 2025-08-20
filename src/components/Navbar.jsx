import { useState } from "react";
import { Link, NavLink } from 'react-router-dom';

const cn = (...a) => {
    return a.filter(Boolean).join('');
}

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkBase = "block px-3 py-2 rounded-lg text-sm font-medium transition";

  return (
    <h1>Test</h1>
  )
}
export default Navbar;
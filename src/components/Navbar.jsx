import { useState } from "react";
import { Link, NavLink } from 'react-router-dom';

const cn = (...a) => {
    return a.filter(Boolean).join('');
}

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkBase = "block px-3 py-2 rounded-lg text-sm font-medium transition";
  const linkIdle = "text-gray-600 hover:text-gray-900 hover:bg-gray-100";
  const linkActive = "text-indigo-700 bg-indigo-200";

  const navItems = [
    { to: '/', label: 'Accueil' },
    { to: '/cours-particuliers', label: 'Cours particuliers' },
    { to: '/donner-des-cours', label: 'Donner des cours' },
    { to: '/stage-intensifs', label: 'Stage Intensifs' },
  ]

  return (
    <header className='sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100'>
        <div className='mx-auto max-w-6xl px-4'>
            <div className='flex h-16 items-center justify-between'>
                {/* Logo */}
                <Link to='/' className='inline-flex items-center gap-2'>
                    <div className='h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center font-bold'>
                        AC
                    </div>
                    <span className='text-lg font-semibold text-gray-900'>Agence Code</span>
                </Link>

                {/* Ddesktop nav */}
                <nav className='hidden md:flex items-center gap-2'>
                    {navItems.map((item) => (
                        <NavLink key={item.to} to={item.to} className={({ isActive }) => cn(linkBase, isActive ? linkActive : linkIdle)}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Actions */}
                <div className='hidden md:flex items-center gap-2'>
                    <Link to='/connexion' className='px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50'>
                        Se connecter
                    </Link>
                    <Link to='/inscription' className='px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700'>
                        Créer un compte
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}
export default Navbar;
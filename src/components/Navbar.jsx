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
            </div>
        </div>
    </header>
  )
}
export default Navbar;
import { Link } from "react-router-dom";

function ExtIcon({ name, className = "h-5 w-5" }) {
  // Petites icônes inline (magazine, LinkedIn, Facebook, Instagram)
  switch (name) {
    case "mag":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M4 5h12a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V5zm14 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6v-2h12V7zM6 9h8v2H6V9zm0 4h8v2H6v-2z" />
        </svg>
      );
    case "in":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.06c.62-1.17 2.15-2.4 4.43-2.4C21.4 7.8 24 10 24 14.26V24h-5v-8.61c0-2.05-.73-3.45-2.55-3.45-1.39 0-2.22.94-2.58 1.85-.13.32-.16.77-.16 1.22V24H7.5V8z" />
        </svg>
      );
    case "fb":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5 3.66 9.14 8.44 9.93v-7.02H7.9V12.1h2.54V9.93c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.86h2.78l-.44 2.88h-2.34V22c4.78-.79 8.44-4.93 8.44-9.93z" />
        </svg>
      );
    case "ig":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM18 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  return (
    <footer className="mt-16">
      {/* Pré-footer (optionnel) */}

      {/* Bloc principal */}
      <div className="bg-slate-800 text-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-12">
            {/* Logo + colonne 1 */}
            <div className="md:col-span-3">
              {/* Logo “façon carré jaune” */}
              {/* <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-md bg-[#FFD335] text-xl font-extrabold text-slate-900"> */}
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-md bg-indigo-600 text-xl font-extrabold text-white">
                AC
              </div>

              <div className="space-y-3 text-sm">
                <p className="text-slate-300">
                  Accompagnement scolaire sur mesure : cours particuliers, stages intensifs, et suivi
                  personnalisé.
                </p>
              </div>
            </div>

            {/* À propos / Nos solutions */}
            <div className="md:col-span-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                À propos
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/qui-sommes-nous" className="hover:text-white">Qui sommes-nous ?</Link></li>
                <li><Link to="/agences" className="hover:text-white">Nos agences</Link></li>
                <li><Link to="/aide" className="hover:text-white">Centre d’aide</Link></li>
              </ul>

              <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Nos solutions
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/cours-particuliers" className="hover:text-white">Cours Particuliers</Link></li>
                <li><Link to="/stages-intensifs" className="hover:text-white">Stages Intensifs</Link></li>
                <li><Link to="/cours-musique" className="hover:text-white">Cours de Musique</Link></li>
              </ul>
            </div>

            {/* Nous rejoindre / Professionnels */}
            <div className="md:col-span-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Nous rejoindre
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/donner-des-cours" className="hover:text-white">Donner des cours</Link></li>
                <li><Link to="/recrutement" className="hover:text-white">Recrutement</Link></li>
              </ul>

              <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Professionnels
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/franchise" className="hover:text-white">Devenir Franchisé</Link></li>
                <li><Link to="/partenaires" className="hover:text-white">Partenaires</Link></li>
              </ul>
            </div>

            {/* Nous suivre + Boutons */}
            <div className="md:col-span-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Nous suivre
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ExtIcon name="mag" />
                  <Link to="/magazine" className="hover:text-white">Magazine</Link>
                </li>
                <li className="flex items-center gap-2">
                  <ExtIcon name="in" />
                  <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ExtIcon name="fb" />
                  <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">
                    Facebook
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ExtIcon name="ig" />
                  <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
                    Instagram
                  </a>
                </li>
              </ul>

              {/* Boutons à droite */}
              <div className="mt-6 space-y-3">
                <Link
                  to="/newsletter"
                  className="block rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-900 shadow hover:bg-slate-100"
                >
                  S’abonner à la newsletter
                </Link>
                <Link
                  to="/tarifs"
                  className="block rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-900 shadow hover:bg-slate-100"
                >
                  Tarifs & conditions
                </Link>
                <a
                  href="#"
                  className="block rounded-full border border-white/60 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10"
                >
                  Cours de Musique ↗
                </a>
              </div>
            </div>
          </div>

          {/* Bandeau bas */}
          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
            {/* gauche : copyright + trustpilot-like */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
              <p className="text-xs text-slate-400">
                © {new Date().getFullYear()} Acadex — Soutien scolaire
              </p>

              {/* badge “Trustpilot” style */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300">Excellent</span>
                <div className="flex items-center gap-1 rounded bg-emerald-500 px-1.5 py-0.5 text-white">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <a href="#" className="text-xs underline underline-offset-2 hover:text-white">
                  3 609 avis sur Trustpilot
                </a>
              </div>
            </div>

            {/* droite : liens légaux */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-300">
              <Link to="/donnees-personnelles" className="hover:text-white">Données personnelles</Link>
              <Link to="/cookies" className="hover:text-white">Cookies</Link>
              <Link to="/mentions-legales" className="hover:text-white">Mentions légales</Link>
              <Link to="/cgs" className="hover:text-white">CGS</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
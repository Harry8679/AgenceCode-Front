import { useEffect, useRef } from "react";

/** Données (6 items) */
const ITEMS = [
  { quote: "Super expérience ! Ma fille a repris confiance en maths en 1 mois.", name: "Sophie, Paris", rating: 5 },
  { quote: "Prof pédagogue et disponible. Progrès rapides.",                  name: "Rachid, Lyon",   rating: 5 },
  { quote: "Plateforme simple et efficace. Top prof d’info trouvé.",          name: "Camille, Lille", rating: 4 },
  { quote: "Organisation nickel, suivi sérieux, je recommande.",              name: "Nadia, Bordeaux",rating: 5 },
  { quote: "Cours sur-mesure et horaires flexibles, parfait.",                name: "Thomas, Nantes", rating: 4 },
  { quote: "Très satisfaite du prof de physique-chimie.",                      name: "Inès, Marseille",rating: 5 },
];

const INTERVAL_MS = 2500; // 1 seconde

const getVisible = () =>
  window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

/** Petite étoile SVG */
function Star({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${filled ? "text-amber-400" : "text-slate-300"}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function StarRating({ rating = 5 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < rating} />
      ))}
    </div>
  );
}

/** Initiales à partir du nom */
function initials(name = "") {
  const parts = name.split(",")[0]?.trim().split(" ").filter(Boolean) || [];
  const first = parts[0]?.[0] || "";
  const last = parts[1]?.[0] || "";
  return (first + last).toUpperCase() || "∗";
}

export default function TestimonialsCarousel() {
  const railRef = useRef(null);
  const timerRef = useRef(null);

  const stop = () => timerRef.current && clearInterval(timerRef.current);

  const start = () => {
    stop();
    timerRef.current = setInterval(() => {
      const el = railRef.current;
      if (!el) return;
      const visible = getVisible();
      const step = el.clientWidth / visible; // largeur d'une carte approx
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "auto" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, INTERVAL_MS);
  };

  useEffect(() => {
    start();
    window.addEventListener("resize", start);
    return () => {
      stop();
      window.removeEventListener("resize", start);
    };
  }, []);

  return (
    <div className="relative" onMouseEnter={stop} onMouseLeave={start}>
      {/* piste */}
      <div
        ref={railRef}
        className="flex gap-6 overflow-hidden scroll-smooth snap-x snap-mandatory"
        aria-live="polite"
      >
        {ITEMS.map((t, i) => (
          <figure
            key={i}
            className="relative shrink-0 basis-full snap-start md:basis-1/2 lg:basis-1/3"
          >
            {/* Carte */}
            <div className="relative h-full rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm transition hover:shadow-2xl">
              {/* halos déco */}
              <div aria-hidden className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-indigo-300/30 blur-2xl" />
              <div aria-hidden className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-emerald-300/30 blur-2xl" />
              {/* grosse guillemet */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="absolute -right-2 -top-2 h-12 w-12 text-indigo-200/60"
                fill="currentColor"
              >
                <path d="M7.17 6.17A5.5 5.5 0 0 0 2 11.67 4.33 4.33 0 0 0 6.33 16c2.38 0 4.22-1.83 4.22-4.22a4.22 4.22 0 0 0-4.22-4.22Zm10 0A5.5 5.5 0 0 0 12 11.67 4.33 4.33 0 0 0 16.33 16c2.38 0 4.22-1.83 4.22-4.22a4.22 4.22 0 0 0-4.22-4.22Z" />
              </svg>

              {/* header : avatar + rating + nom */}
              <div className="flex items-center gap-3">
                {/* avatar avec anneau dégradé */}
                <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 p-[2px]">
                  <div className="grid h-full w-full place-items-center rounded-full bg-white text-sm font-semibold text-slate-700">
                    {initials(t.name)}
                  </div>
                </div>

                <div className="min-w-0">
                  <StarRating rating={t.rating} />
                  <figcaption className="mt-1 truncate text-sm font-medium text-slate-700">
                    {t.name}
                  </figcaption>
                </div>
              </div>

              {/* quote */}
              <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-800">
                “{t.quote}”
              </blockquote>

              {/* base accent */}
              <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" />
            </div>
          </figure>
        ))}
      </div>

      {/* ombres latérales pour “fade” */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-white/0" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-white/0" />
    </div>
  );
}
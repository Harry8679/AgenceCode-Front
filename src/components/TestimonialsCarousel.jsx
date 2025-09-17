import { useEffect, useRef } from "react";

const ITEMS = [
  { quote: "Super expérience ! Ma fille a repris confiance en maths en 1 mois.", name: "Sophie, Paris" },
  { quote: "Prof pédagogue et disponible. Progrès rapides.", name: "Rachid, Lyon" },
  { quote: "Plateforme simple et efficace. Top prof d’info trouvé.", name: "Camille, Lille" },
  { quote: "Organisation nickel, suivi sérieux, je recommande.", name: "Nadia, Bordeaux" },
  { quote: "Cours sur-mesure et horaires flexibles, parfait.", name: "Thomas, Nantes" },
  { quote: "Très satisfaite du prof de physique-chimie.", name: "Inès, Marseille" },
];

const INTERVAL_MS = 1000; // 1 seconde
const getVisible = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);

export default function TestimonialsCarousel() {
  const wrapRef = useRef(null);
  const timerRef = useRef(null);

  const start = () => {
    stop(); // reset
    timerRef.current = setInterval(() => {
      const el = wrapRef.current;
      if (!el) return;
      const visible = getVisible();
      const step = el.clientWidth / visible; // largeur d’une carte approx.
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

      if (atEnd) {
        // retour au début (sans animation pour éviter l'effet "rebond")
        el.scrollTo({ left: 0, behavior: "auto" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, INTERVAL_MS);
  };

  const stop = () => timerRef.current && clearInterval(timerRef.current);

  useEffect(() => {
    start();
    window.addEventListener("resize", start);
    return () => {
      stop();
      window.removeEventListener("resize", start);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      {/* piste */}
      <div
        ref={wrapRef}
        className="flex gap-6 overflow-hidden scroll-smooth snap-x snap-mandatory"
        aria-live="polite"
      >
        {ITEMS.map((t, i) => (
          <figure
            key={i}
            className="shrink-0 basis-full md:basis-1/2 lg:basis-1/3 snap-start rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <blockquote className="text-slate-800">“{t.quote}”</blockquote>
            <figcaption className="mt-3 text-sm text-slate-500">— {t.name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
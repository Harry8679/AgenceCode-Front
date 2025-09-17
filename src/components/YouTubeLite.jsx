import { useState } from "react";

/** Player YouTube ultra léger : affiche la miniature, charge l'iframe au clic */
export default function YouTubeLite({ id, title }) {
  const [play, setPlay] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-video">
        {play ? (
          <iframe
            title={title}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <>
            <img
              src={thumb}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            {/* bouton play */}
            <button
              onClick={() => setPlay(true)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 font-semibold text-slate-900 shadow-lg ring-1 ring-black/10 hover:bg-white"
              aria-label={`Lire la vidéo : ${title}`}
            >
              ▶ Lire
            </button>
            {/* titre */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="truncate text-sm font-semibold text-white drop-shadow">
                {title}
              </h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
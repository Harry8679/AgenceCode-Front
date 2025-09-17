import { useRef } from "react";
import YouTubeLite from "./YouTubeLite";

export default function TeacherVideosCarousel({ videos = [] }) {
  const railRef = useRef(null);

  const stepBy = (dir) => {
    const el = railRef.current;
    if (!el) return;
    const visible = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const step = el.clientWidth / visible;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Cours en vidéo</h2>
          <p className="mt-1 text-slate-600">Un aperçu des méthodes de nos professeurs.</p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            onClick={() => stepBy(-1)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
          >
            ◀
          </button>
          <button
            onClick={() => stepBy(1)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="relative mt-6">
        {/* Flèches mobiles au-dessus */}
        <div className="md:hidden mb-3 flex justify-end gap-2">
          <button
            onClick={() => stepBy(-1)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium"
          >
            ◀
          </button>
          <button
            onClick={() => stepBy(1)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium"
          >
            ▶
          </button>
        </div>

        <div
          ref={railRef}
          className="flex gap-6 overflow-hidden scroll-smooth snap-x snap-mandatory"
        >
          {videos.map((v) => (
            <div
              key={v.id}
              className="shrink-0 basis-full snap-start md:basis-1/2 lg:basis-1/3"
            >
              <YouTubeLite id={v.id} title={v.title} />
            </div>
          ))}
        </div>

        {/* fondu latéral */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-white/0" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-white/0" />
      </div>
    </section>
  );
}
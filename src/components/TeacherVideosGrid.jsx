import YouTubeLite from "./YouTubeLite";

export default function TeacherVideosGrid({ videos = [] }) {
  // On n’en montre que 3 ici
  const items = videos.slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Cours en vidéo</h2>
          <p className="mt-1 text-slate-600">Découvrez nos enseignants en action.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((v) => (
          <YouTubeLite key={v.id} id={v.id} title={v.title} />
        ))}
      </div>
    </section>
  );
}
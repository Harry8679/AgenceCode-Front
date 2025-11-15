import React, { useMemo, useState } from "react";

const demo = [
  { id: 1, name: "Lina Martin",   level: "Terminale",   subject: "Maths",    next: "Aujourd'hui 16:30" },
  { id: 2, name: "Adam Cohen",    level: "Première",    subject: "Physique", next: "Demain 10:00" },
  { id: 3, name: "Kenza Rahmani", level: "Seconde",     subject: "SVT",      next: "Vendredi 18:15" },
  { id: 4, name: "Paul Dubois",   level: "3ème",        subject: "Français", next: "Lundi 17:00" },
];

const Row = ({ s }) => (
  <tr className="border-b last:border-none">
    <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
    <td className="px-4 py-3 text-gray-600">{s.level}</td>
    <td className="px-4 py-3 text-gray-600">{s.subject}</td>
    <td className="px-4 py-3">
      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
        {s.next}
      </span>
    </td>
    <td className="px-4 py-3 text-right">
      <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50">
        Voir
      </button>
    </td>
  </tr>
);

const Students = () => {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return demo;
    return demo.filter(
      (s) =>
        s.name.toLowerCase().includes(t) ||
        s.level.toLowerCase().includes(t) ||
        s.subject.toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes élèves</h1>
          <p className="text-gray-600">Gérez votre liste d’élèves et vos prochains cours.</p>
        </div>
        <div className="w-full max-w-xs">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un élève…"
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Niveau</th>
              <th className="px-4 py-3 font-medium">Matière</th>
              <th className="px-4 py-3 font-medium">Prochain cours</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="text-sm">
            {filtered.map((s) => <Row key={s.id} s={s} />)}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Aucun résultat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;

import React from "react";

const rows = [
  { id: 1, date: "10/10 • 17:00", subject: "Maths", teacher: "M. Bernard", status: "Planifié" },
  { id: 2, date: "12/10 • 18:30", subject: "Anglais", teacher: "Mme Roy",  status: "Planifié" },
];

const Courses = () => {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes cours</h1>
          <p className="text-gray-600">Historique et prochains cours.</p>
        </div>
        <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700">
          + Réserver un cours
        </button>
      </header>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Quand</th>
              <th className="px-4 py-3 font-medium">Matière</th>
              <th className="px-4 py-3 font-medium">Professeur</th>
              <th className="px-4 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((r) => (
              <tr key={r.id} className="border-b last:border-none">
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3">{r.subject}</td>
                <td className="px-4 py-3">{r.teacher}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700">
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
import React from "react";

const teachers = [
  { id: 1, name: "M. Bernard", subject: "Maths", rating: "4.9/5" },
  { id: 2, name: "Mme Roy",    subject: "Anglais", rating: "4.7/5" },
];

const Teachers = () => (
  <div className="space-y-6">
    <header>
      <h1 className="text-2xl font-bold text-gray-900">Mes professeurs</h1>
      <p className="text-gray-600">Voir les profs associés à tes cours.</p>
    </header>

    <div className="grid gap-4 md:grid-cols-2">
      {teachers.map((t) => (
        <div key={t.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{t.name}</h3>
              <p className="text-sm text-gray-600">{t.subject}</p>
            </div>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">{t.rating}</span>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">Contacter</button>
            <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700">Réserver</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Teachers;
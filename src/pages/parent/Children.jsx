import React, { useState } from "react";

const Children = () => {
  const [kids, setKids] = useState([
    { id: 1, firstName: "Lina",  lastName: "Martin", level: "Terminale",  subjects: ["Maths", "Physique"] },
    { id: 2, firstName: "Adam",  lastName: "Martin", level: "Seconde",    subjects: ["Anglais"] },
  ]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes enfants</h1>
          <p className="text-gray-600">Gérez le profil et les matières suivies.</p>
        </div>
        <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700">
          + Ajouter un enfant
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {kids.map((c) => (
          <div key={c.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{c.firstName} {c.lastName}</h3>
                <p className="text-sm text-gray-600">Niveau : {c.level}</p>
              </div>
              <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
                Modifier
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.subjects.map((s, i) => (
                <span key={i} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Children;
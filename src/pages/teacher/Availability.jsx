import React from "react";

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const sample = {
  Lun: ["16:00–18:00"],
  Mar: ["10:00–12:00", "14:00–15:00"],
  Ven: ["18:00–20:00"],
};

const Chip = ({ children }) => (
  <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
    {children}
  </span>
);

const Availability = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes disponibilités</h1>
          <p className="text-gray-600">Indiquez vos créneaux pour permettre la réservation.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
            + Ajouter un créneau
          </button>
          <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            Publier
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-3">
        {days.map((d) => (
          <div key={d} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="mb-2 text-sm font-semibold text-gray-700">{d}</p>
            <div className="flex flex-col gap-2">
              {(sample[d] || []).map((t, i) => <Chip key={i}>{t}</Chip>)}
              {(sample[d] || []).length === 0 && <p className="text-xs text-gray-400">—</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Availability;
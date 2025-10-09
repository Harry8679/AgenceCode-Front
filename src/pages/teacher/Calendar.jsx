import React from "react";

const events = [
  { day: "Lun", time: "16:30", title: "Lina — Maths (Tle)" },
  { day: "Mar", time: "10:00", title: "Adam — Physique (1ère)" },
  { day: "Ven", time: "18:15", title: "Kenza — SVT (2nde)" },
];

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const Calendar = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendrier</h1>
          <p className="text-gray-600">Votre semaine en un coup d’œil.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50">
            Semaine
          </button>
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50">
            Mois
          </button>
          <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            + Nouveau cours
          </button>
        </div>
      </header>

      {/* Semaine simple */}
      <div className="grid grid-cols-7 gap-3">
        {days.map((d) => (
          <div key={d} className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
            <p className="mb-2 text-sm font-semibold text-gray-700">{d}</p>
            <div className="space-y-2">
              {events
                .filter((e) => e.day === d)
                .map((e, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs"
                  >
                    <p className="font-semibold text-indigo-800">{e.time}</p>
                    <p className="text-indigo-700">{e.title}</p>
                  </div>
                ))}
              {events.filter((e) => e.day === d).length === 0 && (
                <p className="text-xs text-gray-400">—</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
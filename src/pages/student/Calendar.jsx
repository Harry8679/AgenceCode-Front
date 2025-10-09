import React from "react";
const days = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
const events = [{ day:"Mer", time:"17:00", title:"Maths — M. Bernard" }];

const Calendar = () => (
  <div className="space-y-6">
    <header>
      <h1 className="text-2xl font-bold text-gray-900">Calendrier</h1>
      <p className="text-gray-600">Tes créneaux de la semaine.</p>
    </header>
    <div className="grid grid-cols-7 gap-3">
      {days.map((d) => (
        <div key={d} className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-700">{d}</p>
          <div className="space-y-2">
            {events.filter(e=>e.day===d).map((e,i)=>(
              <div key={i} className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs">
                <p className="font-semibold text-indigo-800">{e.time}</p>
                <p className="text-indigo-700">{e.title}</p>
              </div>
            ))}
            {events.filter(e=>e.day===d).length===0 && <p className="text-xs text-gray-400">—</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Calendar;
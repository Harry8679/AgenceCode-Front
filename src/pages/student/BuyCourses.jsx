import React, { useState } from "react";

const packs = [
  { id: 1, title: "Pack 5h",  price: 170, best: false },
  { id: 2, title: "Pack 10h", price: 330, best: true },
  { id: 3, title: "Pack 20h", price: 640, best: false },
];

const BuyCourses = () => {
  const [selected, setSelected] = useState(2);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Acheter des cours</h1>
        <p className="text-gray-600">Choisis un pack d’heures. Tu recevras un coupon (ID) à utiliser.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {packs.map((p) => (
          <label key={p.id} className={`cursor-pointer rounded-2xl border p-5 shadow-sm bg-white
             ${selected === p.id ? "border-indigo-400 ring-2 ring-indigo-200" : "border-gray-200"}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">{p.title}</p>
                <p className="mt-1 text-gray-600">{p.price} €</p>
              </div>
              {p.best && <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">Meilleur choix</span>}
            </div>
            <input
              type="radio"
              className="mt-4"
              name="pack"
              checked={selected === p.id}
              onChange={() => setSelected(p.id)}
            />
          </label>
        ))}
      </div>

      <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700">
        Payer et recevoir mon coupon
      </button>
    </div>
  );
};

export default BuyCourses;
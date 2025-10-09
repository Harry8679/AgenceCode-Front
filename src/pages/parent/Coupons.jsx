import React, { useState } from "react";

const Coupons = () => {
  const [list] = useState([
    { id: "C-9FD28", child: "Lina Martin",   hours: 6, status: "Actif" },
    { id: "C-41B02", child: "Adam Martin",   hours: 3, status: "Partiel" },
  ]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes coupons</h1>
          <p className="text-gray-600">Les coupons sont des tickets d’heures à donner au professeur.</p>
        </div>
        <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700">
          + Demander un coupon
        </button>
      </header>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">ID (hash)</th>
              <th className="px-4 py-3 font-medium">Élève</th>
              <th className="px-4 py-3 font-medium">Heures restantes</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
        <tbody className="text-sm">
          {list.map((c) => (
            <tr key={c.id} className="border-b last:border-none">
              <td className="px-4 py-3 font-mono text-gray-900">{c.id}</td>
              <td className="px-4 py-3">{c.child}</td>
              <td className="px-4 py-3">{c.hours} h</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  c.status === "Actif" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>{c.status}</span>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
                  Détails
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
        Donnez l’ID du coupon au professeur pour valider chaque cours.
      </div>
    </div>
  );
};

export default Coupons;
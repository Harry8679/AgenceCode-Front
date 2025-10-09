import React from "react";

const coupons = [
  { id: "C-9FD28", hours: 3, status: "Actif" },
  { id: "C-41B02", hours: 0, status: "Épuisé" },
];

const Coupons = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Mes coupons</h1>
        <p className="text-gray-600">Donne l’ID à ton professeur à chaque cours.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {coupons.map((c) => (
          <div key={c.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="font-mono text-lg font-semibold text-gray-900">{c.id}</p>
            <p className="mt-1 text-gray-600">Heures restantes : {c.hours} h</p>
            <span className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
              c.status === "Actif" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
            }`}>{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;
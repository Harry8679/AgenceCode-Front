import React, { useState } from "react";

const FamilySettings = () => {
  const [form, setForm] = useState({
    parentName: "A. Martin",
    phone: "06 00 00 00 00",
    address: "10 rue des Ecoles, 75000 Paris",
    billingEmail: "factures@famille-martin.fr",
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres famille</h1>
        <p className="text-gray-600">Coordonnées, adresse et facturation.</p>
      </header>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Responsable</label>
            <input
              value={form.parentName}
              onChange={(e) => setForm({ ...form, parentName: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Adresse</label>
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email de facturation</label>
          <input
            type="email"
            value={form.billingEmail}
            onChange={(e) => setForm({ ...form, billingEmail: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700">
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default FamilySettings;
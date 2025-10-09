import React from "react";

const rows = [
  { id: 1, date: "05/10", label: "Pack 10h (Lina)",   amount: "350 €", status: "Payé" },
  { id: 2, date: "28/09", label: "Pack 5h (Adam)",    amount: "170 €", status: "Payé" },
];

const Payments = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Paiements</h1>
        <p className="text-gray-600">Historique des achats et factures.</p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Intitulé</th>
              <th className="px-4 py-3 font-medium">Montant</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((r) => (
              <tr key={r.id} className="border-b last:border-none">
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3">{r.label}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">{r.amount}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
                    Facture
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
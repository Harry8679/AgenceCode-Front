import React from "react";

const Stat = ({ title, value, sub }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
  </div>
);

const rows = [
  { id: 1, date: "08/10", student: "Lina M.", course: "Maths", amount: "70 €", status: "Payé" },
  { id: 2, date: "06/10", student: "Adam C.", course: "Physique", amount: "64 €", status: "En attente" },
  { id: 3, date: "02/10", student: "Kenza R.", course: "SVT", amount: "60 €", status: "Payé" },
];

const Badge = ({ children, type }) => {
  const cls = type === "Payé"
    ? "bg-green-100 text-green-700"
    : "bg-amber-100 text-amber-700";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>{children}</span>;
};

const Payments = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Mes paiements</h1>
        <p className="text-gray-600">Suivez vos revenus et vos virements.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat title="Revenus du mois" value="194 €" sub="+24 € vs mois dernier" />
        <Stat title="Prochain virement" value="15/10" sub="Versement automatique" />
        <Stat title="Total perçu" value="1 820 €" sub="Depuis inscription" />
      </section>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Élève</th>
              <th className="px-4 py-3 font-medium">Cours</th>
              <th className="px-4 py-3 font-medium">Montant</th>
              <th className="px-4 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((r) => (
              <tr key={r.id} className="border-b last:border-none">
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3">{r.student}</td>
                <td className="px-4 py-3">{r.course}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{r.amount}</td>
                <td className="px-4 py-3"><Badge type={r.status}>{r.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
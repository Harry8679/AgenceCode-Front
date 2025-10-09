import React from "react";

const Stat = ({ title, value, sub }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
  </div>
);

const Row = ({ child, subject, teacher, next }) => (
  <tr className="border-b last:border-none">
    <td className="px-4 py-3 font-medium text-gray-900">{child}</td>
    <td className="px-4 py-3">{subject}</td>
    <td className="px-4 py-3">{teacher}</td>
    <td className="px-4 py-3">
      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
        {next}
      </span>
    </td>
  </tr>
);

const Overview = () => {
  const upcoming = [
    { child: "Lina", subject: "Maths (Tle)", teacher: "M. Bernard", next: "Aujourd’hui 17:00" },
    { child: "Adam", subject: "Anglais (2nde)", teacher: "Mme Roy", next: "Demain 18:30" },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h1>
        <p className="text-gray-600">Suivi global de la famille et des cours.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat title="Enfants inscrits" value="2" sub="Dernier ajout : 02/10" />
        <Stat title="Cours cette semaine" value="5" sub="+1 vs semaine dernière" />
        <Stat title="Heures restantes (coupons)" value="9 h" sub="Lot #C-9FD28" />
        <Stat title="Dépenses du mois" value="210 €" sub="+30 € vs mois dernier" />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-700">Prochains cours</h2>
        </div>
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Enfant</th>
              <th className="px-4 py-3 font-medium">Matière</th>
              <th className="px-4 py-3 font-medium">Professeur</th>
              <th className="px-4 py-3 font-medium">Quand</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {upcoming.map((u, i) => <Row key={i} {...u} />)}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Overview;
import React from "react";

const offers = [
  { id: 1, title: "Maths – Terminale", level: "Tle", rate: "35 €/h", status: "Active" },
  { id: 2, title: "Physique – Première", level: "1ère", rate: "32 €/h", status: "Brouillon" },
  { id: 3, title: "SVT – Seconde", level: "2nde", rate: "30 €/h", status: "Active" },
];

const Badge = ({ children, variant = "default" }) => {
  const map = {
    default: "bg-gray-100 text-gray-700",
    active: "bg-green-100 text-green-700",
    draft: "bg-amber-100 text-amber-700",
  };
  const cls = variant === "active" ? map.active : variant === "draft" ? map.draft : map.default;
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>{children}</span>;
};

const Card = ({ o }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="font-semibold text-gray-900">{o.title}</h3>
        <p className="text-sm text-gray-600">Niveau : {o.level}</p>
      </div>
      <Badge variant={o.status === "Active" ? "active" : "draft"}>{o.status}</Badge>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <p className="text-gray-900 font-semibold">{o.rate}</p>
      <div className="flex gap-2">
        <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">Modifier</button>
        <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700">Publier</button>
      </div>
    </div>
  </div>
);

const CourseOffers = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes offres de cours</h1>
          <p className="text-gray-600">Créez, modifiez et publiez vos offres visibles par les familles.</p>
        </div>
        <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700">
          + Nouvelle offre
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((o) => <Card key={o.id} o={o} />)}
      </div>
    </div>
  );
};

export default CourseOffers;
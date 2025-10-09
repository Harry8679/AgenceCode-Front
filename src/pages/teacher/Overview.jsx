import React from "react";

const StatCard = ({ title, value, sub }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
  </div>
);

const UpcomingItem = ({ time, student, subject }) => (
  <li className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
    <div>
      <p className="font-medium text-gray-900">{student}</p>
      <p className="text-sm text-gray-500">{subject}</p>
    </div>
    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
      {time}
    </span>
  </li>
);

const Overview = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h1>
        <p className="mt-1 text-gray-600">
          Synthèse rapide de votre activité sur les 7 derniers jours.
        </p>
      </header>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Heures enseignées" value="12 h" sub="+3 h vs sem. dernière" />
        <StatCard title="Élèves actifs" value="8" sub="2 nouveaux ce mois-ci" />
        <StatCard title="Prochain cours" value="16:30" sub="Aujourd'hui — Mathématiques" />
        <StatCard title="Note moyenne" value="4.9/5" sub="18 avis" />
      </section>

      {/* Deux colonnes */}
      <section className="grid gap-6 lg:grid-cols-5">
        {/* Prochains cours */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Prochains cours</h2>
          <ul className="space-y-3">
            <UpcomingItem time="Aujourd'hui • 16:30" student="Lina M." subject="Maths — Terminale" />
            <UpcomingItem time="Demain • 10:00" student="Adam C." subject="Physique — 1ère" />
            <UpcomingItem time="Vendredi • 18:15" student="Kenza R." subject="SVT — 2nde" />
          </ul>
        </div>

        {/* Raccourcis */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Actions rapides</h2>
          <div className="grid gap-3">
            <button className="rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white shadow hover:bg-indigo-700">
              Créer un créneau
            </button>
            <button className="rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
              Ajouter un élève
            </button>
            <button className="rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
              Envoyer un message
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
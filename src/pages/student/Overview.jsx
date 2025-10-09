import React from "react";

const Overview = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h1>
        <p className="text-gray-600">Bienvenue ! Voici un aperçu de tes cours et coupons.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Cours à venir</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">2</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Heures restantes</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">3 h</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Professeurs</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">2</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Dernier paiement</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">35 €</p>
        </div>
      </div>

      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
        Astuce : tu peux acheter des heures depuis <b>Acheter des cours</b> et partager l’ID de ton coupon avec ton professeur.
      </div>
    </div>
  );
};

export default Overview;
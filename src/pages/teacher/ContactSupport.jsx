import React, { useState } from "react";

const ContactSupport = () => {
  const [form, setForm] = useState({ subject: "", message: "" });

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Nous contacter</h1>
        <p className="text-gray-600">Une question ? Écris-nous, on te répond vite !</p>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sujet</label>
            <input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Ex. Problème de paiement"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Décris ton besoin…"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700">
            Envoyer
          </button>
        </div>
      </div>

      <aside className="lg:col-span-2 space-y-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-900">Assistance</h2>
          <p className="mt-2 text-sm text-gray-600">
            Lundi–Vendredi, 9h–18h. Réponse sous 24h ouvrées.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <p><span className="font-medium">Email :</span> support@agencecode.fr</p>
            <p><span className="font-medium">Téléphone :</span> 01 23 45 67 89</p>
            <p><span className="font-medium">Centre d’aide :</span> /aide</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ContactSupport;
import React, { useState } from "react";

const Requests = () => {
  const [form, setForm] = useState({ child: "", subject: "", hours: 2, comment: "" });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Demandes</h1>
        <p className="text-gray-600">Faites une demande de professeur ou de coupon.</p>
      </header>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Enfant</label>
            <input
              value={form.child}
              onChange={(e) => setForm({ ...form, child: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Matière</label>
            <input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Heures de coupon souhaitées</label>
            <input
              type="number"
              min={1}
              value={form.hours}
              onChange={(e) => setForm({ ...form, hours: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Commentaire</label>
          <textarea
            rows={4}
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="flex gap-2">
          <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700">
            Demander un professeur
          </button>
          <button className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50">
            Demander un coupon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Requests;
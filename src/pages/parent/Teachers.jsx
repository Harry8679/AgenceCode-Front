// src/pages/parent/Teachers.jsx
import React, { useEffect, useState } from "react";
import { apiFetch, parseCollection } from "../../lib/api";

export default function Teachers() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        // 👉 endpoint que nous avons défini côté API
        const res = await apiFetch("/api/my/teachers?pagination=false");
        // Si ton provider renvoie une collection Hydra:
        const rows = parseCollection(res);
        setTeachers(rows);
      } catch (e) {
        setErr(e.message || "Impossible de charger les professeurs");
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Professeurs</h1>
          <p className="text-gray-600">Gérez les professeurs rattachés à vos enfants.</p>
        </div>
        <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700">
          + Demander un professeur
        </button>
      </header>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">Chargement…</div>
      ) : err ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 shadow-sm">{err}</div>
      ) : teachers.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-gray-600 shadow-sm">
          Aucun professeur associé pour l’instant.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {teachers.map((t) => {
            // On normalise 2-3 champs pour l’affichage
            const fullName = [t.firstName, t.lastName].filter(Boolean).join(" ") || "Professeur";
            const subjectsLabel =
              Array.isArray(t.subjects) && t.subjects.length
                ? t.subjects.map((s) => s.name ?? s).join(", ")
                : t.subject ?? "—";
            const kidsLabel =
              Array.isArray(t.children) && t.children.length
                ? t.children.map((c) => `${c.firstName} ${c.lastName}`.trim()).join(", ")
                : (t.kids?.join(", ") || "—");
            const rating = t.rating ?? t.note ?? "—";

            return (
              <div key={t.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{fullName}</h3>
                    <p className="text-sm text-gray-600">
                      {subjectsLabel} — Enfants : {kidsLabel}
                    </p>
                    {/* Optionnels si exposés par l’API */}
                    {t.email && <p className="text-sm text-gray-600 mt-1">Email : {t.email}</p>}
                    {t.phoneNumber && <p className="text-sm text-gray-600">Tél. : {t.phoneNumber}</p>}
                  </div>
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                    {rating}
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
                    Contacter
                  </button>
                  <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700">
                    Planifier
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
import React, { useEffect, useMemo, useState } from "react";
import { apiFetch, parseCollection } from "../../lib/api";

// Petites helpers ----------------------------------------------
const iriToId = (iri) => {
  if (!iri) return null;
  const p = String(iri).split("/");
  const last = p[p.length - 1];
  const n = Number(last);
  return Number.isNaN(n) ? null : n;
};

const shortCode = (code) =>
  code ? `C-${code.slice(0, 2)}${code.slice(-3)}`.toUpperCase() : "—";

const statusFromRemaining = (remaining, duration) => {
  if (remaining <= 0) return { label: "Épuisé", cls: "bg-rose-100 text-rose-700" };
  if (remaining >= duration) return { label: "Actif", cls: "bg-green-100 text-green-700" };
  return { label: "Partiel", cls: "bg-amber-100 text-amber-700" };
};

const hours = (minutes) => `${Math.max(0, Math.round(minutes / 60))} h`;
// ---------------------------------------------------------------

export default function Coupons() {
  const [loading, setLoading] = useState(true);
  const [err, setErr]       = useState("");
  const [coupons, setCoupons] = useState([]);
  const [children, setChildren] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // charge tout au montage
  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setErr("");
        const [cRes, kidsRes, subRes] = await Promise.all([
          apiFetch("/api/coupons?pagination=false"),
          apiFetch("/api/children?pagination=false"),
          apiFetch("/api/subjects?pagination=false"),
        ]);
        setCoupons(parseCollection(cRes));
        setChildren(parseCollection(kidsRes));
        setSubjects(parseCollection(subRes));
      } catch (e) {
        setErr(e.message || "Impossible de charger les coupons");
        setCoupons([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // index pour résoudre IRI -> nom
  const childById = useMemo(() => {
    const map = new Map();
    for (const k of children) map.set(k.id, k);
    return map;
  }, [children]);

  const subjectById = useMemo(() => {
    const map = new Map();
    for (const s of subjects) map.set(s.id, s);
    return map;
  }, [subjects]);

  // normalise chaque coupon avec childId/subjectId + libellés
  const normalized = useMemo(() => {
    return coupons.map((c) => {
      const childId = c.child?.id ?? iriToId(c.child);
      const subjectId = c.subject?.id ?? iriToId(c.subject);
      const kid = childById.get(childId);
      const subj = subjectById.get(subjectId);
      return {
        id: c.id,
        code: c.code,
        childId,
        childName: kid ? `${kid.firstName} ${kid.lastName}` : `Élève #${childId ?? "?"}`,
        subjectName: subj?.name ?? c.subject?.name ?? "—",
        durationMinutes: c.durationMinutes ?? c.duration ?? 0,
        remainingMinutes: c.remainingMinutes ?? 0,
      };
    });
  }, [coupons, childById, subjectById]);

  // groupé par élève
  const groups = useMemo(() => {
    const g = new Map();
    for (const c of normalized) {
      if (!g.has(c.childId)) g.set(c.childId, { childId: c.childId, childName: c.childName, rows: [] });
      g.get(c.childId).rows.push(c);
    }
    // tri par nom d’élève
    return [...g.values()].sort((a, b) => a.childName.localeCompare(b.childName));
  }, [normalized]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes coupons</h1>
          <p className="text-gray-600">Les coupons sont des tickets d’heures à donner au professeur.</p>
        </div>
        <button
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          onClick={() => alert("Ouvrir le formulaire d’achat (à brancher)")}
        >
          + Demander un coupon
        </button>
      </header>

      {loading ? (
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">Chargement…</div>
      ) : err ? (
        <div className="p-6 text-red-700 border border-red-200 shadow-sm rounded-xl bg-red-50">{err}</div>
      ) : groups.length === 0 ? (
        <div className="p-6 text-gray-600 bg-white border border-gray-200 shadow-sm rounded-xl">
          Aucun coupon pour l’instant.
        </div>
      ) : (
        groups.map((g) => (
          <section key={g.childId} className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">{g.childName}</h2>

            <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
              <table className="min-w-full text-left">
                <thead className="text-sm text-gray-600 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium">ID (hash)</th>
                    <th className="px-4 py-3 font-medium">Matière</th>
                    <th className="px-4 py-3 font-medium">Heures restantes</th>
                    <th className="px-4 py-3 font-medium">Statut</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {g.rows
                    .sort((a, b) => (b.remainingMinutes - a.remainingMinutes))
                    .map((c) => {
                      const st = statusFromRemaining(c.remainingMinutes, c.durationMinutes);
                      return (
                        <tr key={c.id} className="border-b last:border-none">
                          <td className="px-4 py-3 font-mono text-gray-900">{shortCode(c.code)}</td>
                          <td className="px-4 py-3">{c.subjectName}</td>
                          <td className="px-4 py-3">{hours(c.remainingMinutes)}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${st.cls}`}>
                              {st.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
                              onClick={() => alert(`Détails coupon #${c.id}`)}
                            >
                              Détails
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </section>
        ))
      )}

      <div className="p-4 text-sm text-indigo-900 border border-indigo-200 rounded-xl bg-indigo-50">
        Donnez l’ID du coupon au professeur pour valider chaque cours.
      </div>
    </div>
  );
}
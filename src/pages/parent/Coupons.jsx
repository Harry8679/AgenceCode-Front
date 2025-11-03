// src/pages/parent/Coupons.jsx
import React, { useEffect, useMemo, useState } from "react";
import { apiFetch, parseCollection } from "../../lib/api";

// ---------- helpers ----------
const iriToId = (iri) => {
  if (!iri) return null;
  const bits = String(iri).split("/");
  const last = bits[bits.length - 1];
  const id = Number(last);
  return Number.isNaN(id) ? null : id;
};

// Code court pour l’affichage en tableau
const shortCode = (code) =>
  code ? `C-${code.slice(0, 2)}${code.slice(-3)}`.toUpperCase() : "—";

const statusFromRemaining = (remaining, duration) => {
  const r = remaining ?? 0;
  const d = duration ?? 0;
  if (r <= 0) return { label: "Épuisé", cls: "bg-rose-100 text-rose-700" };
  if (r >= d) return { label: "Actif", cls: "bg-green-100 text-green-700" };
  return { label: "Partiel", cls: "bg-amber-100 text-amber-700" };
};

const minutesToHoursLabel = (min) =>
  `${Math.max(0, Math.round((min ?? 0) / 60))} h`;
// -----------------------------

// ---------- Modal de détails ----------
function CouponDetailModal({ coupon, onClose }) {
  if (!coupon) return null;

  const st = statusFromRemaining(
    coupon.remainingMinutes,
    coupon.durationMinutes
  );

  const purchasedLabel = coupon.purchasedAt
    ? new Date(coupon.purchasedAt).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const parentPrice =
    coupon.unitPriceParentCents != null
      ? `${(coupon.unitPriceParentCents / 100).toFixed(2)} €`
      : "—";

  const teacherPrice =
    coupon.unitPriceTeacherCents != null
      ? `${(coupon.unitPriceTeacherCents / 100).toFixed(2)} €`
      : "—";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Coupon {shortCode(coupon.code)}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-sm text-gray-800">
          {/* 👉 Code complet */}
          <div className="flex justify-between">
            <span className="font-medium">Code complet :</span>
            <span className="font-mono break-all">{coupon.code}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Élève :</span>
            <span>{coupon.childName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Matière :</span>
            <span>{coupon.subjectName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Niveau :</span>
            <span>{coupon.classLevel}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Durée du coupon :</span>
            <span>{minutesToHoursLabel(coupon.durationMinutes)}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Temps restant :</span>
            <span>{minutesToHoursLabel(coupon.remainingMinutes)}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Statut :</span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${st.cls}`}
            >
              {st.label}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Date d’achat :</span>
            <span>{purchasedLabel}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between">
            <span className="font-medium">Prix payé par le parent :</span>
            <span>{parentPrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Tarif prof (par coupon) :</span>
            <span>{teacherPrice}</span>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
// --------------------------------------

export default function Coupons() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [children, setChildren] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState(null); // coupon sélectionné pour la modale

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const [cRes, kidsRes, subRes] = await Promise.all([
          apiFetch("/api/coupons?pagination=false"),
          apiFetch("/api/children?pagination=false"),
          apiFetch("/api/subjects?pagination=false"),
        ]);
        setCoupons(parseCollection(cRes));
        setChildren(parseCollection(kidsRes));
        setSubjects(parseCollection(subRes));
      } catch (e) {
        console.error("[Coupons] load error:", e);
        setErr(e.message || "Impossible de charger les coupons");
        setCoupons([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // index enfants / matières
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

  // normalisation des coupons
  const rows = useMemo(() => {
    return coupons.map((c) => {
      // enfant
      let childId = null;
      let childName = "Élève ?";
      if (c.child && typeof c.child === "object") {
        childId = c.child.id ?? iriToId(c.child["@id"]);
        childName =
          [c.child.firstName, c.child.lastName].filter(Boolean).join(" ") ||
          childName;
      } else {
        childId = iriToId(c.child);
        const kid = childById.get(childId);
        if (kid)
          childName =
            `${kid.firstName ?? ""} ${kid.lastName ?? ""}`.trim() || childName;
      }

      // matière
      let subjectName = "—";
      if (c.subject && typeof c.subject === "object") {
        subjectName = c.subject.name ?? subjectName;
      } else {
        const sid = iriToId(c.subject);
        const subj = subjectById.get(sid);
        if (subj) subjectName = subj.name ?? subjectName;
      }

      return {
        id: c.id,
        code: c.code,
        childId,
        childName,
        subjectName,
        classLevel: c.classLevel ?? "—",
        durationMinutes: c.durationMinutes ?? c.duration ?? 0,
        remainingMinutes: c.remainingMinutes ?? 0,
        purchasedAt: c.purchasedAt ?? null,
        unitPriceParentCents: c.unitPriceParentCents ?? null,
        unitPriceTeacherCents: c.unitPriceTeacherCents ?? null,
      };
    });
  }, [coupons, childById, subjectById]);

  // groupement par élève
  const groups = useMemo(() => {
    const byKid = new Map();
    for (const r of rows) {
      if (!byKid.has(r.childId)) {
        byKid.set(r.childId, { childId: r.childId, childName: r.childName, items: [] });
      }
      byKid.get(r.childId).items.push(r);
    }
    return [...byKid.values()].sort((a, b) =>
      a.childName.localeCompare(b.childName)
    );
  }, [rows]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes coupons</h1>
          <p className="text-gray-600">
            Les coupons sont des tickets d’heures à donner au professeur.
          </p>
        </div>
        <button
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          onClick={() => alert("Ouvrir le formulaire d’achat (à intégrer)")}
        >
          + Demander un coupon
        </button>
      </header>

      {loading ? (
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          Chargement…
        </div>
      ) : err ? (
        <div className="p-6 text-red-700 border border-red-200 shadow-sm rounded-xl bg-red-50">
          {err}
        </div>
      ) : groups.length === 0 ? (
        <div className="p-6 text-gray-600 bg-white border border-gray-200 shadow-sm rounded-xl">
          Aucun coupon pour l’instant.
        </div>
      ) : (
        groups.map((g) => (
          <section key={g.childId ?? `kid-${g.childName}`} className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">{g.childName}</h2>

            <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
              <table className="min-w-full text-left">
                <thead className="text-sm text-gray-600 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-medium">ID (hash)</th>
                    <th className="px-4 py-3 font-medium">Matière</th>
                    <th className="px-4 py-3 font-medium">Niveau</th>
                    <th className="px-4 py-3 font-medium">Heures restantes</th>
                    <th className="px-4 py-3 font-medium">Statut</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {g.items
                    .sort((a, b) => b.remainingMinutes - a.remainingMinutes)
                    .map((c) => {
                      const st = statusFromRemaining(
                        c.remainingMinutes,
                        c.durationMinutes
                      );
                      return (
                        <tr key={c.id} className="border-b last:border-none">
                          <td className="px-4 py-3 font-mono text-gray-900">
                            {shortCode(c.code)}
                          </td>
                          <td className="px-4 py-3">{c.subjectName}</td>
                          <td className="px-4 py-3">{c.classLevel}</td>
                          <td className="px-4 py-3">
                            {minutesToHoursLabel(c.remainingMinutes)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-medium ${st.cls}`}
                            >
                              {st.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
                              onClick={() => setSelected(c)}
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

      {/* Popup de détails */}
      {selected && (
        <CouponDetailModal
          coupon={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
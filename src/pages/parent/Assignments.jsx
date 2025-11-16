// src/pages/parent/Teachers.jsx
import React, { useEffect, useMemo, useState } from "react";
import { apiFetch, parseCollection } from "../../lib/api";
import {
  getParentAssignments,
  createAssignmentRequest,
  cancelAssignment,
  ASSIGNMENT_STATUS,
} from "../../lib/assignments";
import AssignmentCard from "../../components/AssignmentCard";

// Petit header de section identique à l’Overview (barre grise)
const SectionHeader = ({ title }) => (
  <div className="px-4 py-3 border-b bg-gray-50">
    <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
  </div>
);

// Carte conteneur (arrondi + bordure + ombre), même style que les blocs de l’Overview
const Card = ({ header, children }) => (
  <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    {header ? <SectionHeader title={header} /> : null}
    <div className="p-4">{children}</div>
  </section>
);

export default function ParentTeachers() {
  const [loading, setLoading]   = useState(true);
  const [err, setErr]           = useState("");
  const [items, setItems]       = useState([]);     // assignments
  const [children, setChildren] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm]         = useState({ childId: "", subjectId: "" });

  // ---------- data ----------
  const load = async () => {
    setErr(""); setLoading(true);
    try {
      const [aRes, cRes, sRes] = await Promise.all([
        getParentAssignments(),                            // /api/assignments?scope=parent
        apiFetch("/api/children?pagination=false"),
        apiFetch("/api/subjects?pagination=false"),
      ]);
      setItems(parseCollection(aRes));
      setChildren(parseCollection(cRes));
      setSubjects(parseCollection(sRes));
    } catch (e) {
      setErr(e.message || "Impossible de charger les données");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  // groupement par élève (pour un rendu en sections)
  const groups = useMemo(() => {
    const g = new Map();
    for (const a of items) {
      const kidId = a.child?.id ?? "unknown";
      if (!g.has(kidId)) g.set(kidId, []);
      g.get(kidId).push(a);
    }
    // tri : nom élève si dispo
    return [...g.entries()].sort(([, A], [, B]) => {
      const an = A[0]?.child ? `${A[0].child.firstName} ${A[0].child.lastName}` : "";
      const bn = B[0]?.child ? `${B[0].child.firstName} ${B[0].child.lastName}` : "";
      return an.localeCompare(bn);
    });
  }, [items]);

  // ---------- actions ----------
  const onCreate = async (e) => {
    e.preventDefault();
    if (!form.childId || !form.subjectId) return;
    try {
      await createAssignmentRequest({
        child:   Number(form.childId),     // accepte ID ou IRI
        subject: Number(form.subjectId),
        message: null,
      });
      setForm({ childId: "", subjectId: "" });
      await load();
    } catch (e) {
      alert(e.message || "Échec de la création");
    }
  };

  const onCancel = async (a) => {
    if (!window.confirm("Annuler cette demande ?")) return;
    await cancelAssignment(a.id);
    await load();
  };

  // ---------- UI ----------
  return (
    <div className="space-y-8">
      {/* Titre page (même gabarit que l’Overview) */}
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Professeurs</h1>
        <p className="text-gray-600">Gérez les demandes d’affectation prof ↔ élève.</p>
      </header>

      {/* Carte : Nouvelle demande */}
      <Card header="Nouvelle demande">
        <form
          onSubmit={onCreate}
          className="flex flex-wrap items-end gap-3"
        >
          <div>
            <label className="block text-sm text-gray-700 mb-1">Élève</label>
            <select
              className="rounded-lg border-gray-300"
              value={form.childId}
              onChange={(e) => setForm((f) => ({ ...f, childId: e.target.value }))}
            >
              <option value="">—</option>
              {children.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Matière</label>
            <select
              className="rounded-lg border-gray-300"
              value={form.subjectId}
              onChange={(e) => setForm((f) => ({ ...f, subjectId: e.target.value }))}
            >
              <option value="">—</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
            type="submit"
          >
            + Demander un professeur
          </button>
        </form>
      </Card>

      {/* États réseau en cartes pour rester cohérent */}
      {loading && (
        <Card>
          <div className="text-gray-700">Chargement…</div>
        </Card>
      )}

      {err && (
        <Card>
          <div className="text-red-700">{err}</div>
        </Card>
      )}

      {!loading && !err && items.length === 0 && (
        <Card>
          <div className="text-gray-600">Aucun professeur associé pour l’instant.</div>
        </Card>
      )}

      {/* Groupes d’assignments par élève, chaque groupe dans une carte */}
      {!loading && !err && items.length > 0 && (
        <>
          {groups.map(([kidId, rows]) => {
            const title = rows[0]?.child
              ? `${rows[0].child.firstName} ${rows[0].child.lastName}`
              : "Élève";
            return (
              <Card key={kidId} header={title}>
                <div className="grid gap-3 md:grid-cols-2">
                  {rows.map((a) => (
                    <AssignmentCard
                      key={a.id}
                      a={a}
                      onCancel={
                        [ASSIGNMENT_STATUS.REQUESTED, ASSIGNMENT_STATUS.PROPOSED, ASSIGNMENT_STATUS.APPLIED]
                          .includes(a.status)
                          ? onCancel
                          : null
                      }
                    />
                  ))}
                </div>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
}
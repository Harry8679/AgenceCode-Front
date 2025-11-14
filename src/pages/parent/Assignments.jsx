import React, { useEffect, useMemo, useState } from "react";
import { parseCollection, apiFetch } from "../../lib/api";
import {
  getParentAssignments, createAssignmentRequest, cancelAssignment
} from "../../lib/assignments";
import AssignmentCard from "../../components/AssignmentCard";

export default function ParentAssignments() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [items, setItems] = useState([]);
  const [children, setChildren] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ childId: "", subjectId: "" });

  const load = async () => {
    setErr(""); setLoading(true);
    try {
      const [aRes, cRes, sRes] = await Promise.all([
        getParentAssignments(),
        apiFetch("/api/children?pagination=false"),
        apiFetch("/api/subjects?pagination=false"),
      ]);
      setItems(parseCollection(aRes));
      setChildren(parseCollection(cRes));
      setSubjects(parseCollection(sRes));
    } catch (e) {
      setErr(e.message || "Impossible de charger les demandes");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const grouped = useMemo(() => {
    const g = new Map();
    for (const a of items) {
      const childId = a.child?.id;
      const key = childId ?? "unknown";
      if (!g.has(key)) g.set(key, []);
      g.get(key).push(a);
    }
    return [...g.entries()];
  }, [items]);

  const onCreate = async (e) => {
    e.preventDefault();
    if (!form.childId || !form.subjectId) return;
    try {
      await createAssignmentRequest({ childId: form.childId, subjectId: form.subjectId });
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

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Professeurs</h1>
          <p className="text-gray-600">Gérez les demandes d’affectation prof ↔ élève.</p>
        </div>
      </header>

      {/* mini-form de demande parent */}
      <form onSubmit={onCreate} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Élève</label>
          <select className="rounded-lg border-gray-300" value={form.childId}
                  onChange={(e)=>setForm(f=>({...f, childId: Number(e.target.value)}))}>
            <option value="">—</option>
            {children.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Matière</label>
          <select className="rounded-lg border-gray-300" value={form.subjectId}
                  onChange={(e)=>setForm(f=>({...f, subjectId: Number(e.target.value)}))}>
            <option value="">—</option>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">
          + Demander un professeur
        </button>
      </form>

      {loading ? (
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">Chargement…</div>
      ) : err ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">{err}</div>
      ) : items.length === 0 ? (
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">Aucun professeur associé pour l’instant.</div>
      ) : (
        grouped.map(([kidId, rows]) => (
          <section key={kidId} className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {rows[0]?.child ? `${rows[0].child.firstName} ${rows[0].child.lastName}` : "Élève"}
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {rows.map(a => (
                <AssignmentCard key={a.id} a={a} onCancel={["REQUESTED","PROPOSED","APPLIED"].includes(a.status) ? onCancel : null} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
// src/pages/parent/Teachers.jsx
import React, { useEffect, useMemo, useState } from "react";
import { apiFetch, parseCollection } from "../../lib/api";
import {
  getParentAssignments,
  createAssignmentRequest,
  cancelAssignment,
  ASSIGNMENT_STATUS,
} from "../../lib/assignments";

/* ---------- UI helpers (mêmes styles que Overview) ---------- */
const SectionHeader = ({ title }) => (
  <div className="px-4 py-3 border-b bg-gray-50">
    <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
  </div>
);

const Card = ({ header, children }) => (
  <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    {header ? <SectionHeader title={header} /> : null}
    <div className="p-4">{children}</div>
  </section>
);

const Badge = ({ children, tone = "gray" }) => {
  const tones = {
    gray:   "bg-gray-100 text-gray-700",
    indigo: "bg-indigo-50 text-indigo-700",
    green:  "bg-green-100 text-green-700",
    amber:  "bg-amber-100 text-amber-700",
    rose:   "bg-rose-100 text-rose-700",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${tones[tone] || tones.gray}`}>
      {children}
    </span>
  );
};

function statusTone(status) {
  switch (status) {
    case ASSIGNMENT_STATUS.ACCEPTED: return "green";
    case ASSIGNMENT_STATUS.APPLIED:
    case ASSIGNMENT_STATUS.PROPOSED:
    case ASSIGNMENT_STATUS.REQUESTED: return "indigo";
    case ASSIGNMENT_STATUS.DECLINED: return "rose";
    case ASSIGNMENT_STATUS.CANCELLED: return "gray";
    default: return "gray";
  }
}

/* ============================================================ */

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

  // tri (plus récent d’abord)
  const rows = useMemo(() => {
    return [...items].sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });
  }, [items]);

  // ---------- actions ----------
  const onCreate = async (e) => {
    e.preventDefault();
    if (!form.childId || !form.subjectId) return;
    try {
      await createAssignmentRequest({
        child:   Number(form.childId),
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
        <form onSubmit={onCreate} className="flex flex-wrap items-end gap-3">
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

      {/* États réseau en cartes */}
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

      {/* Liste des demandes AU FORMAT TABLE (comme “Prochains cours”) */}
      {!loading && !err && (
        <Card header="Demandes & affectations">
          {rows.length === 0 ? (
            <div className="text-gray-600">Aucun professeur associé pour l’instant.</div>
          ) : (
            <div className="-mx-4 -mb-4 overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50 text-sm text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Élève</th>
                    <th className="px-4 py-3 font-medium">Matière</th>
                    <th className="px-4 py-3 font-medium">Professeur</th>
                    <th className="px-4 py-3 font-medium">Statut</th>
                    <th className="px-4 py-3 font-medium">Créé le</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {rows.map((a) => {
                    const child = a.child
                      ? `${a.child.firstName ?? ""} ${a.child.lastName ?? ""}`.trim()
                      : "—";
                    const subject = a.subject?.name ?? "—";
                    const teacher = a.teacher
                      ? `${a.teacher.firstName ?? ""} ${a.teacher.lastName ?? ""}`.trim()
                      : "—";
                    const created = a.createdAt
                      ? new Date(a.createdAt).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—";
                    const canCancel = [
                      ASSIGNMENT_STATUS.REQUESTED,
                      ASSIGNMENT_STATUS.APPLIED,
                      ASSIGNMENT_STATUS.PROPOSED,
                    ].includes(a.status);

                    return (
                      <tr key={a.id} className="border-b last:border-none">
                        <td className="px-4 py-3 font-medium text-gray-900">{child || "Élève"}</td>
                        <td className="px-4 py-3">{subject}</td>
                        <td className="px-4 py-3">{teacher || "—"}</td>
                        <td className="px-4 py-3">
                          <Badge tone={statusTone(a.status)}>{a.status}</Badge>
                        </td>
                        <td className="px-4 py-3">{created}</td>
                        <td className="px-4 py-3 text-right">
                          {canCancel ? (
                            <button
                              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
                              onClick={() => onCancel(a)}
                            >
                              Annuler
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
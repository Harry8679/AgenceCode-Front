import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../lib/api";
import ChildForm from "./ChildForm";

const hydrateChild = (raw) => ({
  // API Platform returns Hydra JSON-LD
  id: raw.id,
  iri: raw["@id"],
  firstName: raw.firstName,
  lastName: raw.lastName,
  classLevel: raw.classLevel,
  subjects: Array.isArray(raw.subjects) ? raw.subjects : [],
  // createdAt / updatedAt if needed: raw.createdAt, raw.updatedAt
});

export default function Children() {
  const { user } = useAuth();
  const token = user?.token || localStorage.getItem("token");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // modal state
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null); // child object for edit

  const refresh = async () => {
    setLoading(true); setErr("");
    try {
      const data = await apiFetch("/api/children", { token });
      const list = (data["hydra:member"] || []).map(hydrateChild);
      setItems(list);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, []);

  const onCreate = () => { setEditing(null); setOpenForm(true); };
  const onEdit   = (c) => { setEditing(c); setOpenForm(true); };

  const onDelete = async (c) => {
    if (!window.confirm(`Supprimer ${c.firstName} ${c.lastName} ?`)) return;
    try {
      await apiFetch(`/api/children/${c.id}`, { method: "DELETE", token });
      setItems(items => items.filter(x => x.id !== c.id));
    } catch (e) {
      alert(e.message);
    }
  };

  // For rendering subject names we’ll show their ids (short) or just count.
  // If you want names, you can GET /api/subjects?ids[]=... and map by iri.

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes enfants</h1>
          <p className="text-gray-600">Gérez le profil et les matières suivies.</p>
        </div>
        <button
          onClick={onCreate}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
        >
          + Ajouter un enfant
        </button>
      </header>

      {err && (
        <div className="px-3 py-2 text-sm text-red-700 rounded-lg bg-red-50">{err}</div>
      )}

      {loading ? (
        <div className="text-gray-600">Chargement…</div>
      ) : items.length === 0 ? (
        <div className="p-8 text-center text-gray-600 border border-gray-300 border-dashed rounded-xl">
          Aucun enfant pour l’instant.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((c) => (
            <div key={c.id} className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {c.firstName} {c.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">Niveau : {c.classLevel}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(c)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onDelete(c)}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {(c.subjects || []).map((iri, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                    title={iri}
                  >
                    {iri.split("/").pop() ? `Sujet #${iri.split("/").pop()}` : "Sujet"}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <ChildForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        initial={editing}
        onSaved={refresh}
      />
    </div>
  );
}
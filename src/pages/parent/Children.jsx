import React, { useEffect, useMemo, useState } from "react";
import { apiFetch, parseCollection, getToken, decodeJwt } from "../../lib/api";

const ClassLevelLabels = {
  "6e": "6e", "5e": "5e", "4e": "4e", "3e": "3e",
  "2nde": "Seconde", "1ère": "Première", "Terminale": "Terminale",
  "Bac+1": "Bac+1", "Bac+2": "Bac+2", "Bac+3": "Bac+3", "Bac+4": "Bac+4", "Bac+5": "Bac+5",
};

export default function Children() {
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [kids, setKids]         = useState([]);
  const [subjects, setSubjects] = useState([]);
  const token = getToken();
  const tokenInfo = useMemo(() => decodeJwt(token), [token]); // debug: qui est connecté ?

  // ---------- LOAD LIST (children + subjects) ----------
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [childrenRes, subjectsRes] = await Promise.all([
        apiFetch("/api/children"),
        apiFetch("/api/subjects?pagination=false"),
      ]);
      setKids(parseCollection(childrenRes));
      setSubjects(parseCollection(subjectsRes));
    } catch (e) {
      setError(e.message || "Erreur de chargement");
      console.error("[Children] load error:", e);
      setKids([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []); // au montage

  // ---------- CREATE ----------
  const handleCreate = async () => {
    // Mini formulaire rapide (remplace par ton modal)
    const firstName = prompt("Prénom ?");
    if (!firstName) return;
    const lastName  = prompt("Nom ?");
    if (!lastName) return;

    // choix rapide de niveau
    const classLevel = prompt(`Niveau ? (ex: 2nde, 1ère, Terminale)`);
    if (!classLevel) return;

    // sélection simple de 1 matière (prend la 1ère si dispo)
    const firstSubjectIri = subjects[0] ? `/api/subjects/${subjects[0].id}` : null;

    const payload = {
      firstName,
      lastName,
      classLevel,                 // doit être une valeur EXACTE de l’enum (ex: "2nde", "1ère", "Terminale")
      subjects: firstSubjectIri ? [firstSubjectIri] : [],
    };

    try {
      await apiFetch("/api/children", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await load();
    } catch (e) {
      alert(`Création échouée: ${e.message}`);
      console.error("[Children] create error:", e);
    }
  };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet enfant ?")) return;
    try {
      await apiFetch(`/api/children/${id}`, { method: "DELETE" });
      setKids((k) => k.filter((x) => x.id !== id));
    } catch (e) {
      alert(`Suppression échouée: ${e.message}`);
      console.error("[Children] delete error:", e);
    }
  };

  // ---------- UPDATE (mini) ----------
  const handleEdit = async (kid) => {
    const firstName = prompt("Prénom ?", kid.firstName);
    if (!firstName) return;
    const lastName  = prompt("Nom ?", kid.lastName);
    if (!lastName) return;

    // NOTE: PATCH = merge-patch+json
    try {
      await apiFetch(`/api/children/${kid.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/merge-patch+json" },
        body: JSON.stringify({ firstName, lastName }),
      });
      await load();
    } catch (e) {
      alert(`Mise à jour échouée: ${e.message}`);
      console.error("[Children] patch error:", e);
    }
  };

  // ---------- RENDER ----------
  return (
    <div className="space-y-6">
      {/* bloc DEBUG : qui est connecté ? (retire-le en prod) */}
      <div className="p-3 text-xs border rounded-lg border-amber-200 bg-amber-50 text-amber-800">
        <div><strong>Debug Auth</strong></div>
        <div>Token présent ? {token ? "oui" : "non"}</div>
        {tokenInfo && (
          <>
            <div>email (JWT): {tokenInfo.username || tokenInfo.email || "?"}</div>
            <div>roles: {(tokenInfo.roles || []).join(", ")}</div>
          </>
        )}
      </div>

      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes enfants</h1>
          <p className="text-gray-600">Gérez le profil et les matières suivies.</p>
        </div>
        <button
          onClick={handleCreate}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
        >
          + Ajouter un enfant
        </button>
      </header>

      {loading ? (
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">Chargement…</div>
      ) : error ? (
        <div className="p-6 text-red-700 border border-red-200 shadow-sm rounded-xl bg-red-50">
          {error}
        </div>
      ) : kids.length === 0 ? (
        <div className="p-6 text-gray-600 bg-white border border-gray-200 shadow-sm rounded-xl">
          Aucun enfant pour l’instant.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {kids.map((c) => (
            <div key={c.id} className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {c.firstName} {c.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Niveau : {ClassLevelLabels[c.classLevel] || c.classLevel}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {(c.subjects || []).map((s) => (
                  <span key={s.id || s["@id"] || s} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                    {s.name || s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
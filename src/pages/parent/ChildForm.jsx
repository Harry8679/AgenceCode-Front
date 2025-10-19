import React, { useMemo, useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";

/** Les valeurs doivent matcher l'enum PHP exactement */
const CLASS_LEVELS = [
  "6e","5e","4e","3e","2nde","1ère","Terminale",
  "Bac+1","Bac+2","Bac+3","Bac+4","Bac+5",
];

export default function ChildForm({
  open,
  onClose,
  onSaved,
  initial = null,          // si non-null => édition
  subjects = [],           // liste [{id, name, ...}] fournie par le parent
}) {
  const isEdit = !!initial?.id;

  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [classLevel,setClassLevel]= useState("");
  const [subjectIds,setSubjectIds]= useState([]); // ids sélectionnés

  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState("");

  // Pré-remplir le formulaire quand on ouvre en édition
  useEffect(() => {
    if (!open) return;

    if (isEdit) {
      setFirstName(initial.firstName || "");
      setLastName(initial.lastName || "");
      setClassLevel(initial.classLevel || "");

      // initial.subjects peuvent être objets normalisés par la page
      const ids = (initial.subjects || []).map(s =>
        typeof s === "string" ? Number(s.split("/").pop()) : s.id
      );
      setSubjectIds(ids);
    } else {
      setFirstName(""); setLastName(""); setClassLevel(""); setSubjectIds([]);
    }
    setError("");
    setSaving(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isEdit, initial]);

  // Convertit ids -> IRIs pour API Platform
  const subjectsIris = useMemo(
    () => subjects
      .filter(s => subjectIds.includes(s.id))
      .map(s => s["@id"] || `/api/subjects/${s.id}`),
    [subjects, subjectIds]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      classLevel,
      subjects:  subjectsIris,
    };

    try {
      if (isEdit) {
        await apiFetch(`/api/children/${initial.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/merge-patch+json" },
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch("/api/children", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      onSaved?.();
      onClose?.();
    } catch (e) {
      setError(e.message || "Erreur d’enregistrement");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-xl p-6 bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {isEdit ? "Modifier l’enfant" : "Ajouter un enfant"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {error && (
          <div className="px-3 py-2 mb-4 text-sm text-red-700 rounded-lg bg-red-50">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                value={firstName}
                onChange={e=>setFirstName(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                value={lastName}
                onChange={e=>setLastName(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Niveau</label>
            <select
              value={classLevel}
              onChange={e=>setClassLevel(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200"
              required
            >
              <option value="">— Sélectionner —</option>
              {CLASS_LEVELS.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Matières</label>
            {subjects.length === 0 ? (
              <p className="mt-2 text-sm text-gray-500">
                Aucune matière disponible (créez-en côté admin).
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2">
                {subjects.map(s => {
                  const id   = s.id ?? Number(String(s["@id"]).split("/").pop());
                  const name = s.name;
                  const checked = subjectIds.includes(id);
                  return (
                    <label
                      key={id}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm ${
                        checked ? "border-indigo-400 bg-indigo-50 text-indigo-700" : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span>{name}</span>
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={checked}
                        onChange={()=>{
                          setSubjectIds(ids => ids.includes(id) ? ids.filter(x=>x!==id) : [...ids, id]);
                        }}
                      />
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Annuler
            </button>
            <button disabled={saving} className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60">
              {saving ? "Enregistrement..." : (isEdit ? "Mettre à jour" : "Créer")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
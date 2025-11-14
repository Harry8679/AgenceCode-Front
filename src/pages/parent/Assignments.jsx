// src/pages/parent/Assignments.jsx
import React, { useEffect, useState } from "react";
import AssignmentCard from "../../components/AssignmentCard";
import { getParentAssignments, requestTeacher } from "../../lib/assignments";
import { apiFetch, parseCollection } from "../../lib/api";

export default function ParentAssignments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setItems(await getParentAssignments()); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function onCreate() {
    // mini formulaire rapide
    const child  = prompt("IRI de l'élève (/api/children/{id}) :");
    const subject = prompt("IRI de la matière (/api/subjects/{id}) :");
    const message = prompt("Message (optionnel) :") || "";
    if (child && subject) {
      await requestTeacher({ childIri: child, subjectIri: subject, message });
      await load();
    }
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Mes demandes de professeurs</h1>
        <button onClick={onCreate}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          + Demander un professeur
        </button>
      </header>

      {loading ? "Chargement…" : items.length === 0 ? "Aucune demande" :
        items.map(a => (
          <AssignmentCard key={a.id} item={a} role="PARENT" onChange={load} />
        ))
      }
    </div>
  );
}
// src/pages/teacher/MyAssignments.jsx
import React, { useEffect, useState } from "react";
import AssignmentCard from "../../components/AssignmentCard";
import { getTeacherAssignments } from "../../lib/assignments";

export default function MyAssignments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setItems(await getTeacherAssignments()); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Mes affectations</h1>
      {loading ? "Chargement…" :
        items.length === 0 ? "Aucune affectation" :
        items.map(a => (
          <AssignmentCard key={a.id} item={a} role="TEACHER" onChange={load} />
        ))
      }
    </div>
  );
}
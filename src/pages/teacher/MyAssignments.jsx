import React, { useEffect, useState } from "react";
import { parseCollection } from "../../lib/api";
import { getTeacherAssignments, teacherAccept, teacherDecline } from "../../lib/assignments";
import AssignmentCard from "../../components/AssignmentCard";

export default function MyAssignments() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [items, setItems] = useState([]);

  const load = async () => {
    setLoading(true); setErr("");
    try {
      const res = await getTeacherAssignments();
      setItems(parseCollection(res));
    } catch (e) {
      setErr(e.message || "Impossible de charger");
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const onAccept = async (a) => { await teacherAccept(a.id); await load(); };
  const onDecline = async (a) => { await teacherDecline(a.id); await load(); };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Mes affectations</h1>

      {loading ? (
        <div className="p-6 bg-white rounded-xl border">Chargement…</div>
      ) : err ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">{err}</div>
      ) : items.length === 0 ? (
        <div className="p-6 bg-white rounded-xl border">Aucune demande pour l’instant.</div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {items.map(a => (
            <AssignmentCard
              key={a.id}
              a={a}
              onAccept={["PROPOSED","APPLIED"].includes(a.status) ? onAccept : null}
              onDecline={["PROPOSED","APPLIED"].includes(a.status) ? onDecline : null}
            />
          ))}
        </div>
      )}
    </div>
  );
}
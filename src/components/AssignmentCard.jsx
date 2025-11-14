// src/components/AssignmentCard.jsx
import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import {
  teacherApply, teacherAccept, teacherDecline,
  adminPropose, adminAssign,
} from "../lib/assignments";

export default function AssignmentCard({ item, role, onChange }) {
  const [busy, setBusy] = useState(false);

  const childName   = item.child?.fullName || item.childName || "Élève ?";
  const subjectName = item.subject?.name   || item.subjectName || "—";
  const teacherName = item.teacher?.fullName || "—";

  async function run(fn) {
    try { setBusy(true); await fn(); onChange?.(); }
    catch (e) { alert(e.message || "Erreur"); }
    finally { setBusy(false); }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-gray-900">{childName}</div>
          <div className="text-sm text-gray-600">{subjectName}</div>
          <div className="text-sm text-gray-600">Prof: {teacherName}</div>
        </div>
        <StatusBadge status={item.status} />
      </div>

      {/* Actions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {role === "TEACHER" && item.status === "REQUESTED" && (
          <button disabled={busy}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700"
            onClick={() => run(() => teacherApply(item.id))}
          >
            Candidater
          </button>
        )}

        {role === "TEACHER" && item.status === "PROPOSED" && (
          <>
            <button disabled={busy}
              className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
              onClick={() => run(() => teacherAccept(item.id))}
            >
              Accepter
            </button>
            <button disabled={busy}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
              onClick={() => run(() => teacherDecline(item.id))}
            >
              Refuser
            </button>
          </>
        )}

        {role === "ADMIN" && item.status === "REQUESTED" && (
          <>
            {/* Exemple simple : on affecte directement un IRI saisi ou sélectionné ailleurs */}
            <button disabled={busy}
              className="rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-amber-700"
              onClick={() => {
                const iri = prompt("IRI du professeur à proposer (/api/users/{id}) :");
                if (iri) run(() => adminPropose(item.id, iri));
              }}
            >
              Proposer un prof
            </button>

            <button disabled={busy}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700"
              onClick={() => {
                const iri = prompt("IRI du professeur à affecter (/api/users/{id}) :");
                if (iri) run(() => adminAssign(item.id, iri));
              }}
            >
              Affecter (direct)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
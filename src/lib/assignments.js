// src/lib/assignments.js
import { apiFetch, parseCollection } from "./api";

/** Statuts côté front (doivent matcher ton enum PHP) */
export const ASSIGNMENT_STATUS = {
  REQUESTED: "REQUESTED",
  APPLIED:   "APPLIED",
  PROPOSED:  "PROPOSED",
  ACCEPTED:  "ACCEPTED",
  DECLINED:  "DECLINED",
  CANCELLED: "CANCELLED",
};

/* ===========================
 * QUERIES (fetch lists)
 * =========================== */
export async function getParentAssignments() {
  const res = await apiFetch("/api/assignments?scope=parent&pagination=false");
  return parseCollection(res);
}

export async function getTeacherAssignments() {
  const res = await apiFetch("/api/assignments?scope=teacher&pagination=false");
  return parseCollection(res);
}

export async function getAllAssignmentsAdmin() {
  const res = await apiFetch("/api/assignments?scope=admin&pagination=false");
  return parseCollection(res);
}

/* ===========================
 * PARENT actions
 * =========================== */
/** ancien nom que ta page importe : createAssignmentRequest */
export async function createAssignmentRequest({ child, subject, message }) {
  // child et subject peuvent être des IDs (num) ou des IRIs "/api/children/1"
  return apiFetch("/api/assignments", {
    method: "POST",
    body: JSON.stringify({
      child,
      subject,
      message: message ?? null,
      status: ASSIGNMENT_STATUS.REQUESTED,
    }),
  });
}

/** annulation d’une demande (PATCH custom) */
export async function cancelAssignment(id) {
  // Si tu as un operation PATCH custom: /api/assignments/{id}/cancel
  // Sinon, garde le endpoint générique et passe le statut:
  const url = `/api/assignments/${id}/cancel`; // ou `/api/assignments/${id}`
  const body =
    url.endsWith("/cancel")
      ? {} // op. custom côté API ne demande pas forcément de body
      : { status: ASSIGNMENT_STATUS.CANCELLED };

  return apiFetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/merge-patch+json" },
    body: JSON.stringify(body),
  });
}

/* ===========================
 * TEACHER actions
 * =========================== */
export async function teacherApply(id, message) {
  return apiFetch(`/api/assignments/${id}/apply`, {
    method: "PATCH",
    headers: { "Content-Type": "application/merge-patch+json" },
    body: JSON.stringify({ message: message ?? null }),
  });
}

export async function teacherAccept(id) {
  return apiFetch(`/api/assignments/${id}/accept`, {
    method: "PATCH",
  });
}

export async function teacherDecline(id, reason) {
  return apiFetch(`/api/assignments/${id}/decline`, {
    method: "PATCH",
    headers: { "Content-Type": "application/merge-patch+json" },
    body: JSON.stringify({ reason: reason ?? null }),
  });
}

/* ===========================
 * ADMIN actions (optionnel)
 * =========================== */
export async function adminPropose(id, teacherId, message) {
  return apiFetch(`/api/assignments/${id}/propose`, {
    method: "PATCH",
    headers: { "Content-Type": "application/merge-patch+json" },
    body: JSON.stringify({ teacher: teacherId, message: message ?? null }),
  });
}

export async function adminAssign(id, teacherId) {
  return apiFetch(`/api/assignments/${id}/assign`, {
    method: "PATCH",
    headers: { "Content-Type": "application/merge-patch+json" },
    body: JSON.stringify({ teacher: teacherId }),
  });
}
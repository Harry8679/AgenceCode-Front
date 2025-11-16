// src/lib/assignments.js
import { apiFetch, parseCollection } from "./api";

/** Statuts (doivent matcher src/Enum/AssignmentStatus.php) */
export const ASSIGNMENT_STATUS = {
  REQUESTED: "REQUESTED",
  APPLIED:   "APPLIED",
  PROPOSED:  "PROPOSED",
  ACCEPTED:  "ACCEPTED",
  DECLINED:  "DECLINED",
  CANCELLED: "CANCELLED",
};

/* ---------------------------------------
 * Helpers pour transformer ID -> IRI
 * -------------------------------------*/
const iri = (val, base) => {
  if (!val) return null;
  if (typeof val === "string" && val.startsWith("/api/")) return val;
  if (typeof val === "number") return `/api/${base}/${val}`;
  // objet possiblement { "@id": "/api/..." } ou { id: 1 }
  if (val["@id"]) return val["@id"];
  if (val.id != null) return `/api/${base}/${val.id}`;
  return null;
};

const childIRI   = (v) => iri(v, "children");
const subjectIRI = (v) => iri(v, "subjects");
const userIRI    = (v) => iri(v, "users");

/* ======================================
 * QUERIES (listes)
 * ==================================== */

/** Liste des affectations filtrées côté API (parent/teacher/admin via provider & sécurité) */
export async function getParentAssignments() {
  const res = await apiFetch("/api/teacher_assignments?pagination=false");
  return parseCollection(res);
}

export async function getTeacherAssignments() {
  const res = await apiFetch("/api/teacher_assignments?pagination=false");
  return parseCollection(res);
}

export async function getAllAssignmentsAdmin() {
  const res = await apiFetch("/api/teacher_assignments?pagination=false");
  return parseCollection(res);
}

/** Liste des professeurs rattachés aux enfants du parent connecté */
export async function getMyTeachers() {
  const res = await apiFetch("/api/my/teachers?pagination=false");
  // selon ton endpoint, il renvoie déjà un tableau brut → on normalise au cas où
  return parseCollection(res);
}

/* ======================================
 * ACTIONS PARENT
 * ==================================== */

/** Demande d’affectation (parent) — ancien nom conservé pour compat */
export async function createAssignmentRequest({ child, subject, message }) {
  return apiFetch("/api/teacher_assignments", {
    method: "POST",
    body: JSON.stringify({
      child:   childIRI(child),
      subject: subjectIRI(subject),
      message: message ?? null,
      status:  ASSIGNMENT_STATUS.REQUESTED,
    }),
  });
}

/** Alias plus explicite si tu veux l’utiliser ailleurs */
export const requestTeacher = createAssignmentRequest;

/** Annuler une demande */
export async function cancelAssignment(id) {
  return apiFetch(`/api/teacher_assignments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/merge-patch+json" },
    body: JSON.stringify({ status: ASSIGNMENT_STATUS.CANCELLED }),
  });
}

/* ======================================
 * ACTIONS PROFESSEUR
 * ==================================== */

/** Le prof se porte candidat sur une demande existante (APPLIED) */
export async function teacherApply(id, message) {
  return apiFetch(`/api/teacher_assignments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/merge-patch+json" },
    body: JSON.stringify({
      status:  ASSIGNMENT_STATUS.APPLIED,
      message: message ?? null,
    }),
  });
}

/** Le prof accepte une proposition/assignation (ACCEPTED) */
export async function teacherAccept(id) {
  return apiFetch(`/api/teacher_assignments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/merge-patch+json" },
    body: JSON.stringify({ status: ASSIGNMENT_STATUS.ACCEPTED }),
  });
}

/** Le prof refuse (DECLINED) */
export async function teacherDecline(id, reason) {
  return apiFetch(`/api/teacher_assignments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/merge-patch+json" },
    body: JSON.stringify({
      status: ASSIGNMENT_STATUS.DECLINED,
      reason: reason ?? null,
    }),
  });
}

/* ======================================
 * ACTIONS ADMIN (optionnel)
 * ==================================== */

/** L’admin propose un prof (PROPOSED) */
export async function adminPropose(id, teacher, message) {
  return apiFetch(`/api/teacher_assignments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/merge-patch+json" },
    body: JSON.stringify({
      teacher: userIRI(teacher),
      status:  ASSIGNMENT_STATUS.PROPOSED,
      message: message ?? null,
    }),
  });
}

/** L’admin associe directement un prof (sans proposition) */
export async function adminAssign(id, teacher) {
  return apiFetch(`/api/teacher_assignments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/merge-patch+json" },
    body: JSON.stringify({
      teacher: userIRI(teacher),
      // tu peux laisser le statut tel quel, ou passer ACCEPTED selon ton flow:
      // status: ASSIGNMENT_STATUS.ACCEPTED,
    }),
  });
}
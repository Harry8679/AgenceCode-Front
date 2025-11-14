// src/lib/assignments.js
import { apiFetch, parseCollection } from "./api";

export const ASSIGNMENT_STATUS = {
  REQUESTED: "REQUESTED",
  APPLIED: "APPLIED",
  PROPOSED: "PROPOSED",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  CANCELLED: "CANCELLED",
};

// ----------- READ -----------
export async function getParentAssignments() {
  // côté API: provider qui ne renvoie que les assignations du parent connecté
  const res = await apiFetch("/api/assignments?pagination=false");
  return parseCollection(res);
}

export async function getTeacherAssignments() {
  // provider qui renvoie les assignations où l’utilisateur est teacher OU celles proposées
  const res = await apiFetch("/api/my-assignments?pagination=false");
  return parseCollection(res);
}

export async function getAllAssignmentsAdmin() {
  const res = await apiFetch("/api/assignments?pagination=false");
  return parseCollection(res);
}

// ----------- CREATE (parent demande un prof) -----------
export async function requestTeacher({ childIri, subjectIri, message }) {
  return apiFetch("/api/assignments", {
    method: "POST",
    json: { child: childIri, subject: subjectIri, message },
  });
}

// ----------- ACTIONS (PATCH) -----------
export async function teacherApply(id) {
  return apiFetch(`/api/assignments/${id}`, {
    method: "PATCH",
    json: { action: "apply" },
  });
}

export async function teacherAccept(id) {
  return apiFetch(`/api/assignments/${id}`, {
    method: "PATCH",
    json: { action: "accept" },
  });
}

export async function teacherDecline(id) {
  return apiFetch(`/api/assignments/${id}`, {
    method: "PATCH",
    json: { action: "decline" },
  });
}

// Admin propose un prof à une demande
export async function adminPropose(id, teacherIri) {
  return apiFetch(`/api/assignments/${id}`, {
    method: "PATCH",
    json: { action: "propose", teacher: teacherIri },
  });
}

// Admin affecte définitivement (ou accepte côté admin)
export async function adminAssign(id, teacherIri) {
  return apiFetch(`/api/assignments/${id}`, {
    method: "PATCH",
    json: { action: "assign", teacher: teacherIri },
  });
}
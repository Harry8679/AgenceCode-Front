const API_BASE = process.env.REACT_APP_API_BASE_URL || ""; // ex: http://localhost:8000

export function getToken() {
  return localStorage.getItem("token") || JSON.parse(localStorage.getItem("user") || "{}")?.token || "";
}

export function decodeJwt(token) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch { return null; }
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  if (!headers.has("Accept")) headers.set("Accept", "application/ld+json");
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const ct = res.headers.get("content-type") || "";
  const body = ct.includes("json") ? await res.json() : await res.text();

  if (!res.ok) {
    const msg = (body && (body.detail || body.message)) || `${res.status} ${res.statusText}`;
    const err = new Error(msg);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

/** Normalise la collection API Platform v3 (member) / v2 (hydra:member) */
export function parseCollection(data) {
  if (Array.isArray(data?.member)) return data.member;
  if (Array.isArray(data?.["hydra:member"])) return data["hydra:member"];
  if (Array.isArray(data)) return data;
  return [];
}
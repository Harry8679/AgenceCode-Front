// src/lib/api.js

// --------- Config API ---------
const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_API_URL ||
  "";

// --------- Auth helpers ---------
export function getToken() {
  return localStorage.getItem("token");
}

export function decodeJwt(token) {
  try {
    if (!token) return null;
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export const isTokenExpired = (t) => {
  const p = decodeJwt(t) || {};
  const exp = p.exp;
  return exp ? exp * 1000 <= Date.now() : false;
};

export const hardLogoutAndRedirect = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.replace("/"); // redirection immédiate
};

// --------- Fetch util ---------
/**
 * apiFetch(path, {
 *   method = 'GET',
 *   token = getToken(),
 *   body,                   // objet JS ou string
 *   contentType,            // pour forcer un type (ex: PATCH)
 *   headers = {},
 * } = {})
 */
export async function apiFetch(
  path,
  { method = "GET", token = getToken(), body, contentType, headers = {} } = {}
) {
  // 0) Si le token est déjà expiré côté client → logout + redirect
  if (token && isTokenExpired(token)) {
    hardLogoutAndRedirect();
    throw new Error("Session expirée");
  }

  // 1) Headers
  const h = {
    Accept: "application/ld+json",
    ...headers,
  };
  if (token) h.Authorization = `Bearer ${token}`;

  // Content-Type par défaut : JSON-LD, sauf PATCH -> merge-patch+json.
  if (body !== undefined && !h["Content-Type"]) {
    h["Content-Type"] =
      contentType ||
      (method.toUpperCase() === "PATCH"
        ? "application/merge-patch+json"
        : "application/ld+json");
  }

  // 2) Init fetch
  const init = { method, headers: h };
  if (body !== undefined) {
    init.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  // 3) Call
  const res = await fetch(`${API_BASE}${path}`, init);

  // util pour parser la réponse selon le content-type
  const ct = res.headers.get("content-type") || "";
  const parse = ct.includes("json") ? () => res.json() : () => res.text();

  // 4) Gestion 401/403 (token expiré/invalide)
  if (res.status === 401 || res.status === 403) {
    let message = "";
    try {
      const j = await parse();
      if (typeof j === "string") {
        message = j;
      } else if (j) {
        message =
          j["hydra:description"] ||
          j.detail ||
          j.message ||
          j.title ||
          "";
      }
    } catch {
      /* no-op */
    }

    // si on détecte un souci de JWT → logout + redirect
    if (/jwt/i.test(message) || res.status === 401) {
      hardLogoutAndRedirect();
      throw new Error(message || "Unauthorized");
    }
    // sinon renvoyer l'erreur standard
    throw new Error(message || res.statusText);
  }

  // 5) Autres erreurs HTTP
  if (!res.ok) {
    let err;
    try {
      err = await parse();
    } catch {
      err = {};
    }
    const message =
      (typeof err === "string" && err) ||
      err["hydra:description"] ||
      err.detail ||
      err.message ||
      res.statusText;
    throw new Error(message);
  }

  // 6) Succès
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

// --------- Hydra collection helper ---------
export function parseCollection(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data["hydra:member"] || data.member || [];
}
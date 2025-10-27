// src/lib/api.js
const API_BASE = process.env.REACT_APP_API_BASE_URL || "";

export function getToken() {
  return localStorage.getItem("token");
}

export function decodeJwt(token) {
  try {
    if (!token) return null;
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch { return null; }
}

export const isTokenExpired = (t) => {
  const { exp } = decodeJwt(t);
  return exp ? exp * 1000 <= Date.now() : false;
};

export const hardLogoutAndRedirect = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  // redirection immédiate (sans dépendre de React Router)
  window.location.replace("/");
};

export async function apiFetch(path, {
  method = "GET",
  token = getToken(),
  body,
  contentType,        // <-- permet de forcer un type si besoin (PATCH)
  headers = {},
} = {}) {
  const h = {
    Accept: "application/ld+json",
    ...headers,
  };

  if (token) h.Authorization = `Bearer ${token}`;

  // S'il y a un body, on met un Content-Type par défaut adapté à API Platform
  if (body !== undefined && !h["Content-Type"]) {
    h["Content-Type"] = contentType
      ? contentType
      : (method === "PATCH" ? "application/merge-patch+json" : "application/ld+json");
  }

  const init = {
    method,
    headers: h,
  };

  if (body !== undefined) {
    init.body = (typeof body === "string") ? body : JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, init);

  const ct = res.headers.get("content-type") || "";
  const parse = ct.includes("json")
    ? () => res.json()
    : () => res.text();

  if (!res.ok) {
    let err;
    try { err = await parse(); } catch { err = {}; }
    const message =
      err["hydra:description"] ||
      err["detail"] ||
      err.message ||
      res.statusText;
    throw new Error(message);
  }

  return parse();
}

// petit utilitaire pour collection hydra
export function parseCollection(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data["hydra:member"] || data.member || [];
}
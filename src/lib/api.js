// Simple fetch wrapper for API Platform + JWT
const API_BASE = process.env.REACT_APP_API_BASE_URL || "";

export async function apiFetch(path, {
  method = "GET",
  token,
  body,
  contentType = "application/ld+json", // for POST/PUT
  accept = "application/ld+json",
  headers = {},
} = {}) {
  const h = {
    Accept: accept,
    ...headers,
  };
  if (token) h.Authorization = `Bearer ${token}`;
  if (body !== undefined) {
    h["Content-Type"] = contentType;
    if (contentType === "application/merge-patch+json") {
      // Let you pass plain object for PATCH too
      body = JSON.stringify(body);
    } else if (contentType.includes("json")) {
      body = JSON.stringify(body);
    }
  }

  const res = await fetch(`${API_BASE}${path}`, { method, headers: h, body });
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("json") ? await res.json() : await res.text();

  if (!res.ok) {
    const message =
      (data?.["hydra:description"]) ||
      (data?.detail) ||
      (typeof data === "string" ? data : "Erreur API");
    throw new Error(message);
  }
  return data;
}
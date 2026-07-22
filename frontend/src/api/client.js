const API_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    // Skip the browser's conditional-request caching (ETag/If-None-Match).
    // Express auto-generates ETags, which can cause a bare 304 response with
    // no body — since we already do our own caching in Home.jsx, we always
    // want a fresh, full response here rather than relying on browser HTTP cache.
    cache: "no-store",
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const getItems = () => request("/items");
export const getItem = (id) => request(`/items/${id}`);
export const sendContactMessage = (payload) =>
  request("/contact", { method: "POST", body: JSON.stringify(payload) });
const API_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
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

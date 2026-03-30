const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export const apiUrl = (path = "") => `${API_BASE_URL}${path}`;

export const uploadUrl = (fileName) => apiUrl(`/uploads/${fileName}`);

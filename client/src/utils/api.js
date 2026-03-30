const BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "https://grievance-portal-backend-atde.onrender.com"
).replace(/\/$/, "");

export const apiUrl = (path = "") => `${BASE_URL}${path}`;

export const uploadUrl = (fileName) => apiUrl(`/uploads/${fileName}`);

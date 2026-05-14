const VITE_API_URL="https://xtra-e-commerce-production.up.railway.app"
export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
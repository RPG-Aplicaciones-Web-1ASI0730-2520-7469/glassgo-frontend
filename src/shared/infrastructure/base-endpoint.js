// ============================================================
// 🌐 base-endpoint.js — Base API Endpoint Configuration
// ------------------------------------------------------------
// Centralizes the API base URL for both local and production use.
// Reads environment variables from `.env` if available.
// ============================================================

export const BASE_API_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

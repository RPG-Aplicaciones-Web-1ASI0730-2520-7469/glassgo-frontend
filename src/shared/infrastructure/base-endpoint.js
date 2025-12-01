// ============================================================
// 🌐 base-endpoint.js — Base API Endpoint Configuration
// ------------------------------------------------------------
// Centralizes the API base URL for both local and production use.
// Reads environment variables from `.env` if available.
// ============================================================

/**
 * Base API URL for all backend requests
 * Reads from VITE_API_BASE_URL environment variable, defaults to localhost for development.
 * Used by http-client.js to configure the Axios base URL.
 *
 * @type {string}
 */
export const BASE_API_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

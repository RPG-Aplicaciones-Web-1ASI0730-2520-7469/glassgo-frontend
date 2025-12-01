// ============================================================
// ⚙️ http-client.js — Axios HTTP Client Configuration
// ------------------------------------------------------------
// Reusable Axios instance for all API requests.
// Automatically loads the base URL from `base-endpoint.js`.
// Compatible with both JSON Server and real backend APIs.
// ============================================================

import axios from 'axios'
import { BASE_API_URL } from './base-endpoint.js'

/**
 * Configured Axios HTTP client instance
 * Shared infrastructure for making API requests with predefined base URL and headers.
 * Used across all infrastructure API modules for consistent HTTP communication.
 *
 * @type {import('axios').AxiosInstance}
 */
export const httpClient = axios.create({
    baseURL: `${BASE_API_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
})

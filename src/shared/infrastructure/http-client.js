// ----------------------------------------------------
// ⚙️ HTTP Client Configuration (Axios)
// ----------------------------------------------------
// Reusable Axios instance that connects to JSON Server or real API.
// It automatically uses the base URL from `base-endpoint.js`.
// ----------------------------------------------------

import axios from 'axios'
import { BASE_API_URL } from './base-endpoint.js'

export const httpClient = axios.create({
    baseURL: `${BASE_API_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
})

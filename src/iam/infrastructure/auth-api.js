import { httpClient } from "../../shared/infrastructure/http-client.js";

/**
 * Authentication API class to handle authentication operations.
 * Usa httpClient para las peticiones HTTP.
 */

export class AuthApi {
    constructor() {
        this.http = httpClient;
    }

    /**
     * Get all users for authentication lookup
     * @returns {Promise} A promise that resolves to the users list
     */
    getUsers() {
        return this.http.get('/users');
    }

    /**
     * Logout current user (just returns success)
     * @returns {Promise} A promise that resolves to the logout response
     */
    logout() {
        return Promise.resolve({ status: 200, message: 'Logout successful' });
    }

    /**
     * Validate current authentication token (simple validation)
     * @param {string} token - Authentication token to validate
     * @returns {Promise} A promise that resolves to the validation response
     */
    validateToken(token) {
        // Simple validation - if token exists and starts with 'simple-token', it's valid
        if (token && token.startsWith('simple-token')) {
            return Promise.resolve({ status: 200, valid: true });
        } else {
            return Promise.reject({ status: 401, valid: false });
        }
    }

    /**
     * Request password reset (mock implementation)
     * @param {string} email - User email
     * @returns {Promise} A promise that resolves to the password reset response
     */
    forgotPassword(email) {
        return Promise.resolve({ 
            status: 200, 
            message: 'Password reset email sent (demo mode)' 
        });
    }
}
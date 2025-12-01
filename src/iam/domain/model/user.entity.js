/**
 * User Entity
 * Represents a user in the authentication domain.
 * @class
 * @property {Number|null} id - The unique identifier of the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} role - The role of the user (admin, distributor, transport).
 * @property {string|null} token - The authentication token.
 */
export class User {
    /**
     * Creates an instance of User.
     * @param {Object} params - User parameters
     * @param {number|null} params.id - The unique identifier of the user.
     * @param {string} params.username - The username of the user.
     * @param {string} params.email - The email of the user.
     * @param {string} params.role - The role of the user.
     * @param {string|null} params.token - The authentication token.
     */
    constructor({ id = null, username = '', email = '', role = '', token = null }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    /**
     * Check if user is authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
        return this.token !== null && this.token !== '';
    }

    /**
     * Check if user has admin role
     * @returns {boolean}
     */
    isAdmin() {
        return this.role === 'admin';
    }

    /**
     * Check if user has distributor role
     * @returns {boolean}
     */
    isDistributor() {
        return this.role === 'distributor';
    }

    /**
     * Check if user has transport role
     * @returns {boolean}
     */
    isTransport() {
        return this.role === 'transport';
    }
}
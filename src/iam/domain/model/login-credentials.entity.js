/**
 * LoginCredentials Entity
 * Represents login credentials in the authentication domain.
 * @class
 */
export class LoginCredentials {
    /**
     * Creates an instance of LoginCredentials.
     * @param {Object} params - Login credentials parameters
     * @param {string} params.username - The username or email
     * @param {string} params.password - The password
     * @param {string} params.role - The user role (admin, distributor, transport)
     * @param {boolean} params.rememberMe - Whether to remember the user
     */
    constructor({ username = '', password = '', role = '', rememberMe = false }) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.rememberMe = rememberMe;
    }

    /**
     * Validate if credentials are complete
     * @returns {boolean}
     */
    isValid() {
        return this.username.trim() !== '' && 
               this.password.trim() !== '' && 
               this.role.trim() !== '';
    }
}
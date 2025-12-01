import {User} from "../domain/model/user.entity.js";

/**
 * Assembler for User entities.
 * Converts raw data from API responses into User domain entities.
 * @class
 */
export class UserAssembler {
    /**
     * Converts a single resource object into a User entity.
     * @param {Object} resource - Raw resource object from API response.
     * @returns {User} - User domain entity.
     */
    static toEntityFromResource(resource) {
        return new User({
            id: resource.id,
            username: resource.username,
            email: resource.email,
            role: resource.role,
            token: resource.token || resource.accessToken
        });
    }

    /**
     * Converts an authentication response into a User entity.
     * @param {Object} response - API response object from login.
     * @returns {User|null} - User domain entity or null if invalid response.
     */
    static toEntityFromLoginResponse(response) {
        if (response.status !== 200 || !response.data) {
            console.error(`Login failed: ${response.status} - ${response.statusText}`);
            return null;
        }

        const { user, token } = response.data;
        
        return new User({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: token
        });
    }

    /**
     * Converts a User entity to request payload for API calls.
     * @param {User} user - User domain entity.
     * @returns {Object} - Request payload object.
     */
    static toResourceFromEntity(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
    }
}
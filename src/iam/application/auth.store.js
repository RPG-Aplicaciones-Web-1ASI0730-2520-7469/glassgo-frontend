import {defineStore} from "pinia";
import {ref, computed} from "vue";
import {AuthApi} from "../infrastructure/auth-api.js";
import {UserAssembler} from "../infrastructure/user.assembler.js";
import {User} from "../domain/model/user.entity.js";

const authApi = new AuthApi();

/**
 * Pinia store for managing authentication state.
 * Provides state, getters, and actions for user authentication.
 * 
 * @store
 */
export const useAuthStore = defineStore('auth', () => {
    // State
    const currentUser = ref(null);
    const isLoading = ref(false);
    const errors = ref([]);
    const isAuthenticated = ref(false);

    // Getters
    const user = computed(() => currentUser.value);
    const userRole = computed(() => currentUser.value?.role || '');
    const isAdmin = computed(() => currentUser.value?.isAdmin() || false);
    const isDistributor = computed(() => currentUser.value?.isDistributor() || false);
    const isTransport = computed(() => currentUser.value?.isTransport() || false);

    // Actions
    async function login(credentials) {
        isLoading.value = true;
        errors.value = [];
        
        try {
            // Get all users and find matching one
            const response = await authApi.getUsers();
            const users = response.data;
            
            const user = users.find(u => 
                (u.email === credentials.username || u.username === credentials.username) && 
                u.password === credentials.password && 
                u.role === credentials.role &&
                u.isActive === true
            );
            
            if (!user) {
                throw new Error('Invalid credentials or user not found');
            }
            
            // Create user entity
            const userEntity = new User({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: 'simple-token-' + Date.now() // Simple token for demo
            });
            
            currentUser.value = userEntity;
            isAuthenticated.value = true;
            
            // Store token in localStorage if remember me is checked
            if (credentials.rememberMe) {
                localStorage.setItem('auth_token', userEntity.token);
                localStorage.setItem('user_data', JSON.stringify({
                    id: userEntity.id,
                    username: userEntity.username,
                    email: userEntity.email,
                    role: userEntity.role
                }));
            }
            
            return userEntity;
        } catch (error) {
            errors.value.push(error.message || 'Login failed');
            isAuthenticated.value = false;
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    async function logout() {
        isLoading.value = true;
        
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear state regardless of API call result
            currentUser.value = null;
            isAuthenticated.value = false;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            isLoading.value = false;
        }
    }

    async function validateToken() {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (!token || !userData) {
            return false;
        }

        isLoading.value = true;
        
        try {
            const response = await authApi.validateToken(token);
            
            if (response.status === 200) {
                const parsedUserData = JSON.parse(userData);
                currentUser.value = new User({
                    ...parsedUserData,
                    token: token
                });
                isAuthenticated.value = true;
                return true;
            } else {
                // Token is invalid, clear storage
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
                return false;
            }
        } catch (error) {
            console.error('Token validation error:', error);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    async function forgotPassword(email) {
        isLoading.value = true;
        errors.value = [];
        
        try {
            const response = await authApi.forgotPassword(email);
            return response.data;
        } catch (error) {
            errors.value.push(error.message || 'Failed to send password reset email');
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    function clearErrors() {
        errors.value = [];
    }

    // Initialize auth state on store creation
    function initializeAuth() {
        validateToken();
    }

    return {
        // State
        currentUser,
        isLoading,
        errors,
        isAuthenticated,
        
        // Getters
        user,
        userRole,
        isAdmin,
        isDistributor,
        isTransport,
        
        // Actions
        login,
        logout,
        validateToken,
        forgotPassword,
        clearErrors,
        initializeAuth
    };
});
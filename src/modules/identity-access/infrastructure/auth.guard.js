import {useAuthStore} from "../application/auth.store.js";

/**
 * Authentication guard for Vue Router
 * Protects routes that require authentication
 */
export const authGuard = async (to, from, next) => {
    const authStore = useAuthStore();
    
    // Skip auth guard for auth routes
    if (to.path.startsWith('/auth')) {
        // Always allow access to auth routes, regardless of authentication status
        // This allows users to logout and login again
        next();
        return;
    }
    
    // For routes that require authentication
    if (to.meta.requiresAuth) {
        // If not authenticated, validate token first
        if (!authStore.isAuthenticated) {
            const isValidToken = await authStore.validateToken();
            if (!isValidToken) {
                next('/auth/login');
                return;
            }
        }
    }
    
    // Allow navigation
    next();
};
/* ============================================================
 * 📁 src/stores/user.store.js
 * ============================================================
 * 👤 Global User Store (Pinia)
 * ------------------------------------------------------------
 * Centralized management of the authenticated user.
 * - Loads data from JSON Server via DEMO_USER_ID.
 * - Handles role, name, and session persistence.
 * - Ready for future migration to the Identity & Access BC.
 * ============================================================ */

import { defineStore } from 'pinia'
import { httpClient } from '@/shared/infrastructure/http-client'
import { DEMO_USER_ID } from '@/shared/config/demo-user'

/**
 * User Store - Global State Management
 * Manages authenticated user data, role-based routing, and session persistence.
 * Uses Pinia for reactive state management across the application.
 */
export const useUserStore = defineStore('user', {
    /* ----------------------------------------------------------
     * 🧠 State
     * ---------------------------------------------------------- */
    state: () => ({
        /**
         * Current authenticated user object
         * @type {Object|null}
         */
        user: null,

        /**
         * Loading state for user operations
         * @type {boolean}
         */
        loading: false,

        /**
         * Error message from failed operations
         * @type {string|null}
         */
        error: null
    }),

    /* ----------------------------------------------------------
     * ⚙️ Actions
     * ---------------------------------------------------------- */
    actions: {
        /**
         * 🔄 Fetch user from db.json
         * Uses DEMO_USER_ID for local testing.
         */
        async fetchUser(userId = DEMO_USER_ID) {
            this.loading = true
            this.error = null

            try {
                const response = await httpClient.get(`/users/${userId}`)
                this.user = response.data

                console.log(`👤 User loaded: ${this.user.firstName} (${this.user.role})`)

                // ✅ Local persistence
                localStorage.setItem('userRole', this.user.role)
                localStorage.setItem('userId', this.user.id)
            } catch (err) {
                console.error('❌ Failed to load user:', err)
                this.error = 'User information could not be loaded.'
                this.user = null
            } finally {
                this.loading = false
            }
        },

        /**
         * ✏️ Manually set user data
         */
        setUser(userData) {
            this.user = userData
            localStorage.setItem('userRole', userData.role || 'demo')
            localStorage.setItem('userId', userData.id || DEMO_USER_ID)
        },

        /**
         * 🚪 Clear user data (logout)
         */
        clearUser() {
            this.user = null
            localStorage.removeItem('userRole')
            localStorage.removeItem('userId')
        },

        /**
         * 🧭 Return home route by user role
         * Used by router.js and AppShell.vue.
         */
        getHomeRoute() {
            const role = this.user?.role || localStorage.getItem('userRole')

            const roleRoutes = {
                admin: '/app/home-admin',
                distributor: '/app/home-distributor',
                carrier: '/app/home-carrier',
                'business-owner': '/app/home-business-owner'
            }

            return roleRoutes[role] || '/app/home'
        }
    },

    /* ----------------------------------------------------------
     * 🔍 Getters
     * ---------------------------------------------------------- */
    getters: {
        /**
         * Full name of the user
         * @type {string}
         */
        fullName: (state) => {
            if (!state.user) return ''
            return `${state.user.firstName} ${state.user.lastName}`
        },

        /**
         * User initials for avatar display
         * @type {string}
         */
        initials: (state) => {
            if (!state.user) return ''
            const f = state.user.firstName?.[0]?.toUpperCase() || ''
            const l = state.user.lastName?.[0]?.toUpperCase() || ''
            return f + l
        },

        /**
         * Current user role
         * @type {string}
         */
        role: (state) => state.user?.role || 'demo',

        /**
         * Authentication status
         * @type {boolean}
         */
        isAuthenticated: (state) => !!state.user
    }
})

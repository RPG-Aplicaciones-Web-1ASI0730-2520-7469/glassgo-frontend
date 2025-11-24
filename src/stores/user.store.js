
import { defineStore } from 'pinia'
import { httpClient } from '@/shared/infrastructure/http-client'
import { DEMO_USER_ID } from '@shared/domain/model/demo-user.js'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        loading: false,
        error: null
    }),

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
        /** 🧾 Full name */
        fullName: (state) => {
            if (!state.user) return ''
            return `${state.user.firstName} ${state.user.lastName}`
        },

        /** 🔠 User initials */
        initials: (state) => {
            if (!state.user) return ''
            const f = state.user.firstName?.[0]?.toUpperCase() || ''
            const l = state.user.lastName?.[0]?.toUpperCase() || ''
            return f + l
        },

        /** 🧩 Current role */
        role: (state) => state.user?.role || 'demo',

        /** ⚙️ Auth state */
        isAuthenticated: (state) => !!state.user
    }
})

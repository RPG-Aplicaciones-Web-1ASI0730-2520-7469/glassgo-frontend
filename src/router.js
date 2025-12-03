
import { createRouter, createWebHistory } from 'vue-router'

import AppShell from './shared/presentation/components/layout/app-shell.vue'
import Home from '@shared/presentation/views/home/home.vue'
import CreatOrder from './service-planning/presentation/views/creat-order.vue'
import ComingSoon from './shared/presentation/views/coming-soon.vue'
import NotFound from './shared/presentation/views/page-not-found.vue'


import HomeAdmin from './shared/presentation/views/home/home-admin.vue'
import HomeDistributor from './shared/presentation/views/home/home-distributor.vue'
import HomeCarrier from './shared/presentation/views/home/home-carrier.vue'
import HomeBusinessOwner from './shared/presentation/views/home/home-business-owner.vue'


import { useUserStore } from '@/stores/user.store'

/**
 * Vue Router instance with role-based routing
 * Configured router for the GlassGo application with nested routes under /app.
 * Handles automatic redirection based on user roles and provides consistent layout.
 *
 * @type {import('vue-router').Router}
 */
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/app',
            component: AppShell,
            children: [
                { path: 'profile', component: ComingSoon, name: 'Profile' },
                { path: '', redirect: '/app/home' },

                // 🏠 Base Home Route — Redirect by Role
                {
                    path: 'home',
                    name: 'Home',
                    component: Home,
                    beforeEnter: async () => {
                        const userStore = useUserStore()

                        // Load user if not available yet
                        if (!userStore.user) await userStore.fetchUser()

                        const role = userStore.user?.role || 'demo'

                        // Role-based redirects
                        const redirectMap = {
                            admin: '/app/home-admin',
                            distributor: '/app/home-distributor',
                            carrier: '/app/home-carrier',
                            'business-owner': '/app/home-business-owner'
                        }

                        // Default to classic Home if invalid or demo role
                        if (role === 'demo' || role === '' || !redirectMap[role]) return true

                        // Redirect to correct Home view
                        return redirectMap[role]
                    }
                },

                // 🧱 Role-Specific Routes
                { path: 'home-admin', component: HomeAdmin, name: 'HomeAdmin' },
                { path: 'home-distributor', component: HomeDistributor, name: 'HomeDistributor' },
                { path: 'home-carrier', component: HomeCarrier, name: 'HomeCarrier' },
                { path: 'home-business-owner', component: HomeBusinessOwner, name: 'HomeBusinessOwner' },

                // 🧩 Placeholder Modules (WIP)
                { path: 'create-order', component: CreatOrder },
                { path: 'tracking', component: ComingSoon },
                { path: 'inventory', component: ComingSoon },
                { path: 'calendar', component: ComingSoon },
                { path: 'payments', component: ComingSoon },
                { path: 'history', component: ComingSoon },
                { path: 'claims', component: ComingSoon },
                { path: 'admin', component: ComingSoon }
                ,
                // Dashboard Analytics
                // { path: 'reportes', component: () => import('./modules/dashboard-analytics/presentation/views/reportes.vue'), name: 'Reportes' }
            ]
        },

        // 🌍 Global Routes
        { path: '/', redirect: '/app/home' },
        { path: '/:pathMatch(.*)*', component: NotFound }
    ]
})

export default router

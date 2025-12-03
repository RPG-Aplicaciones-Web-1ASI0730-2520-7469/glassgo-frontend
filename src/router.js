/* ============================================================
 *  GlassGo Main Router (with Role Detection)
 * ============================================================
 * Central routing system controlling navigation across views.
 * Handles automatic redirection based on user roles and ensures
 * a consistent layout (AppShell) for all /app routes.
 * ============================================================ */

import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'

// ------------------------------------------------------------
// Core Layout and Common Views
// ------------------------------------------------------------
import AppShell from './shared/presentation/components/layout/app-shell.vue'
// Importar rutas de autenticación y guard
import Login from '@/iam/presentation/views/login.vue'
const authRoutes = [
    {
        path: 'login',
        name: 'auth-login',
        component: Login,
        meta: { title: 'Sign In', titleKey: 'auth.sign-in' }
    },
    {
        path: 'forgot-password',
        name: 'auth-forgot-password',
        component: () => import('@/iam/presentation/views/forgot-password.vue'),
        meta: { title: 'Forgot Password', titleKey: 'auth.forgot-password' }
    },
    {
        path: 'register',
        name: 'auth-register',
        component: () => import('@/iam/presentation/views/register.vue'),
        meta: { title: 'Register', titleKey: 'auth.sign-up' }
    }
]
import { authGuard } from '@/iam/infrastructure/auth.guard.js'
import Home from '@shared/presentation/views/home/home.vue'
import ComingSoon from './shared/presentation/views/coming-soon.vue'
import NotFound from './shared/presentation/views/page-not-found.vue'

// ------------------------------------------------------------
// Role-Specific Home Views
// ------------------------------------------------------------


import HomeAdmin from './shared/presentation/views/home/home-admin.vue'
import HomeDistributor from './shared/presentation/views/home/home-distributor.vue'
import HomeCarrier from './shared/presentation/views/home/home-carrier.vue'
import HomeBusinessOwner from './shared/presentation/views/home/home-business-owner.vue'

// ------------------------------------------------------------
// User Store (Role Detection)
// ------------------------------------------------------------
import { useUserStore } from '@/stores/user.store'

// ------------------------------------------------------------
// Router Definition
// ------------------------------------------------------------
const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Rutas de autenticación
        {
            path: '/auth',
            component: () => import('@/iam/presentation/components/auth-layout.vue'),
            children: authRoutes
        },
        {
            path: '/app',
            component: AppShell,
            children: [
                { 
                    path: 'profile', 
                    component: () => import('@/profiles/presentation/views/profile.vue'), 
                    name: 'Profile' 
                },
                { path: '', redirect: '/app/home' },

                //  Base Home Route — Redirect by Role
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

                //  Role-Specific Routes
                { path: 'home-admin', component: HomeAdmin, name: 'HomeAdmin' },
                { path: 'home-distributor', component: HomeDistributor, name: 'HomeDistributor' },
                { path: 'home-carrier', component: HomeCarrier, name: 'HomeCarrier' },

                { path: 'home-business-owner', component: HomeBusinessOwner, name: 'HomeBusinessOwner' },
                // Placeholder Modules (WIP)
                { path: 'create-order', component: ComingSoon },
                { path: 'tracking', component: ComingSoon },
                { path: 'inventory', component: ComingSoon },
                { path: 'calendar', component: ComingSoon },
                { path: 'reports', component: () => import('./analytics/presentation/views/reporte.vue'), name: 'Reports' },
                { path: 'payments', component: ComingSoon },
                { path: 'history', component: ComingSoon },
                { path: 'claims', component: ComingSoon },
                { path: 'admin', component: ComingSoon }
                ,
                // Dashboard Analytics
                { path: 'reportes', component: () => import('./analytics/presentation/views/reporte.vue'), name: 'Reportes' }
            ]
        },

        //  Global Routes
        { path: '/', redirect: '/auth/login' },
        { path: '/:pathMatch(.*)*', component: NotFound }
    ]
})

// Aplicar el guard de autenticación globalmente
router.beforeEach(authGuard)

export default router

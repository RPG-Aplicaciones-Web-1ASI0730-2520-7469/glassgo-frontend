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
import ProfileView from './modules/profile-preferences/presentation/views/profile.vue'
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
// 🚚 Deliveries Module (DDD)
// ------------------------------------------------------------
import DeliveryDashboard from './modules/service-execution/presentation/views/delivery-dashboard.vue'

// ------------------------------------------------------------
// 🧠 User Store (Role Detection)
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
                                    component: ProfileView,
                                    name: 'Profile'
                                },
                                { path: 'profile/tracking', component: ComingSoon, name: 'ProfileTracking' },
                                { path: 'profile/inventario', component: ComingSoon, name: 'ProfileInventario' },
                                { path: 'profile/calendar', component: ComingSoon, name: 'ProfileCalendar' },
                                { path: 'profile/reportes', component: ComingSoon, name: 'ProfileReportes' },
                                { path: 'profile/reclamos', component: ComingSoon, name: 'ProfileReclamos' },
                                { path: 'profile/configuraciones', component: ComingSoon, name: 'ProfileConfiguraciones' },
                                { path: 'profile/crear-pedido', component: ComingSoon, name: 'ProfileCrearPedido' },
                { path: '', redirect: '/app/home' },

                //  Base Home Route — Redirect by Role
                {
                    path: 'home',
                    name: 'Home',
                    component: Home,
                    beforeEnter: async () => {
                        const userStore = useUserStore()

                        // Load user if not available
                        if (!userStore.user) await userStore.fetchUser()

                        const role = userStore.user?.role || 'demo'

                        const redirectMap = {
                            admin: '/app/home-admin',
                            distributor: '/app/home-distributor',
                            carrier: '/app/home-carrier',
                            'business-owner': '/app/home-business-owner'
                        }

                        // Default if demo, empty or invalid
                        if (role === 'demo' || role === '' || !redirectMap[role]) {
                            return true
                        }

                        // Redirect by role
                        return redirectMap[role]
                    }
                },

                // 🧱 Role-Specific Homes
                { path: 'home-admin', component: HomeAdmin, name: 'HomeAdmin' },
                { path: 'home-distributor', component: HomeDistributor, name: 'HomeDistributor' },
                { path: 'home-carrier', component: HomeCarrier, name: 'HomeCarrier' },

                // --------------------------------------------------------
                // 🚚 Deliveries Module (NEW)
                // --------------------------------------------------------
                {
                    path: 'deliveries',
                    component: DeliveryDashboard,
                    name: 'Deliveries'
                },

                // 🧩 Placeholder Modules (WIP)
                { path: 'create-order', component: ComingSoon },
                { path: 'tracking', component: ComingSoon },
                { path: 'inventory', component: ComingSoon },
                { path: 'calendar', component: ComingSoon },
                /*{
                    path: 'reports',
                    component: () => import('./modules/dashboard-analytics/presentation/views/reporte.vue'),
                    name: 'Reports'
                },*/
                { path: 'payments', component: ComingSoon },
                { path: 'history', component: ComingSoon },
                { path: 'claims', component: ComingSoon },
                { path: 'admin', component: ComingSoon },

                // Legacy dashboard route
                /*{
                    path: 'reportes',
                    component: () => import('./modules/dashboard-analytics/presentation/views/reporte.vue'),
                    name: 'Reportes'
                }*/
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

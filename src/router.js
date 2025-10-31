/* ----------------------------------------------------
 * 🧭 Configuración del enrutador principal de GlassGo
 * ----------------------------------------------------
 * - Define todas las rutas visibles del frontend.
 * - Gestiona la navegación entre vistas (Home, ComingSoon, 404, etc.).
 * - Implementa el layout principal (AppShell) que contiene la barra lateral y superior.
 * ---------------------------------------------------- */

/* ----------------------------------------------------
 * 📦 Importación de dependencias base
 * ----------------------------------------------------
 * createRouter: crea la instancia del enrutador de Vue.
 * createWebHistory: utiliza la API de historial HTML5 para URLs limpias (sin #).
 * ---------------------------------------------------- */
import { createRouter, createWebHistory } from 'vue-router'

/* ----------------------------------------------------
 * 🧱 Importación de vistas y componentes del layout
 * ----------------------------------------------------
 * - AppShell: layout principal (sidebar + topbar + router-view).
 * - Home: vista inicial del sistema.
 * - ComingSoon: placeholder temporal para módulos en desarrollo.
 * - NotFound: vista de error 404 personalizada.
 * ---------------------------------------------------- */
import AppShell from './shared/presentation/components/layout/app-shell.vue'
import Home from './shared/presentation/views/home.vue'
import ComingSoon from './shared/presentation/views/coming-soon.vue'
import NotFound from './shared/presentation/views/page-not-found.vue'

/* ----------------------------------------------------
 * 🚀 Definición de rutas principales
 * ----------------------------------------------------
 * - Se agrupan las rutas bajo el layout principal /app.
 * - Se definen redirecciones automáticas y manejo de errores (404).
 * ---------------------------------------------------- */
export default createRouter({
    // Usa historial HTML5 para navegación sin #
    history: createWebHistory(),

    routes: [
        {
            /* ----------------------------------------------------
             * 🏠 Layout principal de la aplicación (/app)
             * ----------------------------------------------------
             * - Estructura base donde se montan las vistas principales.
             * - Contiene la barra lateral (Sidebar), topbar (Topbar)
             *   y la zona dinámica del contenido (router-view).
             * ---------------------------------------------------- */
            path: '/app',
            component: AppShell,

            // Rutas hijas dentro del layout
            children: [
                /* ----------------------------------------------------
                 * 📄 Página de inicio (/app/home)
                 * ----------------------------------------------------
                 * - Vista principal con mensaje de bienvenida.
                 * - Primer destino al acceder al sistema.
                 * ---------------------------------------------------- */
                { path: 'home', component: Home },

                /* ----------------------------------------------------
                 * 🧩 Módulos en desarrollo (/app/modules)
                 * ----------------------------------------------------
                 * - Vista temporal “Próximamente”.
                 * - Se reemplazará cuando los módulos reales estén listos.
                 * ---------------------------------------------------- */
                { path: 'modules', component: ComingSoon },

                /* ----------------------------------------------------
                 * 🔁 Redirección interna
                 * ----------------------------------------------------
                 * - Si el usuario accede a /app sin ruta específica,
                 *   se redirige automáticamente a /app/home.
                 * ---------------------------------------------------- */
                { path: '', redirect: '/app/home' },
            ]
        },

        /* ----------------------------------------------------
         * 🌍 Redirección raíz
         * ----------------------------------------------------
         * - Si el usuario entra a http://localhost:5173,
         *   se redirige automáticamente al Home.
         * ---------------------------------------------------- */
        { path: '/', redirect: '/app/home' },

        /* ----------------------------------------------------
         * ❌ Error 404 global (fuera del layout)
         * ----------------------------------------------------
         * - Captura cualquier ruta no reconocida a nivel global.
         * - Se usa como fallback para rutas externas.
         * ---------------------------------------------------- */
        { path: '/:pathMatch(.*)*', component: NotFound }
    ]
})

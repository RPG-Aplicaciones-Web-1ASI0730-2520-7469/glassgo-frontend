/* ============================================================
 * ⚙️ vite.config.js — Vite Environment Configuration
 * ============================================================
 * Optimized setup for GlassGo using Domain-Driven Design (DDD)
 * with 8 Bounded Contexts.
 *
 * ✅ Key Features:
 *  - Vue file processing
 *  - Clean path aliases for modular imports
 *  - Scalable DDD structure per bounded context
 *  - Automatic Hot Reload for fast development
 * ============================================================ */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

/* ------------------------------------------------------------
 * 🚀 Export Configuration
 * ------------------------------------------------------------ */
export default defineConfig({
    /* ----------------------------------------------------------
     * 🧩 Plugins
     * ---------------------------------------------------------- */
    plugins: [vue()],

    /* ----------------------------------------------------------
     * 🧭 Path Aliases
     * ----------------------------------------------------------
     * Simplifies imports following GlassGo’s modular structure.
     *
     * Example:
     *   import { loginUser } from '@iam/application/login.service'
     *   import { ButtonPrimary } from '@shared/presentation/components/ui/button-primary.vue'
     * ---------------------------------------------------------- */
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@config': path.resolve(__dirname, './src/config'),

            // 🔹 Optional aliases per bounded context
            '@iam': path.resolve(__dirname, './src/iam'),
            '@profiles': path.resolve(__dirname, './src/profiles'),
            '@payments': path.resolve(__dirname, './src/modules/payments-subscriptions'),
            '@inventory': path.resolve(__dirname, './src/modules/consumption-inventory'),
            '@execution': path.resolve(__dirname, './src/modules/service-execution-monitoring'),
            '@dashboard': path.resolve(__dirname, './src/modules/dashboard-analytics'),
            '@notifications': path.resolve(__dirname, './src/modules/notifications-messaging'),
            '@system': path.resolve(__dirname, './src/modules/system-administration-configuration')
        }
    },

    /* ----------------------------------------------------------
     * 🌐 Dev Server
     * ----------------------------------------------------------
     * Local development server settings.
     * ---------------------------------------------------------- */
    server: {
        port: 5173,
        open: true,
        strictPort: true
    }
})

/* ============================================================
 * 🧭 main.js — GlassGo Entry Point
 * ============================================================
 * Initializes and mounts the Vue application, registering all
 * global modules required by the system:
 *  - Router (navigation)
 *  - i18n (internationalization)
 *  - Pinia (state management)
 *  - Global styles
 * ============================================================ */

// ------------------------------------------------------------
// 📦 Core Vue Imports
// ------------------------------------------------------------
import { createApp } from 'vue'
import App from './App.vue'

// ------------------------------------------------------------
// 🧭 Router
// ------------------------------------------------------------
// Handles navigation between views (home, modules, 404, etc.)
// Defined in `router.js` with full app hierarchy (AppShell + views).
import router from './router'

// ------------------------------------------------------------
// 🌐 i18n (Internationalization)
// ------------------------------------------------------------
// Loads language dictionaries (en.json / es.json)
// and manages translation across the entire app.
import { i18n } from './i18n'

// ------------------------------------------------------------
// 🧠 Pinia (Global State)
// ------------------------------------------------------------
// Centralized state management (user, language, etc.)
// Exported from `pinia.js` for global use.
import { pinia } from './pinia'

// ------------------------------------------------------------
// 🎨 Global Styles
// ------------------------------------------------------------
import './style.css'

// ------------------------------------------------------------
// 🚀 App Initialization
// ------------------------------------------------------------
// 1️⃣ Create Vue instance
// 2️⃣ Register global modules
// 3️⃣ Mount to DOM (#app)
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')

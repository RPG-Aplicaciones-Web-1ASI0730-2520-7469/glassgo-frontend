/* ============================================================
 * 🧠 pinia.js — Global Pinia Configuration
 * ============================================================
 * Pinia is Vue 3’s official state management system.
 * It centralizes data and logic shared across components.
 *
 * In GlassGo, it's used for:
 *  - Managing user sessions (user.store.js)
 *  - Storing language or user preferences
 *  - Synchronizing global states between modules
 * ============================================================ */

// ------------------------------------------------------------
// 📦 Main Import
// ------------------------------------------------------------
// createPinia() → creates a single global store instance.
import { createPinia } from 'pinia'

// ------------------------------------------------------------
// 🚀 Export Global Instance
// ------------------------------------------------------------
// Registered in main.js via app.use(pinia),
// making it available to all components.
//
// Example:
//   import { useUserStore } from '@/stores/user.store'
//   const userStore = useUserStore()
export const pinia = createPinia()

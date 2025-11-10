/* ============================================================
 * 🌐 i18n Configuration — GlassGo
 * ============================================================
 * Central translation system for the entire app.
 * Enables dynamic switching between EN/ES and persists
 * user preference via localStorage.
 * ============================================================ */

// ------------------------------------------------------------
// 📦 Imports
// ------------------------------------------------------------
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

// ------------------------------------------------------------
// 🧠 Initial Locale Setup
// ------------------------------------------------------------
// 1️⃣ Try to load saved language from localStorage.
// 2️⃣ Default to 'en' if none is found.
const saved = localStorage.getItem('lang')
const startLocale = saved || 'en'

// ------------------------------------------------------------
// 🚀 i18n Instance
// ------------------------------------------------------------
export const i18n = createI18n({
    legacy: false,               // Enables Composition API usage
    globalInjection: true,       // Allows $t globally
    locale: startLocale,         // Initial language
    fallbackLocale: 'en',        // Fallback if key is missing
    messages: { en, es }         // Language dictionaries
})

// ------------------------------------------------------------
// 💾 Notes
// ------------------------------------------------------------
// - Language switching is handled by <LangSwitch /> component.
// - Each change is saved in localStorage ("lang").
// - All texts are auto-translated using `t()` from useI18n.
// ------------------------------------------------------------

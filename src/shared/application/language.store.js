// ============================================================
// 🌐 language.store.js — Global language state (Pinia-like)
// ------------------------------------------------------------
// Handles language preference (EN/ES) with reactive sync between
// Vue I18n and localStorage.
// ============================================================

import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * Reactive global state for current language
 * @type {import('vue').Ref<string>}
 */
const currentLang = ref(localStorage.getItem('lang') || 'es')

/**
 * Language Store - Shared Application Layer
 * Manages global language state with reactive synchronization between Vue I18n and localStorage.
 * Provides functions to change language globally across the application.
 *
 * @returns {Object} Store instance with current language and setter function
 */
export function useLanguageStore() {
    const { locale } = useI18n({ useScope: 'global' })

    // Initialize language
    locale.value = currentLang.value

    /**
     * Change language globally
     * Updates both the reactive state and Vue I18n locale, persists to localStorage.
     *
     * @param {string} lang - Language code ('en' or 'es')
     */
    function setLanguage(lang) {
        currentLang.value = lang
        locale.value = lang
        localStorage.setItem('lang', lang)
    }

    // Keep reactive + localStorage synced
    watch(currentLang, (newLang) => {
        locale.value = newLang
        localStorage.setItem('lang', newLang)
    })

    return { currentLang, setLanguage }
}

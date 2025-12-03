// ============================================================
//  language.store.js — Global language state (Pinia-like)
// ------------------------------------------------------------
// Handles language preference (EN/ES) with reactive sync between
// Vue I18n and localStorage.
// ============================================================

import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

// Reactive global state
const currentLang = ref(localStorage.getItem('lang') || 'es')

export function useLanguageStore() {
    const { locale } = useI18n({ useScope: 'global' })

    // Initialize language
    locale.value = currentLang.value

    // Change language globally
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

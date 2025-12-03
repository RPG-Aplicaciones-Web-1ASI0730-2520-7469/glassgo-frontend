import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

const saved = localStorage.getItem('lang')
const startLocale = saved || 'en'

/**
 * Vue I18n instance for internationalization
 * Configured i18n plugin with English and Spanish locales.
 * Supports composition API and global injection for translation functions.
 *
 * @type {import('vue-i18n').I18n}
 */
export const i18n = createI18n({
    legacy: false,               // Enables Composition API usage
    globalInjection: true,       // Allows $t globally
    locale: startLocale,         // Initial language
    fallbackLocale: 'en',        // Fallback if key is missing
    messages: { en, es }         // Language dictionaries
})

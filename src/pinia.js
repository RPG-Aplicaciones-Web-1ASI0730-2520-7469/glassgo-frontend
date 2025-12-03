

import { createPinia } from 'pinia'

/**
 * Global Pinia store instance
 * Configured Pinia instance for state management across the application.
 * Provides reactive state management for user data, language preferences, and module-specific stores.
 *
 * @type {import('pinia').Pinia}
 */
export const pinia = createPinia()

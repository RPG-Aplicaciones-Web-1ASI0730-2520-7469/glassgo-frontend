/**
 * Main Vue Application Entry Point
 * Initializes and configures the GlassGo frontend application.
 * Sets up Vue 3 with Composition API, Pinia for state management,
 * Vue Router for navigation, and Vue I18n for internationalization.
 * Mounts the application to the DOM element with id 'app'.
 *
 * Application Architecture:
 * - Domain-Driven Design (DDD) with layered architecture
 * - Presentation Layer: Vue components and views
 * - Application Layer: Pinia stores and business logic
 * - Domain Layer: Entities and domain models
 * - Infrastructure Layer: API clients and external services
 *
 * @fileoverview Main application bootstrap file
 * @author GlassGo Development Team
 * @version 1.0.0
 */

import { createApp } from 'vue'
import App from './App.vue'


import router from './router'


import { i18n } from './i18n'

import { pinia } from './pinia'

import './style.css'


/**
 * Main Vue application instance
 * Configured Vue app with Pinia, Router, and i18n plugins.
 * Mounted to the #app element in the DOM.
 *
 * @type {import('vue').App}
 */
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')

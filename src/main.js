import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
/* ============================================================
 * main.js — GlassGo Entry Point
 * ============================================================
 * Initializes and mounts the Vue application, registering all
 * global modules required by the system:
 *  - Router (navigation)
 *  - i18n (internationalization)
 *  - Pinia (state management)
 *  - Global styles
 * ============================================================ */

// ------------------------------------------------------------
//  Core Vue Imports
// ------------------------------------------------------------
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

// ------------------------------------------------------------
//  Router
// ------------------------------------------------------------
// Handles navigation between views (home, modules, 404, etc.)
// Defined in `router.js` with full app hierarchy (AppShell + views).
import router from './router'

// ------------------------------------------------------------
// i18n (Internationalization)
// ------------------------------------------------------------
// Loads language dictionaries (en.json / es.json)
// and manages translation across the entire app.
import { i18n } from './i18n'

// ------------------------------------------------------------
//  Pinia (Global State)
// ------------------------------------------------------------
// Centralized state management (user, language, etc.)
// Exported from `pinia.js` for global use.
import { pinia } from './pinia'

// ------------------------------------------------------------
//  Global Styles
// ------------------------------------------------------------
import './style.css'

// ------------------------------------------------------------
// App Initialization
// ------------------------------------------------------------
// Create Vue instance
// Register global modules
// Mount to DOM (#app)
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(PrimeVue)
app.use(ToastService)
app.component('Toast', Toast)
app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('Button', Button)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.mount('#app')

import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
/* ============================================================
 * 🧭 main.js — GlassGo Entry Point
 * ============================================================ */

// ------------------------------------------------------------
//  Core Vue Imports
// ------------------------------------------------------------
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

// PrimeVue v4 (correct import)
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes';   // theme preset

import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

// ------------------------------------------------------------
//  Router
// ------------------------------------------------------------
import router from './router'

// ------------------------------------------------------------
// i18n (Internationalization)
// ------------------------------------------------------------
import { i18n } from './i18n'

// ------------------------------------------------------------
//  Pinia (Global State)
// ------------------------------------------------------------
import { pinia } from './pinia'

// ------------------------------------------------------------
//  Global Styles
// ------------------------------------------------------------
import './style.css'

// ------------------------------------------------------------
// App Initialization
// ------------------------------------------------------------
const app = createApp(App)

// Use PrimeVue plugin with theme preset
app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    ripple: true
});

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')

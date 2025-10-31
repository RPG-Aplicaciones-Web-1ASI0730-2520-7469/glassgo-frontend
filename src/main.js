/* ====================================================
 * 🧭 main.js — Punto de entrada principal de GlassGo
 * ====================================================
 * Este archivo inicializa y monta la aplicación Vue,
 * registrando los módulos globales esenciales del sistema.
 *
 * Incluye:
 *  - Router (navegación entre vistas)
 *  - i18n (internacionalización)
 *  - Pinia (gestión global del estado)
 *  - Estilos globales (style.css)
 * ==================================================== */

/* ----------------------------------------------------
 * 📦 Importaciones base de Vue
 * ----------------------------------------------------
 * createApp → función para crear la instancia raíz de la aplicación.
 * App.vue   → componente principal de la interfaz.
 * ---------------------------------------------------- */
import { createApp } from 'vue'
import App from './App.vue'

/* ----------------------------------------------------
 * 🧭 Enrutador principal
 * ----------------------------------------------------
 * router.js define todas las rutas (home, modules, 404, etc.)
 * y estructura jerárquica de la aplicación (AppShell + vistas).
 * ---------------------------------------------------- */
import router from './router'

/* ----------------------------------------------------
 * 🌐 Internacionalización (i18n)
 * ----------------------------------------------------
 * i18n.js carga los archivos de idioma (en.json / es.json)
 * y aplica traducciones dinámicas en toda la interfaz.
 * ---------------------------------------------------- */
import { i18n } from './i18n'

/* ----------------------------------------------------
 * 🧠 Pinia (Gestión global del estado)
 * ----------------------------------------------------
 * pinia.js exporta la instancia global de Pinia, usada
 * para manejar el estado compartido (usuario, idioma, etc.)
 * en toda la aplicación.
 * ---------------------------------------------------- */
import { pinia } from './pinia'

/* ----------------------------------------------------
 * 🎨 Estilos globales
 * ----------------------------------------------------
 * Archivo CSS base con estilos comunes a toda la interfaz.
 * ---------------------------------------------------- */
import './style.css'

/* ----------------------------------------------------
 * 🚀 Inicialización de la aplicación GlassGo
 * ----------------------------------------------------
 * 1️⃣ Se crea la instancia de Vue.
 * 2️⃣ Se registran los módulos globales (pinia, router, i18n).
 * 3️⃣ Se monta la aplicación en el elemento #app del DOM.
 * ---------------------------------------------------- */
const app = createApp(App)
app.use(pinia)   // Estado global
app.use(router)  // Enrutamiento
app.use(i18n)    // Internacionalización
app.mount('#app')

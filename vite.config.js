/* ====================================================
 * ⚙️ vite.config.js — Configuración del entorno Vite
 * ====================================================
 * Este archivo define la configuración base del *build system*
 * de GlassGo, utilizando **Vite** como herramienta principal
 * para el desarrollo, compilación y optimización del frontend.
 *
 * Funcionalidades clave:
 *  - Carga y procesamiento de archivos `.vue`
 *  - Definición de alias de rutas (ej. `@/` → `/src`)
 *  - Soporte para módulos ES y hot-reload en desarrollo
 * ==================================================== */

/* ----------------------------------------------------
 * 📦 Plugin principal de Vue
 * ----------------------------------------------------
 * Permite a Vite reconocer y procesar componentes `.vue`.
 * Sin este plugin, Vite no sabría cómo interpretar archivos Vue.
 * ---------------------------------------------------- */
import vue from '@vitejs/plugin-vue'

/* ----------------------------------------------------
 * 🚀 Exportación de configuración
 * ----------------------------------------------------
 * Define los plugins y resoluciones personalizadas
 * usadas en toda la aplicación.
 * ---------------------------------------------------- */
export default {
    /* --------------------------------------------------
     * 🧩 Plugins registrados
     * --------------------------------------------------
     * Incluye soporte para componentes Vue.
     * Se pueden agregar más plugins si la app los requiere
     * (por ejemplo, analizador de dependencias o SVG loader).
     * -------------------------------------------------- */
    plugins: [vue()],

    /* --------------------------------------------------
     * 🧭 Alias de rutas
     * --------------------------------------------------
     * Permite importar archivos con rutas cortas.
     *
     * Ejemplo:
     *   import Logo from '@/assets/logo-glassgo.jpg'
     *   en lugar de:
     *   import Logo from '../../assets/logo-glassgo.jpg'
     * -------------------------------------------------- */
    resolve: {
        alias: {
            '@': '/src'
        }
    }
}

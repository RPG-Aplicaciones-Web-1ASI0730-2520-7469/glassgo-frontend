/* ====================================================
 * 🧠 pinia.js — Configuración global de Pinia
 * ====================================================
 * Pinia es el sistema oficial de gestión de estado para Vue 3.
 * Permite centralizar datos y lógica que deben ser accesibles
 * desde distintos componentes o vistas de la aplicación.
 *
 * En GlassGo se utiliza, por ejemplo, para:
 *  - Mantener la sesión del usuario actual (user.store.js)
 *  - Almacenar configuraciones de idioma o preferencias
 *  - Sincronizar estados globales entre módulos
 * ==================================================== */

/* ----------------------------------------------------
 * 📦 Importación principal
 * ----------------------------------------------------
 * createPinia() → crea una instancia única del store global.
 * ---------------------------------------------------- */
import { createPinia } from 'pinia'

/* ----------------------------------------------------
 * 🚀 Exportación de la instancia global
 * ----------------------------------------------------
 * La instancia se registra en main.js mediante app.use(pinia),
 * quedando disponible para todos los componentes.
 *
 * Ejemplo de uso:
 *   import { useUserStore } from '@/stores/user.store'
 *   const userStore = useUserStore()
 * ---------------------------------------------------- */
export const pinia = createPinia()

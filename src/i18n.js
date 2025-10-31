/* ----------------------------------------------------
 * 🌐 Configuración de internacionalización (i18n)
 * ----------------------------------------------------
 * Este módulo define la configuración central del sistema
 * de traducciones de GlassGo. Permite alternar dinámicamente
 * entre idiomas (EN/ES) y recordar la preferencia del usuario.
 * ---------------------------------------------------- */

// ----------------------------------------------------
// 📦 Importaciones principales
// ----------------------------------------------------
// - createI18n: función que crea la instancia del sistema i18n.
// - en / es: archivos de traducción localizados dentro de /locales.
// ----------------------------------------------------
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

/* ----------------------------------------------------
 * 🧠 Idioma inicial del sistema
 * ----------------------------------------------------
 * 1️⃣ Verifica si el usuario tiene un idioma guardado
 *     previamente en localStorage.
 * 2️⃣ Si existe, lo usa como idioma inicial.
 * 3️⃣ Si no existe, usa “en” (inglés) como valor por defecto.
 * ---------------------------------------------------- */
const saved = localStorage.getItem('lang')
const startLocale = saved || 'en'

/* ----------------------------------------------------
 * 🚀 Creación de la instancia i18n
 * ----------------------------------------------------
 * - legacy: false → permite usar la API Composition de Vue.
 * - globalInjection: true → habilita acceso global a $t y $i18n.
 * - locale: idioma inicial determinado por la variable startLocale.
 * - fallbackLocale: idioma alternativo si falta una traducción.
 * - messages: define los diccionarios de idiomas (EN y ES).
 * ---------------------------------------------------- */
export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: startLocale,
    fallbackLocale: 'en',
    messages: { en, es }
})

/* ----------------------------------------------------
 * 💾 Notas adicionales:
 * ----------------------------------------------------
 * - El cambio de idioma se realiza desde el componente Topbar.
 * - Cada vez que el usuario cambia el idioma, este se guarda
 *   en localStorage (“lang”), garantizando persistencia entre sesiones.
 * - Los textos se traducen automáticamente mediante la función t().
 * ---------------------------------------------------- */

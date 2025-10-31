/* ====================================================
 * 📁 src/stores/user.store.js
 * ====================================================
 * 👤 Store global del usuario (Pinia)
 * ----------------------------------------------------
 * Este módulo centraliza el manejo del estado del usuario
 * autenticado en toda la aplicación GlassGo.
 *
 * Funcionalidades:
 *  - Obtener el usuario desde JSON Server (db.json).
 *  - Acceder al rol, nombre completo e iniciales.
 *  - Compartir la información del usuario entre componentes.
 *
 * Ejemplo de origen de datos:
 *   http://localhost:3000/users/1
 * ==================================================== */

import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
    /* ----------------------------------------------------
     * 🧠 Estado (State)
     * ----------------------------------------------------
     * Contiene los datos reactivamente accesibles por toda la app.
     * user → objeto con los datos del usuario actual.
     * loading → indica si se está obteniendo información del servidor.
     * error → almacena mensajes en caso de fallo de conexión.
     * ---------------------------------------------------- */
    state: () => ({
        user: null,
        loading: false,
        error: null
    }),

    /* ----------------------------------------------------
     * ⚙️ Acciones (Actions)
     * ----------------------------------------------------
     * Métodos que modifican el estado global.
     * Se encargan de la comunicación con el backend o JSON Server.
     * ---------------------------------------------------- */
    actions: {
        /**
         * 🔄 fetchUser()
         * Obtiene los datos del usuario desde JSON Server.
         * En este caso, simula un login cargando el ID=1.
         */
        async fetchUser() {
            this.loading = true
            this.error = null

            try {
                const response = await axios.get('http://localhost:3000/users/1')
                this.user = response.data
            } catch (err) {
                console.error('Error al obtener usuario:', err)
                this.error = 'No se pudo cargar la información del usuario.'
            } finally {
                this.loading = false
            }
        },

        /**
         * ✏️ setUser()
         * Permite modificar el usuario manualmente (ej. al actualizar perfil).
         */
        setUser(userData) {
            this.user = userData
        },

        /**
         * 🚪 clearUser()
         * Limpia los datos del usuario (ej. al cerrar sesión).
         */
        clearUser() {
            this.user = null
        }
    },

    /* ----------------------------------------------------
     * 🔍 Getters (Propiedades derivadas)
     * ----------------------------------------------------
     * Devuelven valores calculados automáticamente
     * según el estado actual del usuario.
     * ---------------------------------------------------- */
    getters: {
        /**
         * 🧾 fullName → combina nombre y apellido del usuario.
         * Ejemplo: "Usuario Demo"
         */
        fullName: (state) => {
            if (!state.user) return ''
            return `${state.user.firstName} ${state.user.lastName}`
        },

        /**
         * 🔠 initials → genera las iniciales del usuario.
         * Ejemplo: "Usuario Demo" → "UD"
         */
        initials: (state) => {
            if (!state.user) return ''
            const f = state.user.firstName?.[0]?.toUpperCase() || ''
            const l = state.user.lastName?.[0]?.toUpperCase() || ''
            return f + l
        },

        /**
         * 🧩 role → devuelve el rol actual del usuario (admin, distributor, etc.)
         * Utilizado en la Topbar.
         */
        role: (state) => state.user?.role || 'demo',

        /**
         * ⚙️ isAuthenticated → true si hay usuario cargado.
         */
        isAuthenticated: (state) => !!state.user
    }
})

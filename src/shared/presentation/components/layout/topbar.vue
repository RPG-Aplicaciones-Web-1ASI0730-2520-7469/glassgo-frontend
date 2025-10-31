<template>
  <header class="topbar">
    <!-- ☰ Botón del menú lateral (hamburguesa)
         Emite el evento 'toggle-sidebar' al componente padre (AppShell),
         permitiendo mostrar u ocultar la barra lateral -->
    <button class="hamburger" @click="$emit('toggle-sidebar')">
      ☰
    </button>

    <!-- 🔹 Rol dinámico del usuario (ej. DISTRIBUTOR, ADMIN, DEMO)
         Se traduce automáticamente según el idioma activo -->
    <div class="role-pill">
      {{ t(`roles.${user?.role || 'role'}`) }}
    </div>

    <!-- 🔸 Espaciador flexible (push)
         Empuja los elementos siguientes hacia el extremo derecho -->
    <div class="spacer"></div>

    <!-- 🌐 Selector de idioma (EN / ES)
         Permite cambiar el idioma global de la aplicación -->
    <div class="lang-switch">
      <button :class="{ active: locale === 'en' }" @click="switchLang('en')">
        EN
      </button>

      <button :class="{ active: locale === 'es' }" @click="switchLang('es')">
        ES
      </button>
    </div>

    <!-- 👤 Información del usuario actual (nombre + avatar con iniciales)
         Solo se muestra si el usuario fue cargado correctamente -->
    <div class="user">
      <span class="name">
        {{ user?.firstName || t('fallbackUser.name') }}
        {{ user?.lastName || t('fallbackUser.lastname') }}
      </span>

      <div class="avatar">
        {{ initials || '?' }}
      </div>
    </div>
  </header>
</template>

<script setup>
/* ----------------------------------------------------
 * 🧩 Importaciones principales de Vue
 * ----------------------------------------------------
 * computed   → permite crear propiedades reactivas derivadas.
 * onMounted  → ejecuta código tras montar el componente.
 * ---------------------------------------------------- */
import { computed, onMounted } from 'vue'

/* ----------------------------------------------------
 * 🧠 Pinia Store (estado global)
 * ----------------------------------------------------
 * useUserStore → store global del usuario autenticado.
 * Contiene los datos obtenidos desde db.json.
 * ---------------------------------------------------- */
import { useUserStore } from '@/stores/user.store'

/* ----------------------------------------------------
 * 🌐 Internacionalización (i18n)
 * ----------------------------------------------------
 * useI18n → permite traducir textos dinámicamente.
 * t       → función traductora.
 * locale  → idioma activo actual.
 * ---------------------------------------------------- */
import { useI18n } from 'vue-i18n'

/* ----------------------------------------------------
 * 🧭 Instancias globales
 * ---------------------------------------------------- */
const { t, locale } = useI18n({ useScope: 'global' })
const userStore = useUserStore()

/* ----------------------------------------------------
 * 🌍 Cambio de idioma
 * ----------------------------------------------------
 * switchLang → cambia el idioma global (EN/ES) y guarda
 * la selección en localStorage para persistencia.
 * ---------------------------------------------------- */
function switchLang(lang) {
  locale.value = lang
  localStorage.setItem('lang', lang)
}

/* ----------------------------------------------------
 * 👤 Carga inicial del usuario
 * ----------------------------------------------------
 * Al montar el componente se ejecuta fetchUser()
 * desde el store global. Si el usuario ya está cargado,
 * no se repite la solicitud al servidor.
 * ---------------------------------------------------- */
onMounted(() => {
  if (!userStore.user) {
    userStore.fetchUser()
  }
})

/* ----------------------------------------------------
 * 🧩 Propiedades computadas
 * ----------------------------------------------------
 * user      → accede al usuario desde el store global.
 * initials  → obtiene las iniciales calculadas automáticamente
 *             mediante el getter del store (no necesita lógica local).
 * ---------------------------------------------------- */
const user = computed(() => userStore.user)
const initials = computed(() => {
  if (!user.value) return '?' // Si no hay usuario, muestra '?'
  const first = user.value.firstName?.[0]?.toUpperCase() || ''
  const last = user.value.lastName?.[0]?.toUpperCase() || ''
  return (first + last) || '?' // Si no tiene nombre, igual '?'
})
</script>

<style scoped>
/* ----------------------------------------------------
 * 🎨 Estilo general de la barra superior (Topbar)
 * ----------------------------------------------------
 * Barra horizontal fija en la parte superior del layout principal.
 * Contiene navegación de idioma, rol de usuario e información del perfil.
 * ---------------------------------------------------- */
.topbar {
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #e9eef5;
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  gap: 0.75rem;
}

/* ----------------------------------------------------
 * ☰ Botón del menú hamburguesa (sidebar toggle)
 * ----------------------------------------------------
 * Permite mostrar/ocultar el menú lateral en pantallas pequeñas.
 * ---------------------------------------------------- */
.hamburger {
  border: none;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
  color: #1e293b;
}

/* ----------------------------------------------------
 * 🔹 Píldora que muestra el rol del usuario actual
 * ---------------------------------------------------- */
.role-pill {
  font-size: 12px;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  border: none;
  background-color: #e8f0ff; /* Azul claro */
  color: #2563eb;            /* Azul principal */
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: lowercase;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2);
}

/* ----------------------------------------------------
 * 🧩 Espaciador flexible
 * ---------------------------------------------------- */
.spacer {
  flex: 1;
}

/* ----------------------------------------------------
 * 🌐 Selector de idioma (EN / ES)
 * ---------------------------------------------------- */
.lang-switch {
  display: flex;
  border: 1px solid #e5eaf0;
  border-radius: 12px; /* Bordes suaves */
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0 0 1px #e5eaf0;
}

.lang-switch button {
  border: none;
  background: none;
  padding: 0.3rem 0.4rem;
  font-size: 13px;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.25s ease;
  color: #475569;
}

/* Hover sobre los botones de idioma */
.lang-switch button:hover {
  background: #f1f5f9;
}

/* Estado activo del idioma */
.lang-switch .active {
  background: #0f172a;
  color: #fff;
  font-weight: 700;
}

/* ----------------------------------------------------
 * 👤 Contenedor del usuario
 * ---------------------------------------------------- */
.user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  background: #f6f8fb;
}

/* Nombre completo del usuario */
.name {
  font-size: 13px;
  font-weight: 600;
}

/* Avatar circular con iniciales del usuario */
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  background: #e3ebf7;
  color: #1e293b;
  font-weight: 600;
  cursor: pointer;
}
</style>

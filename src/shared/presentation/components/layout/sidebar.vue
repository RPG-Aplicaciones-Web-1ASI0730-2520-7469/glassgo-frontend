<template>
  <!-- Contenedor raíz del sidebar -->
  <div>
    <!-- ------------------------------------------------------------
         🌓 Capa oscura (overlay)
         ------------------------------------------------------------
         - Solo visible en pantallas pequeñas cuando el sidebar está abierto.
         - Cubre el resto del contenido para dar efecto de modal.
         - Al hacer clic, emite el evento 'close' al padre (AppShell)
           para cerrar el panel lateral.
         ------------------------------------------------------------ -->
    <div
        v-if="open && !desktop"
        class="overlay"
        @click="$emit('close')"
    ></div>

    <!-- ------------------------------------------------------------
         🧭 Sidebar principal (menú lateral de navegación)
         ------------------------------------------------------------
         - Contiene el logotipo y las opciones de navegación principales.
         - Se muestra u oculta según el valor de la prop "open".
         ------------------------------------------------------------ -->
    <aside class="sidebar" :class="{ open }">
      <!-- 🔹 Sección de marca (logo GlassGo centrado) -->
      <div class="brand">
        <img :src="logo" alt="GlassGo Logo" class="brand-logo" />
      </div>

      <!-- 🔸 Navegación principal del sistema -->
      <nav class="menu">
        <!-- Enlace a la página de inicio -->
        <RouterLink to="/app/home" class="item">
          {{ t('sidebar.home') }}
        </RouterLink>

        <!-- Enlace a la sección de módulos (en desarrollo) -->
        <RouterLink to="/app/modules" class="item">
          {{ t('sidebar.modules') }}
        </RouterLink>
      </nav>
    </aside>
  </div>
</template>

<script setup>
/* ----------------------------------------------------
 * 🧩 Importaciones principales
 * ----------------------------------------------------
 * - computed: permite crear propiedades reactivas derivadas.
 * - RouterLink: componente de navegación nativo de Vue Router.
 * ---------------------------------------------------- */
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

/* ----------------------------------------------------
 * 🖼️ Recursos estáticos
 * ----------------------------------------------------
 * - Se importa el logotipo institucional GlassGo desde la carpeta /assets.
 * ---------------------------------------------------- */
import logo from '@/assets/logo-glassgo.jpg'

/* ----------------------------------------------------
 * ⚙️ Propiedades del componente
 * ----------------------------------------------------
 * - open: indica si el sidebar está visible o no.
 *   (controlado desde el componente AppShell a través de v-bind)
 * ---------------------------------------------------- */
const props = defineProps({
  open: { type: Boolean, default: true },
})

/* ----------------------------------------------------
 * 💻 Detección de tipo de dispositivo
 * ----------------------------------------------------
 * - Computa si el ancho de pantalla actual pertenece a modo escritorio.
 * - Permite mantener el sidebar siempre visible en pantallas grandes (>=1024px).
 * ---------------------------------------------------- */
const desktop = computed(() =>
    window.matchMedia('(min-width:1024px)').matches
)

/* ----------------------------------------------------
 * 🌐 Internacionalización (i18n)
 * ----------------------------------------------------
 * - Permite traducir las etiquetas del menú lateral según el idioma activo.
 * ---------------------------------------------------- */
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
/* ----------------------------------------------------
 * 🌑 Capa oscura de fondo (overlay)
 * ----------------------------------------------------
 * - Se muestra al abrir el sidebar en móviles.
 * - Evita interacción con el contenido principal.
 * ---------------------------------------------------- */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 40;
}

/* ----------------------------------------------------
 * 🧭 Contenedor principal del sidebar
 * ----------------------------------------------------
 * - Fijo al lado izquierdo de la ventana.
 * - Deslizable en pantallas pequeñas.
 * ---------------------------------------------------- */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  background: #fff;
  border-right: 1px solid #e9eef5;
  z-index: 50;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
}

/* Estado visible (sidebar desplegado) */
.sidebar.open {
  transform: translateX(0);
}

/* ----------------------------------------------------
 * 💻 Comportamiento en pantallas grandes
 * ----------------------------------------------------
 * - El sidebar siempre permanece visible.
 * ---------------------------------------------------- */
@media (min-width: 1024px) {
  .sidebar {
    transform: translateX(0);
  }
}

/* ----------------------------------------------------
 * 🖼️ Sección de marca (logotipo)
 * ----------------------------------------------------
 * - Centra el logo vertical y horizontalmente.
 * - Incluye una línea inferior decorativa.
 * ---------------------------------------------------- */
.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e9eef5;
}

.brand-logo {
  height: 100px; /* ajustable según diseño */
  object-fit: contain;
  display: block;
}

/* ----------------------------------------------------
 * 📋 Menú de navegación
 * ----------------------------------------------------
 * - Agrupa los enlaces principales del sistema.
 * ---------------------------------------------------- */
.menu {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.25rem;
}

/* ----------------------------------------------------
 * 🔗 Elementos del menú
 * ----------------------------------------------------
 * - Cada enlace de navegación (RouterLink).
 * - Cambia color al pasar el cursor o activarse.
 * ---------------------------------------------------- */
.item {
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  color: #202733;
  transition: background 0.2s ease;
}

/* Hover (resalta el enlace) */
.item:hover {
  background: #f3f6fb;
}

/* Estado activo (ruta actual) */
.item.router-link-active {
  background: #f0f3f8;
  font-weight: 600;
}
</style>

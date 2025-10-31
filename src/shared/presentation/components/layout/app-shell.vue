<template>
  <!-- ------------------------------------------------------------
       🧱 Estructura principal del layout (AppShell)
       ------------------------------------------------------------
       Este componente define la estructura general de la aplicación,
       combinando la barra lateral (Sidebar), la barra superior (Topbar)
       y el área de contenido dinámico (RouterView).
       ------------------------------------------------------------ -->
  <div class="app-shell">
    <!-- 🔹 Sidebar
         - Siempre montada en el DOM, se muestra/oculta por CSS.
         - La clase dinámica "open" controla su visibilidad.
         - No se destruye al ocultarse, solo se desliza fuera del viewport. -->
    <Sidebar class="sidebar" :class="{ open: sidebarOpen }" />

    <!-- 🔸 Área principal
         - Contiene la barra superior y el contenido dinámico.
         - Cambia el margen izquierdo cuando el sidebar está visible. -->
    <div class="main-area" :class="{ 'no-sidebar': !sidebarOpen }">
      <!-- Barra superior (Topbar)
           - Escucha el evento personalizado “toggle-sidebar” para abrir/cerrar. -->
      <Topbar @toggle-sidebar="toggleSidebar" />

      <!-- Contenido dinámico (vistas según ruta)
           - Se cierra el sidebar en móviles si se hace clic fuera de él. -->
      <main class="content" @click="closeSidebarIfMobile">
        <router-view />
      </main>
      <!-- 🦶 Pie de página global -->
      <FooterContent />
    </div>
  </div>
</template>

<script setup>
/* ----------------------------------------------------
 * 🧩 Importaciones principales de Vue
 * ----------------------------------------------------
 * - ref: crea variables reactivas.
 * - onMounted / onUnmounted: manejan efectos al montar y desmontar.
 * ---------------------------------------------------- */
import { ref, onMounted, onUnmounted } from 'vue'

/* ----------------------------------------------------
 * 🧱 Componentes del layout
 * ----------------------------------------------------
 * - Sidebar: menú lateral de navegación.
 * - Topbar: barra superior con idioma, usuario y control del sidebar.
 * - FooterContent: pie de página global con información institucional
 * ---------------------------------------------------- */
import Sidebar from './sidebar.vue'
import Topbar from './topbar.vue'
import FooterContent from './footer-content.vue'

/* ----------------------------------------------------
 * 📱 Estado del sidebar
 * ----------------------------------------------------
 * - sidebarOpen: controla si la barra lateral está visible o no.
 * ---------------------------------------------------- */
const sidebarOpen = ref(true)

/**
 * Cambia el estado del sidebar (mostrar / ocultar)
 * Se activa desde el botón hamburguesa del Topbar.
 */
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

/**
 * Cierra automáticamente el sidebar en pantallas pequeñas
 * si el usuario hace clic en cualquier parte del contenido.
 */
function closeSidebarIfMobile() {
  if (window.innerWidth < 1024 && sidebarOpen.value) {
    sidebarOpen.value = false
  }
}

/**
 * Ajusta el estado del sidebar según el tamaño de la ventana.
 * - Si el ancho ≥ 1024px → visible por defecto.
 * - Si el ancho < 1024px → oculto.
 */
function handleResize() {
  sidebarOpen.value = window.innerWidth >= 1024
}

/* ----------------------------------------------------
 * ⚙️ Ciclo de vida del componente
 * ----------------------------------------------------
 * - Al montar: inicializa el estado según el tamaño de pantalla.
 * - Al desmontar: limpia el event listener para evitar fugas de memoria.
 * ---------------------------------------------------- */
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* ----------------------------------------------------
 * 🎨 Estructura general del layout
 * ----------------------------------------------------
 * Define el contenedor principal con un diseño flexible,
 * donde el sidebar y el contenido principal coexisten.
 * ---------------------------------------------------- */
.app-shell {
  display: flex;
  min-height: 100vh;
  background: #f6f8fb; /* Color de fondo general */
  overflow: hidden;
}

/* ----------------------------------------------------
 * 🧭 Sidebar (menú lateral)
 * ----------------------------------------------------
 * Siempre presente en el DOM, pero desplazado fuera del viewport
 * cuando está cerrado (usando transform).
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

/* Estado visible del sidebar */
.sidebar.open {
  transform: translateX(0);
}

/* ----------------------------------------------------
 * 🧩 Área principal (contenido + topbar)
 * ----------------------------------------------------
 * - Ocupa todo el espacio restante a la derecha del sidebar.
 * - El margen izquierdo se ajusta dinámicamente.
 * ---------------------------------------------------- */
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 260px; /* espacio ocupado por el sidebar */
  transition: margin-left 0.25s ease;
}

/* Cuando el sidebar está cerrado */
.main-area.no-sidebar {
  margin-left: 0;
}

/* ----------------------------------------------------
 * 📄 Contenedor del contenido dinámico
 * ----------------------------------------------------
 * - Centra vertical y horizontalmente el contenido actual.
 * - El fondo coincide con el tono principal de la app.
 * ---------------------------------------------------- */
.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f8fb;
  padding: 2rem;
}

/* ----------------------------------------------------
 * 📱 Diseño responsivo
 * ----------------------------------------------------
 * En pantallas pequeñas, el contenido ocupa todo el ancho,
 * sin margen lateral.
 * ---------------------------------------------------- */
@media (max-width: 1024px) {
  .main-area {
    margin-left: 0;
  }
}
</style>

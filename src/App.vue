<!-- =========================================================
     🧩 App.vue — Componente raíz de la aplicación GlassGo
     =========================================================
     Este archivo representa el punto de entrada visual de la
     aplicación Vue. Aquí se renderizan dinámicamente las vistas
     según la ruta activa, utilizando el componente <router-view />.
     ---------------------------------------------------------
     📁 Relación jerárquica:
       index.html   → Contiene el <div id="app">
       main.js      → Monta App.vue dentro del div raíz
       App.vue      → Renderiza las rutas con <router-view />
     ========================================================= -->

<template>
  <!--
    📍 Contenedor principal del enrutador
    <router-view /> actúa como un "marco dinámico" donde se
    inyectan los componentes de cada vista según la ruta activa.
    Ejemplo:
      - /app/home       → muestra Home.vue
      - /app/modules    → muestra ComingSoon.vue
      - /app/404 o ruta inexistente → muestra PageNotFound.vue
  -->
  <router-view />
</template>

<script setup>
/* ----------------------------------------------------
 * 🧠 Script vacío (Composition API)
 * ----------------------------------------------------
 * Este componente no requiere lógica propia,
 * ya que toda la gestión de rutas se maneja desde router.js.
 * ---------------------------------------------------- */
</script>

<style scoped>
/* ----------------------------------------------------
 * 🎨 Estilos globales (opcionales)
 * ----------------------------------------------------
 * En este caso no se aplican estilos directos al App.vue,
 * pues cada vista o layout define su propio estilo.
 * Si se quisieran aplicar fondos o temas globales,
 * podrían definirse aquí.
 * ---------------------------------------------------- */
</style>

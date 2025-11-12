<!-- =========================================================
     🧩 App.vue — Root Component (GlassGo)
     =========================================================
     The visual entry point of the Vue application.
     Dynamically renders the active route via <router-view />.
     ---------------------------------------------------------
     📁 Hierarchy:
       index.html   → contains <div id="app">
       main.js      → mounts App.vue inside the root div
       App.vue      → displays routes through <router-view />
     ========================================================= -->

<template>
  <!--
    📍 Main router container
    <router-view /> acts as a dynamic frame where
    components are injected depending on the active route.

    Examples:
      /app/home       → Home.vue
      /app/modules    → ComingSoon.vue
      /app/404        → PageNotFound.vue
  -->
  <router-view />
</template>

<script setup>
/* ----------------------------------------------------------
 * 🧠 No internal logic
 * ----------------------------------------------------------
 * All routing is managed through router.js.
 * App.vue serves purely as the render container.
 * ---------------------------------------------------------- */
</script>

<style scoped>
/* ----------------------------------------------------------
 * 🎨 Global Styles (optional)
 * ----------------------------------------------------------
 * No direct styling applied here; each layout/view defines
 * its own theme. Global backgrounds or themes could go here.
 * ---------------------------------------------------------- */
</style>

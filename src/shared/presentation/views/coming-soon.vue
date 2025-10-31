<template>
  <!-- ------------------------------------------------------------
       🚧 Vista temporal: Coming Soon
       ------------------------------------------------------------
       - Página informativa que se muestra para módulos en desarrollo.
       - Mantiene el diseño limpio y centrado, coherente con el branding GlassGo.
       - Utiliza animación y mensajes traducibles mediante i18n.
       ------------------------------------------------------------ -->
  <section class="coming-soon">
    <div class="content">
      <!-- Ícono decorativo con animación (indicador visual de construcción) -->
      <div class="icon">🚧</div>

      <!-- Título traducible -->
      <h1>{{ t('comingSoon.title') }}</h1>

      <!-- Mensaje descriptivo traducible -->
      <p>{{ t('comingSoon.message') }}</p>
    </div>
  </section>
</template>

<script setup>
/* ----------------------------------------------------
 * 🌐 Internacionalización (i18n)
 * ----------------------------------------------------
 * - Permite mostrar el título y mensaje en el idioma activo.
 * - Las claves se definen en /locales/en.json y /locales/es.json.
 * ---------------------------------------------------- */
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped>
/* ----------------------------------------------------
 * 🎨 Contenedor principal de la vista "Coming Soon"
 * ----------------------------------------------------
 * - Centra vertical y horizontalmente el contenido.
 * - Mantiene fondo gris claro coherente con el layout GlassGo.
 * ---------------------------------------------------- */
.coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f6f8fb;
  text-align: center;
  padding: 2rem;
}

/* ----------------------------------------------------
 * 📦 Contenedor interno del contenido
 * ----------------------------------------------------
 * - Caja blanca con sombra suave y bordes redondeados.
 * - Diseño centrado y espacioso, tipo "card".
 * ---------------------------------------------------- */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 400px;
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

/* ----------------------------------------------------
 * 🚧 Ícono decorativo
 * ----------------------------------------------------
 * - Emoji animado que rebota suavemente (indicador de trabajo en progreso).
 * ---------------------------------------------------- */
.icon {
  font-size: 3rem;
  animation: bounce 1.2s infinite;
}

/* ----------------------------------------------------
 * 🏷️ Título principal
 * ----------------------------------------------------
 * - Traducción del texto “Próximamente”.
 * ---------------------------------------------------- */
h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

/* ----------------------------------------------------
 * 📝 Descripción informativa
 * ----------------------------------------------------
 * - Mensaje explicativo traducible.
 * ---------------------------------------------------- */
p {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

/* ----------------------------------------------------
 * 🌀 Animación “bounce” (rebote)
 * ----------------------------------------------------
 * - Aplica movimiento vertical periódico al ícono 🚧.
 * ---------------------------------------------------- */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
</style>

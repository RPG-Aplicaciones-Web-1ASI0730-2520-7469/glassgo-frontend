<template>
  <!-- ============================================================
       Coming Soon — Temporary View
       ------------------------------------------------------------
       Placeholder view for modules under development.
       Keeps a clean, centered layout consistent with GlassGo branding.
       ============================================================ -->
  <section class="coming-soon">
    <div class="content">
      <!-- Decorative animated icon -->
      <div class="icon">🚧</div>

      <!-- Translated title -->
      <h1>{{ t('comingSoon.title') }}</h1>

      <!-- Translated message -->
      <p>{{ t('comingSoon.message') }}</p>
    </div>
  </section>
</template>

<script setup>
/* ============================================================
 * i18n Integration
 * ------------------------------------------------------------
 * Enables translations for title and message.
 * Keys are defined in /locales/en.json and /locales/es.json.
 * ============================================================ */
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped>
/* ============================================================
 * Layout — Coming Soon
 * ============================================================ */
.coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f6f8fb;
  text-align: center;
  padding: 2rem;
}

/* Content card */
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

/* Animated icon */
.icon {
  font-size: 3rem;
  animation: bounce 1.2s infinite;
}

/* Title */
h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

/* Description */
p {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

/* Bounce animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
</style>

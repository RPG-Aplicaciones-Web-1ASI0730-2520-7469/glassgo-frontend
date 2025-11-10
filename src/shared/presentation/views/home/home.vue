<template>
  <!-- ============================================================
       🏠 Home View — GlassGo
       ------------------------------------------------------------
       Displays a welcome message and a floating connection card
       that visually indicates connection status:
       ✅ Green → Success
       ❌ Red   → Failure
       ============================================================ -->
  <div class="welcome">
    <ConnectionStatus /> <!-- ✅ Floating status card -->

    <!-- 🌍 Translatable content (i18n) -->
    <h1>{{ t('homeView.welcome') }}</h1>
    <p>{{ t('homeView.description') }}</p>
  </div>
</template>

<script setup>
/* ============================================================
 * 🧩 Imports
 * ------------------------------------------------------------
 * - ConnectionStatus → reusable network indicator component
 * - useI18n → provides translation capability
 * ============================================================ */
import ConnectionStatus from '@/shared/presentation/components/ui/connection-status.vue'
import { useI18n } from 'vue-i18n'

/* ============================================================
 * 🌐 Internationalization (i18n)
 * ------------------------------------------------------------
 * - Retrieves global translation context to access `t()`
 * ============================================================ */
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped>
/* ============================================================
 * 🎨 Layout — Home Page
 * ------------------------------------------------------------
 * - Centers content vertically and horizontally
 * - Clean, simple layout for a first-time user view
 * ============================================================ */
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  position: relative;
  font-size: 20px;
}
</style>

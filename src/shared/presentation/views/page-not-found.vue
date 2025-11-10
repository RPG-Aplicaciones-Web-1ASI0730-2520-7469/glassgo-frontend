<template>
  <!-- ============================================================
       🚫 404 — Page Not Found
       ------------------------------------------------------------
       Displayed when a user navigates to a non-existent route.
       Includes a friendly message and a button to return home.
       ============================================================ -->
  <div class="notfound">
    <div class="content">
      <h1 class="code">404</h1>
      <p class="message">{{ t('notfound.message') }}</p>
      <RouterLink to="/app/home" class="back-btn">
        {{ t('notfound.back') }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
/* ============================================================
 * 🧭 Routing & i18n Setup
 * ------------------------------------------------------------
 * - RouterLink → enables in-app navigation.
 * - useI18n → provides translated texts (global scope).
 * ============================================================ */
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped>
/* ============================================================
 * 🎨 Layout — 404 Page
 * ============================================================ */
.notfound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  text-align: center;
  color: #1e293b;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: fadeIn 1.5s ease;
}

/* Error Code */
.code {
  font-size: 7rem;
  font-weight: 800;
  color: #2563eb;
  margin: 0;
  animation: float404 3s ease-in-out infinite;
}

/* Floating 404 Animation */
@keyframes float404 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Message */
.message {
  font-size: 1.1rem;
  color: #64748b;
  max-width: 380px;
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Back Button */
.back-btn {
  display: inline-block;
  background-color: #2563eb;
  color: #fff;
  text-decoration: none;
  padding: 0.65rem 1.7rem;
  border-radius: 10px;
  font-weight: 600;
  transition: background 0.3s ease;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}
.back-btn:hover {
  background-color: #1d4ed8;
}

/* Fade-in animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

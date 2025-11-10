<template>
  <!-- ============================================================
       🌐 Language Switch Component
       ------------------------------------------------------------
       - Global UI element to toggle app language (EN / ES).
       - Uses the reactive state from `language.store.js`.
       ============================================================ -->
  <div class="lang-switch">
    <button
        :class="{ active: currentLang === 'en' }"
        @click="setLanguage('en')"
    >
      EN
    </button>
    <button
        :class="{ active: currentLang === 'es' }"
        @click="setLanguage('es')"
    >
      ES
    </button>
  </div>
</template>

<script setup>
/* ============================================================
 * 🧠 Logic — Language Switcher
 * ------------------------------------------------------------
 * - Imports `useLanguageStore` for global language control.
 * - Updates language via Pinia store (shared/application).
 * ============================================================ */
import { useLanguageStore } from '@/shared/application/language.store'

const { currentLang, setLanguage } = useLanguageStore()
</script>

<style scoped>
/* ============================================================
 * 🎨 Styles — Language Switch
 * ============================================================ */
.lang-switch {
  display: flex;
  border: 1px solid #e5eaf0;
  border-radius: 12px;
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

/* 🖱️ Hover effect */
.lang-switch button:hover {
  background: #f1f5f9;
}

/* ✅ Active language */
.lang-switch .active {
  background: #0f172a;
  color: #fff;
  font-weight: 700;
}
</style>

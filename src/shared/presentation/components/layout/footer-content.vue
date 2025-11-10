<template>
  <!-- ============================================================
       🦶 Footer Component
       ------------------------------------------------------------
       Global footer for the main layout.
       Displays reserved rights and institutional information.
       Included at the bottom of the AppShell view.
       ============================================================ -->
  <footer class="footer">
    <p>{{ t('footer.text') }}</p>
  </footer>
</template>

<script setup>
/* ============================================================
 * 🌐 i18n — Internationalization
 * ------------------------------------------------------------
 * Uses the global translation scope (`t()`) to display footer text.
 * ============================================================ */
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped>
/* ============================================================
 * 🎨 Footer Styles
 * ------------------------------------------------------------
 * Simple and clean design consistent with GlassGo layout.
 * White background with subtle top border separation.
 * ============================================================ */
.footer {
  text-align: center;           /* Centers the text */
  padding: 0;                   /* Inner spacing */
  font-size: 0.4rem;           /* Small readable font size */
  color: #777;                  /* Soft gray text */
  border-top: 1px solid #eee;   /* Top separator line */
  background: #fff;             /* White background */
}
</style>

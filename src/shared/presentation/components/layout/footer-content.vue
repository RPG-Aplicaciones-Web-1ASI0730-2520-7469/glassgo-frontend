<template>
  <!-- ------------------------------------------------------------
       🦶 Pie de página (Footer)
       ------------------------------------------------------------
       - Componente simple y global para el layout principal.
       - Muestra información institucional de derechos reservados.
       - Se incluye al final del contenido principal dentro del AppShell.
       ------------------------------------------------------------ -->
  <footer class="footer">
    <p>{{ t('footer.text') }}</p>
  </footer>
</template>

<script setup>
/* ----------------------------------------------------
 * 🌐 Internacionalización (i18n)
 * ----------------------------------------------------
 * - Se usa la función `t()` para traducir el texto del footer.
 * - `useScope: 'global'` asegura que use el idioma global actual.
 * ---------------------------------------------------- */
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped>
/* ----------------------------------------------------
 * 🎨 Estilos del pie de página
 * ----------------------------------------------------
 * - Se mantiene simple y consistente con el estilo general de GlassGo.
 * - Usa fondo blanco y borde superior para separar visualmente
 *   del contenido principal.
 * ---------------------------------------------------- */
.footer {
  text-align: center;           /* Centra el texto horizontalmente */
  padding: 0px;                /* Espaciado interno */
  font-size: 0.4rem;           /* Tamaño de fuente más pequeño */
  color: #777;                  /* Color de texto gris suave */
  border-top: 1px solid #eee;   /* Línea divisoria superior */
  background: #fff;             /* Fondo blanco */
}
</style>

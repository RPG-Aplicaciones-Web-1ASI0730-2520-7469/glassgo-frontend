<template>
  <!-- ------------------------------------------------------------
       🚫 Vista de error 404 - Página no encontrada
       ------------------------------------------------------------
       - Se muestra cuando el usuario accede a una ruta inexistente.
       - Ofrece un mensaje amigable y un botón para volver al inicio.
       - Los textos se traducen dinámicamente según el idioma activo.
       ------------------------------------------------------------ -->
  <div class="notfound">
    <div class="content">
      <!-- Código del error -->
      <h1 class="code">404</h1>

      <!-- Mensaje traducible: “La página que buscas no existe.” -->
      <p class="message">{{ t('notfound.message') }}</p>

      <!-- Botón de regreso al inicio -->
      <RouterLink to="/app/home" class="back-btn">
        {{ t('notfound.back') }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
/* ----------------------------------------------------
 * 🧩 Importaciones principales
 * ----------------------------------------------------
 * - RouterLink: componente de Vue Router para navegación interna.
 * - useI18n: hook de internacionalización para manejar textos traducibles.
 * ---------------------------------------------------- */
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

/* ----------------------------------------------------
 * 🌐 Internacionalización (i18n)
 * ----------------------------------------------------
 * - Se fuerza el uso del contexto global con "useScope: 'global'"
 *   para mantener sincronización con el idioma actual,
 *   incluso cuando esta vista está fuera del layout principal (/app).
 * ---------------------------------------------------- */
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped>
/* ----------------------------------------------------
 * 🎨 Contenedor principal (pantalla 404)
 * ----------------------------------------------------
 * - Ocupa toda la altura de la ventana.
 * - Centra vertical y horizontalmente el contenido.
 * - Fondo gris claro, consistente con el diseño GlassGo.
 * ---------------------------------------------------- */
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

/* ----------------------------------------------------
 * 📦 Contenedor del contenido (bloque central)
 * ----------------------------------------------------
 * - Define el ancho máximo del contenido para mantener proporción.
 * - Separa el texto del borde con padding interno.
 * ---------------------------------------------------- */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: fadeIn 1.5s ease;
}

/* ----------------------------------------------------
 * 🔢 Código del error
 * ----------------------------------------------------
 * - Número “404” grande y destacado en color azul corporativo.
 * ---------------------------------------------------- */
.code {
  font-size: 7rem;
  font-weight: 800;
  color: #2563eb;
  margin: 0;
  animation: float404 3s ease-in-out infinite;
}

/* Movimiento suave de flotación del “404” */
@keyframes float404 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* ----------------------------------------------------
 * 💬 Mensaje descriptivo
 * ----------------------------------------------------
 * - Explica brevemente el error al usuario.
 * ---------------------------------------------------- */
.message {
  font-size: 1.1rem;
  color: #64748b;
  max-width: 380px;
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* ----------------------------------------------------
 * 🔙 Botón de regreso al inicio
 * ----------------------------------------------------
 * - Redirige a /app/home.
 * - Usa estilo coherente con la paleta GlassGo.
 * ---------------------------------------------------- */
.back-btn {
  display: inline-block;
  background-color: #2563eb;
  color: #fff;
  text-decoration: none;
  padding: 0.65rem 1.7rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

/* Hover del botón (oscurece tono de azul) */
.back-btn:hover {
  display: inline-block;
  background-color: #2563eb;
  color: #fff;
  text-decoration: none;
  padding: 0.65rem 1.7rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

/* ----------------------------------------------------
 * ✨ Animación de entrada general
 * ---------------------------------------------------- */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

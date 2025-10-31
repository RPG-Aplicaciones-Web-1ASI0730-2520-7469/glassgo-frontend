<template>
  <!-- ------------------------------------------------------------
       🏠 Vista principal — Home (GlassGo)
       ------------------------------------------------------------
       Muestra un mensaje de bienvenida y una tarjeta flotante que
       indica visualmente si la conexión con el servidor local fue
       exitosa (✅ verde) o fallida (❌ roja).
       ------------------------------------------------------------ -->
  <div class="welcome">
    <!-- 🌍 Mensajes traducibles con i18n -->
    <h1>{{ t('homeView.welcome') }}</h1>
    <p>{{ t('homeView.description') }}</p>

    <!-- ✅ Tarjeta flotante de verificación de usuario -->
    <transition name="fade-slide-top">
      <div
          v-if="showCard"
          :class="['demo-user', isError ? 'error' : 'success']"
      >
        <p v-if="!isError">
          ✅ <strong>{{ user.firstName }} {{ user.lastName }}</strong>
          <span>({{ user.role }})</span>
        </p>

        <p v-else>
          ❌ <strong>Error loading user data</strong>
        </p>

        <small v-if="!isError" class="email">{{ user.email }}</small>
      </div>
    </transition>
  </div>
</template>

<script setup>
/* ----------------------------------------------------
 * 🧩 Importaciones principales
 * ----------------------------------------------------
 * - ref, onMounted → funciones reactivas de Vue Composition API.
 * - useI18n → permite traducir textos dinámicamente.
 * - httpClient → cliente HTTP basado en Axios para consumir db.json.
 * ---------------------------------------------------- */
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { httpClient } from '@/shared/infrastructure/http-client'

/* ----------------------------------------------------
 * 🌐 Configuración de internacionalización (i18n)
 * ----------------------------------------------------
 * - Se obtiene la función `t` desde el contexto global
 *   para usar las traducciones en esta vista.
 * ---------------------------------------------------- */
const { t } = useI18n({ useScope: 'global' })

/* ----------------------------------------------------
 * 🔄 Estados reactivos
 * ----------------------------------------------------
 * - user → almacena los datos del usuario cargados desde db.json.
 * - showCard → controla si la tarjeta flotante se muestra o no.
 * - isError →
 * ---------------------------------------------------- */
const user = ref(null)
const showCard = ref(false)
const isError = ref(false)

/* ----------------------------------------------------
 * ⚙️ Ciclo de vida — onMounted
 * ----------------------------------------------------
 * - Se ejecuta una vez que el componente se monta.
 * - Obtiene los datos del usuario de demostración desde
 *   JSON Server y muestra la tarjeta flotante por 1.5 segundos.
 * ---------------------------------------------------- */
onMounted(async () => {
  try {
    const response = await httpClient.get('/users/1')
    user.value = response.data
    isError.value = false
  } catch (error) {
    console.error('❌ Error al cargar datos:', error)
    isError.value = true
  } finally {
    // Mostrar tarjeta flotante por 1.5 segundos
    showCard.value = true
    setTimeout(() => {
      showCard.value = false
    }, 1500)
  }
})
</script>

<style scoped>
/* ----------------------------------------------------
 * 🌐 Diseño general del Home
 * ----------------------------------------------------
 * - Centra el mensaje de bienvenida y la descripción.
 * - Mantiene una estructura limpia y moderna.
 * ---------------------------------------------------- */
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

/* ----------------------------------------------------
 * 💬 Tarjeta flotante superior (Demo User)
 * ----------------------------------------------------
 * - Aparece brevemente cuando los datos del usuario se cargan.
 * - Usa colores verdes suaves para indicar éxito.
 * ---------------------------------------------------- */
.demo-user {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  padding: 1rem 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: 500;
  z-index: 1000;
}

/* ✅ Estado de éxito */
.demo-user.success {
  background-color: #ecfdf5;  /* Verde claro */
  border: 1px solid #6ee7b7;  /* Borde verde */
  color: #065f46;             /* Texto verde oscuro */
}

/* ❌ Estado de error */
.demo-user.error {
  background-color: #fef2f2;  /* Rojo claro */
  border: 1px solid #fca5a5;  /* Borde rojo */
  color: #991b1b;             /* Texto rojo oscuro */
}

/* Texto principal dentro de la tarjeta */
.demo-user p {
  margin: 0;                          /* Quita el margen por defecto del párrafo */
  line-height: 1.2;                   /* Acerca el correo al nombre */
}

/* Línea del correo electrónico */
.demo-user .email {
  display: block;
  font-size: 0.85rem;
  color: #047857;                     /* Verde más suave */
  margin-top: 0.3rem;
}

/* ----------------------------------------------------
 * ✨ Animaciones — Fade + Slide desde arriba
 * ----------------------------------------------------
 * - Transición suave al aparecer/desaparecer la tarjeta.
 * ---------------------------------------------------- */
.fade-slide-top-enter-active,
.fade-slide-top-leave-active {
  transition: all 0.6s ease;
}

/* Estado inicial (entra desde arriba con transparencia) */
.fade-slide-top-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px);
}

/* Estado de salida (se desvanece hacia arriba) */
.fade-slide-top-leave-to {
  opacity: 0;
  transform: translate(-50%, -40px);
}
</style>

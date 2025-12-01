<template>
  <!-- ============================================================
       Connection Status Card
       ------------------------------------------------------------
       Floating notification that confirms the connection to the
       local server (db.json). Displays user info or an error state.
       - Green   → Successful connection
       - Red    → Connection error
       - Auto-hides after 1.5 seconds
       ============================================================ -->
  <transition name="fade-slide-top">
    <div v-if="showCard" :class="['demo-user', isError ? 'error' : 'success']">
      <!--  Success state -->
      <p v-if="!isError">
         <strong>{{ user.firstName }} {{ user.lastName }}</strong>
        <span>({{ user.role }})</span>
      </p>

      <!--  Error state -->
      <p v-else>
         <strong>Error loading user data</strong>
      </p>

      <!--  Email (only on success) -->
      <small v-if="!isError" class="email">{{ user.email }}</small>
    </div>
  </transition>
</template>

<script setup>
/* ============================================================
 *  Logic — ConnectionStatus Component
 * ============================================================
 * - Fetches user data from the API on mount.
 * - Shows temporary floating card with user info or error message.
 * - Uses Axios client from shared infrastructure.
 * ============================================================ */
import { ref, onMounted } from 'vue'
import { httpClient } from '@/shared/infrastructure/http-client'

const user = ref(null)
const showCard = ref(false)
const isError = ref(false)

onMounted(async () => {
  try {
    const response = await httpClient.get('/users/1')
    user.value = response.data
    isError.value = false
  } catch (error) {
    console.error('❌ Error loading data:', error)
    isError.value = true
  } finally {
    showCard.value = true
    setTimeout(() => (showCard.value = false), 1500)
  }
})
</script>

<style scoped>
/* ============================================================
 *  Styles — Connection Status
 * ============================================================ */
.demo-user {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: 500;
  z-index: 1000;
}

/*  Success */
.demo-user.success {
  background-color: #ecfdf5;
  border: 1px solid #6ee7b7;
  color: #065f46;
}

/*  Error */
.demo-user.error {
  background-color: #fef2f2;
  border: 1px solid #fca5a5;
  color: #991b1b;
}

.demo-user p {
  margin: 0;
  line-height: 1.2;
}

.demo-user .email {
  display: block;
  font-size: 0.85rem;
  color: #047857;
  margin-top: 0.3rem;
}

/*  Animations */
.fade-slide-top-enter-active,
.fade-slide-top-leave-active {
  transition: all 0.6s ease;
}
.fade-slide-top-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px);
}
.fade-slide-top-leave-to {
  opacity: 0;
  transform: translate(-50%, -40px);
}
</style>

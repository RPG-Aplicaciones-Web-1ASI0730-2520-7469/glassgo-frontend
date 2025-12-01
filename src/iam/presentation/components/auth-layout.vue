<script setup>
// AuthLayout: Wrapper para rutas de autenticación
import LangSwitch from '@/shared/presentation/components/ui/lang-switch.vue'
</script>

<template>
  <div class="auth-bg">
    <div class="lang-switcher-wrapper">
      <LangSwitch />
    </div>
    <div class="auth-main-layout">
      <div class="auth-form-panel">
        <router-view />
      </div>
      <div class="auth-brand-panel">
        <div class="auth-brand-content">
          <img src="/src/assets/logo-glassgo.jpg" alt="GlassGo" class="auth-brand-logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-bg {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}
.auth-main-layout {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background: #fff;
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
}
.auth-form-panel {
  flex: 1;
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: relative;
}
.lang-switcher-wrapper {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
}
.auth-brand-panel {
  flex: 1;
  background: linear-gradient(135deg, #e2e8f0 0%, #cfe3f7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-brand-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.auth-brand-logo {
  width: 420px;
  height: auto;
  border-radius: 40px;
  box-shadow: 0 16px 48px rgba(0,0,0,0.14);
  margin-bottom: 3rem;
}
.auth-brand-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.03em;
  font-family: 'Baloo Chettan 2', cursive;
}
@media (max-width: 900px) {
  .auth-main-layout {
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    min-height: 0;
  }
  .auth-form-panel {
    padding: 2rem 1rem;
  }
  .auth-brand-panel {
    padding: 2rem 0;
  }
  .auth-brand-logo {
    width: 120px;
  }
  .auth-brand-title {
    font-size: 1.5rem;
  }
}
</style>
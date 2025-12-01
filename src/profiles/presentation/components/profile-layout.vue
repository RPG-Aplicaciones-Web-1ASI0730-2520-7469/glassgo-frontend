<template>
  <div class="profile-layout">
    <!-- Top Navigation Bar -->
    <div class="top-nav">
      <div class="nav-content">
        <div class="nav-left">
          <img src="@/assets/logo-glassgo.jpg" alt="GlassGo" class="logo" />
          <h2>GlassGo Dashboard</h2>
        </div>
        <div class="nav-right">
          <language-switcher />
          <div class="user-info">
            <span>{{ user?.name || 'Usuario' }}</span>
            <Button icon="pi pi-sign-out" severity="secondary" text @click="logout" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Sidebar Navigation -->
      <div class="sidebar">
        <nav class="sidebar-nav">
          <ul class="nav-menu">
            <li>
              <router-link 
                to="/app/home"
                :class="{ active: isActive('/app/home') }"
                class="nav-link"
              >
                <i class="pi pi-home"></i>
                <span>Home</span>
              </router-link>
            </li>
            <li>
              <router-link 
                to="/app/tracking"
                :class="{ active: isActive('/app/tracking') }"
                class="nav-link"
              >
                <i class="pi pi-map-marker"></i>
                <span>{{ $t('profile.nav.tracking') }}</span>
              </router-link>
            </li>
            <li>
              <router-link 
                to="/app/inventory"
                :class="{ active: isActive('/app/inventory') }"
                class="nav-link"
              >
                <i class="pi pi-box"></i>
                <span>{{ $t('profile.nav.inventario') }}</span>
              </router-link>
            </li>
            <li>
              <router-link 
                to="/app/calendar"
                :class="{ active: isActive('/app/calendar') }"
                class="nav-link"
              >
                <i class="pi pi-calendar"></i>
                <span>{{ $t('profile.nav.calendar') }}</span>
              </router-link>
            </li>
            <li>
              <router-link 
                to="/app/reports"
                :class="{ active: isActive('/app/reports') }"
                class="nav-link"
              >
                <i class="pi pi-chart-bar"></i>
                <span>{{ $t('profile.nav.reportes') }}</span>
              </router-link>
            </li>
            <li>
              <router-link 
                to="/app/claims"
                :class="{ active: isActive('/app/claims') }"
                class="nav-link"
              >
                <i class="pi pi-exclamation-triangle"></i>
                <span>{{ $t('profile.nav.reclamos') }}</span>
              </router-link>
            </li>
            <li>
              <router-link 
                to="/app/admin"
                :class="{ active: isActive('/app/admin') }"
                class="nav-link"
              >
                <i class="pi pi-cog"></i>
                <span>{{ $t('profile.nav.configuraciones') }}</span>
              </router-link>
            </li>
            <li class="create-order-section">
              <router-link 
                to="/app/create-order"
                :class="{ active: isActive('/app/create-order') }"
                class="nav-link create-order-btn"
              >
                <i class="pi pi-plus"></i>
                <span>{{ $t('profile.nav.crearPedido') }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Page Content -->
      <div class="page-content">
  <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/authentication/application/auth.store.js';
import LanguageSwitcher from '@/shared/presentation/components/language-switcher.vue';
import Button from 'primevue/button';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const user = computed(() => authStore.user);

const isActive = (path) => {
  return route.path === path;
};

const logout = async () => {
  await authStore.logout();
  router.push('/auth/login');
};
</script>

<style scoped>
.profile-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

/* Top Navigation */
.top-nav {
  background: white;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 40px;
  width: auto;
}

.nav-left h2 {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #e9ecef;
  padding: 2rem 0;
}

.sidebar-nav {
  padding: 0 1rem;
}

.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  margin-bottom: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #6c757d;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #495057;
}

.nav-link.active {
  background-color: #e3f2fd;
  color: #1976d2;
}

.nav-link i {
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.create-order-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.create-order-btn {
  background-color: #28a745;
  color: white !important;
}

.create-order-btn:hover {
  background-color: #218838;
  color: white !important;
}

.create-order-btn.active {
  background-color: #1e7e34;
  color: white !important;
}

/* Page Content */
.page-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    padding: 1rem 0;
  }
  
  .nav-menu {
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
    padding: 0 1rem;
  }
  
  .nav-menu li {
    margin-bottom: 0;
    flex-shrink: 0;
  }
  
  .nav-link {
    white-space: nowrap;
  }
  
  .page-content {
    padding: 1rem;
  }
}
</style>
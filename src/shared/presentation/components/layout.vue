<script setup>
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useToast} from 'primevue/usetoast';
import LanguageSwitcher from "./language-switcher.vue";
import FooterContent from "./footer-content.vue";

const { t, locale } = useI18n();
const router = useRouter();
const toast = useToast();

// TODO: Estos serán los futuros bounded contexts
const navigationItems = [
  {
    path: '/app/home',
    icon: 'pi pi-home',
    label: 'Home'
  },
  {
    path: '/app/crear-pedido',
    icon: 'pi pi-plus-circle',
    label: 'Crear pedido'
  },
  {
    path: '/app/tracking',
    icon: 'pi pi-map-marker',
    label: 'Tracking'
  },
  {
    path: '/app/inventario',
    icon: 'pi pi-box',
    label: 'Inventario'
  },
  {
    path: '/app/calendar',
    icon: 'pi pi-calendar',
    label: 'Calendar'
  },
  {
    path: '/app/reportes',
    icon: 'pi pi-chart-bar',
    label: 'Reporte'
  },
  {
    path: '/app/historial',
    icon: 'pi pi-shopping-cart',
    label: 'Historial'
  },
  {
    path: '/app/reclamos',
    icon: 'pi pi-exclamation-triangle',
    label: 'Reclamos'
  }
];

const handleLogout = async () => {
  try {
    toast.add({
      severity: 'info',
      summary: 'Logged Out',
      detail: 'You have been successfully logged out',
      life: 3000
    });
    
    router.push('/app/home'); // Redirect to home since no auth
  } catch (error) {
    console.error('Logout error:', error);
    router.push('/app/home');
  }
};
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  
  <div class="app-layout">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <img src="@/assets/logo-glassgo.jpg" alt="GlassGo" class="logo-img">
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <router-link 
          v-for="item in navigationItems" 
          :key="item.path"
          :to="item.path" 
          class="nav-item"
          :class="{ 'active': $route.path === item.path }"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </router-link>
        
        <div class="sidebar-bottom">
          <button class="logout-btn" @click="handleLogout">
            <i class="pi pi-sign-out"></i>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </nav>
    </div>

    <!-- Main content area -->
    <div class="main-container">
      <!-- Top bar -->
      <div class="top-bar">
        <div class="top-bar-left">
          <!-- Breadcrumb o título -->
        </div>
        
        <div class="top-bar-right">
          <!-- Nombre de usuario -->
          <span class="user-name">
            Usuario Demo
          </span>
          
          <!-- Language switcher -->
          <language-switcher />
          
          <!-- User icon - placeholder -->
          <div class="user-icon-btn">
            <i class="pi pi-user"></i>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid #e0e6ed;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
}

/* Profile header - banda azul superior */
/* Eliminado - ya no se necesita */

.sidebar-header {
  padding: 2.5rem 1.5rem 1.5rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 120px;
  height: 120px;
  border-radius: 24px;
}

.sidebar-nav {
  flex: 1;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  color: #4a5568;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.125rem 0;
}

.nav-item:hover {
  background-color: #f7fafc;
  color: #2d3748;
}

.nav-item.active {
  background-color: #ebf8ff;
  color: #1e88e5;
  border-right: 3px solid #1e88e5;
}

.nav-item i {
  font-size: 1.125rem;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

/* Configuraciones al final */
.sidebar-bottom {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

/* Logout button */
.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  color: #e53e3e;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.5rem 0 0 0;
  width: 100%;
  text-align: left;
}

.logout-btn:hover {
  background-color: #fed7d7;
  color: #c53030;
}

.logout-btn i {
  font-size: 1.125rem;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

/* Main container */
.main-container {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
}

/* Top bar */
.top-bar {
  height: 64px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.top-bar-left {
  flex: 1;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-name {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.user-icon-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
  text-decoration: none;
}

.user-icon-btn:hover {
  background: #e2e8f0;
  color: #334155;
}

/* Page content */
.page-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  background: #f8f9fa;
}

/* Responsive */
@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .main-container {
    margin-left: 0;
  }
  
  .user-info {
    display: none;
  }
}

@media (max-width: 768px) {
  .top-bar {
    padding: 0 1rem;
  }
  
  .top-bar-right {
    gap: 0.5rem;
  }
}
</style>
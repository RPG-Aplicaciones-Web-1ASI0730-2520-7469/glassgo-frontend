<template>
  <div class="profile-layout">
    <!-- Sidebar Navigation -->
    <div class="sidebar">
      <!-- Logo Section -->
      <div class="logo-section">
        <img src="@/assets/logo-glassgo.jpg" alt="GlassGo" class="logo" />
        <h2>GlassGo</h2>
      </div>
      
      <!-- Navigation Menu -->
      <nav class="nav-menu">
        <ul>
          <li>
            <router-link to="/app/profile/crear-pedido" class="nav-item">
              <i class="pi pi-plus"></i>
              <span>Crear pedido</span>
            </router-link>
          </li>
          <li>
            <router-link to="/app/profile/tracking" class="nav-item">
              <i class="pi pi-map-marker"></i>
              <span>Tracking</span>
            </router-link>
          </li>
          <li>
            <router-link to="/app/profile/inventario" class="nav-item">
              <i class="pi pi-box"></i>
              <span>Inventario</span>
            </router-link>
          </li>
          <li>
            <router-link to="/app/profile/calendar" class="nav-item">
              <i class="pi pi-calendar"></i>
              <span>Calendar</span>
            </router-link>
          </li>
          <li>
            <router-link to="/app/profile/reportes" class="nav-item">
              <i class="pi pi-chart-bar"></i>
              <span>Reporte</span>
            </router-link>
          </li>
          <li>
            <router-link to="/app/profile/historial" class="nav-item">
              <i class="pi pi-clock"></i>
              <span>Historial</span>
            </router-link>
          </li>
          <li>
            <router-link to="/app/profile/reclamos" class="nav-item">
              <i class="pi pi-exclamation-triangle"></i>
              <span>Reclamos</span>
            </router-link>
          </li>
        </ul>
        
        <!-- Settings at bottom -->
        <div class="settings-section">
          <router-link to="/app/profile/configuraciones" class="nav-item settings">
            <i class="pi pi-cog"></i>
            <span>Configuraciones</span>
            <i class="pi pi-angle-right arrow"></i>
          </router-link>
        </div>
      </nav>
    </div>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Top Header -->
      <div class="top-header">
        <div class="header-left">
          <h1>Dashboard</h1>
        </div>
        <div class="header-right">
          <button class="notification-btn">
            <i class="pi pi-bell"></i>
          </button>
          <div class="user-menu">
            <button class="user-btn" @click="logout">
              <i class="pi pi-user"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Page Content -->
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  router.push('/auth/login');
};
</script>

<style scoped>
.profile-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background: white;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

/* Logo Section */
.logo-section {
  padding: 2rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
}

.logo {
  height: 50px;
  width: auto;
  margin-bottom: 0.5rem;
}

.logo-section h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
}

/* Navigation Menu */
.nav-menu {
  flex: 1;
  padding: 1rem 0;
}

.nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  margin-bottom: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: #6c757d;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item:hover {
  background-color: #f8f9fa;
  color: #495057;
}

.nav-item.router-link-active {
  background-color: #e3f2fd;
  color: #1976d2;
  border-right: 3px solid #1976d2;
}

.nav-item i {
  font-size: 1.2rem;
  width: 24px;
  margin-right: 1rem;
}

.nav-item span {
  font-weight: 500;
  font-size: 1rem;
}

/* Settings Section */
.settings-section {
  border-top: 1px solid #e9ecef;
  padding: 1rem 0;
  margin-top: auto;
}

.settings .arrow {
  margin-left: auto;
  margin-right: 0;
  width: auto;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
}

/* Top Header */
.top-header {
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-left h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-btn,
.user-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  color: #6c757d;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-btn:hover,
.user-btn:hover {
  background-color: #f8f9fa;
  color: #495057;
}

/* Page Content */
.page-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 260px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .page-content {
    padding: 1rem;
  }
}

/* PrimeVue Icons */
.pi {
  font-family: 'primeicons';
}
</style>
<template>
  <div class="app-shell">
    <!--  Sidebar (always mounted, only visually hidden) -->
    <Sidebar class="sidebar" :class="{ open: sidebarOpen }" />

    <!--  Main area -->
    <div class="main-area" :class="{ 'no-sidebar': !sidebarOpen }">
      <!-- 🔝 Topbar fija -->
      <Topbar :sidebarOpen="sidebarOpen" @toggle-sidebar="toggleSidebar" />

      <!--  Dynamic content -->
      <main class="content" @click="closeSidebarIfMobile">
        <router-view />
      </main>

      <!--  Footer global -->
      <FooterContent />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import Sidebar from './sidebar.vue'
import Topbar from './topbar.vue'
import FooterContent from './footer-content.vue'

/* ============================================================
 *  Layout State
 * ============================================================ */
const sidebarOpen = ref(true)

/*  Toggle functions */
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
function closeSidebarIfMobile() {
  if (window.innerWidth < 1024 && sidebarOpen.value) sidebarOpen.value = false
}

/* Auto adjust based on screen size */
function handleResize() {
  sidebarOpen.value = window.innerWidth >= 1024
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

/* ============================================================
 * Role-based automatic redirection
 * ============================================================
 * - Detects changes in user role (from db.json or auth module)
 * - Dynamically redirects to the correct Home view
 * - Demo or invalid roles → go to /app/home
 * ============================================================ */
const router = useRouter()
const userStore = useUserStore()

watch(
    () => userStore.user?.role,
    (newRole) => {
      const roleRoutes = {
        admin: '/app/home-admin',
        distributor: '/app/home-distributor',
        carrier: '/app/home-carrier',
        'business-owner': '/app/home-business-owner'
      }

      const target = roleRoutes[newRole] || '/app/home'

      // 🚨 Handle invalid or demo roles
      if (!newRole || newRole === 'demo' || !roleRoutes[newRole]) {
        if (router.currentRoute.value.path !== '/app/home') router.push('/app/home')
        return
      }

      // ✅ Redirect only if necessary
      if (router.currentRoute.value.path !== target) router.push(target)
    },
    { immediate: true }
)
</script>

<style scoped>
/* ============================================================
 * 🧱 AppShell Layout Styles
 * ============================================================ */

.app-shell {
  display: flex;
  min-height: 100vh;
  background: #f6f8fb;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  background: #fff;
  border-right: 1px solid #e9eef5;
  z-index: 50;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
}
.sidebar.open {
  transform: translateX(0);
}

/* Main Area */
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 260px;
  transition: margin-left 0.25s ease;
}
.main-area.no-sidebar {
  margin-left: 0;
}

/* Content */
.content {
  flex: 1;
  margin-top: 50px; /* topbar height */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f8fb;
  padding: 2rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .main-area {
    margin-left: 0;
  }
}
</style>

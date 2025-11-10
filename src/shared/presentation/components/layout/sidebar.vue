<template>
  <!-- ============================================================
       🧭 Sidebar Navigation
       ------------------------------------------------------------
       Main navigation component for GlassGo AppShell.
       Dynamically loads routes based on user role.
       Includes overlay support for mobile and fixed logout link.
       ============================================================ -->
  <div>
    <!-- 🌑 Mobile overlay -->
    <div v-if="open && !desktop" class="overlay" @click="$emit('close')"></div>

    <!-- 🧭 Sidebar -->
    <aside class="sidebar" :class="{ open }">
      <!-- 🔹 Logo -->
      <div class="brand">
        <img :src="logo" alt="GlassGo Logo" class="brand-logo" />
      </div>

      <!-- 📋 Navigation menu -->
      <nav class="menu">
        <RouterLink
            v-for="(item, i) in menuItems"
            :key="i"
            :to="item.path"
            class="item"
        >
          {{ item.icon }} {{ t(item.label) }}
        </RouterLink>
      </nav>

      <!-- 🚪 Logout -->
      <div class="logout">
        <RouterLink to="/" class="logout-link">
          [→ {{ t('sidebar.logout') }}
        </RouterLink>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'
import logo from '@/assets/logo-glassgo.jpg'

/* ============================================================
 * 🧠 Sidebar State & Logic
 * ============================================================ */
const props = defineProps({
  open: { type: Boolean, default: true }
})

const { t } = useI18n()
const userStore = useUserStore()

// 💻 Detect screen type
const desktop = computed(() =>
    window.matchMedia('(min-width:1024px)').matches
)

// 🧩 Menu items by user role
const menuConfig = {
  admin: [
    { icon: '🏠', label: 'sidebar.home', path: '/app/home-admin' },
    { icon: '🚚', label: 'sidebar.tracking', path: '/app/tracking' },
    { icon: '📦', label: 'sidebar.inventory', path: '/app/inventory' },
    { icon: '🗓️', label: 'sidebar.calendar', path: '/app/calendar' },
    { icon: '📊', label: 'sidebar.reports', path: '/app/reports' },
    { icon: '💳', label: 'sidebar.payments', path: '/app/payments' },
    { icon: '🕓', label: 'sidebar.history', path: '/app/history' },
    { icon: '💬', label: 'sidebar.claims', path: '/app/claims' },
    { icon: '⚙️', label: 'sidebar.admin', path: '/app/admin' }
  ],
  distributor: [
    { icon: '🏠', label: 'sidebar.home', path: '/app/home-distributor' },
    { icon: '➕', label: 'sidebar.createOrder', path: '/app/create-order' },
    { icon: '🚚', label: 'sidebar.tracking', path: '/app/tracking' },
    { icon: '📦', label: 'sidebar.inventory', path: '/app/inventory' },
    { icon: '🗓️', label: 'sidebar.calendar', path: '/app/calendar' },
    { icon: '📊', label: 'sidebar.reports', path: '/app/reports' },
    { icon: '💳', label: 'sidebar.payments', path: '/app/payments' },
    { icon: '🕓', label: 'sidebar.history', path: '/app/history' },
    { icon: '💬', label: 'sidebar.claims', path: '/app/claims' }
  ],
  carrier: [
    { icon: '🏠', label: 'sidebar.home', path: '/app/home-carrier' },
    { icon: '🚚', label: 'sidebar.tracking', path: '/app/tracking' },
    { icon: '🗓️', label: 'sidebar.calendar', path: '/app/calendar' },
    { icon: '🕓', label: 'sidebar.history', path: '/app/history' },
    { icon: '💬', label: 'sidebar.claims', path: '/app/claims' }
  ],
  'business-owner': [
    { icon: '🏠', label: 'sidebar.home', path: '/app/home-business-owner' },
    { icon: '➕', label: 'sidebar.createOrder', path: '/app/create-order' },
    { icon: '📊', label: 'sidebar.reports', path: '/app/reports' },
    { icon: '💳', label: 'sidebar.payments', path: '/app/payments' },
    { icon: '🕓', label: 'sidebar.history', path: '/app/history' },
    { icon: '💬', label: 'sidebar.claims', path: '/app/claims' }
  ],
  demo: [{ icon: '🏠', label: 'sidebar.home', path: '/app/home' }]
}

// 🔁 Computed menu based on user role
const menuItems = computed(() => {
  const role = userStore.user?.role || 'demo'
  return menuConfig[role] || menuConfig.demo
})
</script>

<style scoped>
/* ============================================================
 * 🎨 Sidebar Styles
 * ============================================================ */

/* 🌑 Mobile overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 40;
}

/* 🧭 Sidebar base */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  background: #fff;
  border-right: 1px solid #e9eef5;
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
}
.sidebar.open {
  transform: translateX(0);
}
@media (min-width: 1024px) {
  .sidebar {
    transform: translateX(0);
  }
}

/* 🔹 Brand */
.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e9eef5;
}
.brand-logo {
  height: 100px;
  object-fit: contain;
  display: block;
}

/* 📋 Menu */
.menu {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.25rem;
}
.item {
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  color: #202733;
  transition: background 0.2s ease;
}
.item:hover {
  background: #f3f6fb;
}
.item.router-link-active {
  background: #f0f3f8;
  font-weight: 600;
}

/* 🚪 Logout */
.logout {
  border-top: 1px solid #e9eef5;
  padding: 0.75rem;
  text-align: center;
}
.logout-link {
  color: #dc2626;
  font-weight: 500;
  text-decoration: none;
}
.logout-link:hover {
  text-decoration: underline;
}
</style>

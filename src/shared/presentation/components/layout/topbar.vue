<template>
  <!-- ============================================================
       📍 Topbar Component
       ------------------------------------------------------------
       Fixed top navigation bar displayed above all views.
       Shows user role, language switcher, and profile info.
       ============================================================ -->
  <header class="topbar" :class="{ expanded: !sidebarOpen }">
    <!-- ☰ Sidebar toggle -->
    <button class="hamburger" @click="$emit('toggle-sidebar')">☰</button>

    <!-- 🔹 User role -->
    <div class="role-pill">
      {{ t(`roles.${user?.role || 'role'}`) }}
    </div>

    <div class="spacer"></div>

    <!-- 🌐 Language switch -->
    <LangSwitch />

    <!-- 👤 User info -->
    <div class="user">
      <span class="name">
        {{ user?.firstName || t('fallbackUser.name') }}
        {{ user?.lastName || t('fallbackUser.lastname') }}
      </span>
      <div class="avatar" @click="goToProfile">
        {{ initials || '?' }}
      </div>
    </div>
  </header>
</template>

<script setup>
/* ============================================================
 * 🧠 Logic — Topbar Behavior
 * ============================================================ */
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'
import LangSwitch from '@/shared/presentation/components/ui/lang-switch.vue'

const { t } = useI18n({ useScope: 'global' })
const userStore = useUserStore()
const router = useRouter()

defineProps({
  sidebarOpen: { type: Boolean, default: true }
})

// 👤 Load user on mount
onMounted(() => {
  if (!userStore.user) userStore.fetchUser()
})

// 🧭 Redirect to profile page
function goToProfile() {
  router.push({ name: 'Profile' })
}

// 🧩 Computed properties
const user = computed(() => userStore.user)
const initials = computed(() => {
  if (!user.value) return '?'
  const first = user.value.firstName?.[0]?.toUpperCase() || ''
  const last = user.value.lastName?.[0]?.toUpperCase() || ''
  return (first + last) || '?'
})
</script>

<style scoped>
/* ============================================================
 * 🎨 Styles — Topbar Layout
 * ============================================================ */
.topbar {
  position: fixed;
  top: 0;
  left: 260px;                   /* Aligned with sidebar */
  right: 0;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #e9eef5;
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  gap: 0.75rem;
  z-index: 100;
  transition: left 0.25s ease;
}

/* Full width when sidebar is hidden */
.topbar.expanded {
  left: 0;
}

/* ☰ Button */
.hamburger {
  border: none;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
  color: #1e293b;
}

/* Role badge */
.role-pill {
  font-size: 12px;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background-color: #e8f0ff;
  color: #2563eb;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: lowercase;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2);
}

.spacer {
  flex: 1;
}

/* User info */
.user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  background: #f6f8fb;
}
.name {
  font-size: 13px;
  font-weight: 600;
}
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  background: #e3ebf7;
  color: #1e293b;
  font-weight: 600;
  cursor: pointer;
}
</style>

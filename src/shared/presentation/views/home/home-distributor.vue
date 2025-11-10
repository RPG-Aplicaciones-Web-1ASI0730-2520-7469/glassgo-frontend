<template>
  <!-- ============================================================
       🚛 Home — Distributor Dashboard (GlassGo)
       ------------------------------------------------------------
       Main distributor view showing operational stats, stock levels,
       and recent orders.
       ============================================================ -->
  <div class="distributor-dashboard">
    <ConnectionStatus /> <!-- ✅ Floating connection card -->

    <!-- 🏷️ Header -->
    <header class="header">
      <h1>🚛 {{ t('homeDistributor.welcome') }}, {{ userName }}</h1>
      <p class="subtitle">{{ t('homeDistributor.subtitle') }}</p>
    </header>

    <!-- 📦 KPI Section -->
    <section class="kpi-section">
      <div class="kpi-card blue">
        <h2>{{ stats.active || 0 }}</h2>
        <p>{{ t('homeDistributor.activeOrders') }}</p>
      </div>
      <div class="kpi-card green">
        <h2>{{ stats.delivered || 0 }}</h2>
        <p>{{ t('homeDistributor.deliveredOrders') }}</p>
      </div>
      <div class="kpi-card red">
        <h2>{{ stats.canceled || 0 }}</h2>
        <p>{{ t('homeDistributor.canceledOrders') }}</p>
      </div>
      <div class="kpi-card yellow">
        <h2>{{ stats.stock || 0 }}</h2>
        <p>{{ t('homeDistributor.stockProducts') }}</p>
      </div>
    </section>

    <!-- 🧾 Recent Orders -->
    <section class="recent-orders">
      <h3>📋 {{ t('homeDistributor.recentOrders') }}</h3>
      <table>
        <thead>
        <tr>
          <th>{{ t('homeDistributor.table.id') }}</th>
          <th>{{ t('homeDistributor.table.client') }}</th>
          <th>{{ t('homeDistributor.table.status') }}</th>
          <th>{{ t('homeDistributor.table.date') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(order, i) in recentOrders" :key="i">
          <td>{{ order.id }}</td>
          <td>{{ order.client }}</td>
          <td>
              <span :class="['status', order.status.toLowerCase()]">
                {{ t(`homeDistributor.status.${order.status.toLowerCase()}`) }}
              </span>
          </td>
          <td>{{ order.date }}</td>
        </tr>
        </tbody>
      </table>
    </section>

    <!-- 📅 Upcoming Events -->
    <section class="upcoming-events">
      <h3>🗓️ {{ t('homeDistributor.upcomingEvents') }}</h3>
      <ul>
        <li v-for="(event, i) in upcomingEvents" :key="i">
          <strong>{{ event.date }}</strong> — {{ event.description }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
/* ============================================================
 * 🧠 Logic — Distributor Dashboard (dynamic from db.json)
 * ============================================================ */
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { httpClient } from '@/shared/infrastructure/http-client'
import { DEMO_USER_ID } from '@/shared/config/demo-user'
import ConnectionStatus from '@/shared/presentation/components/ui/connection-status.vue'

const { t } = useI18n({ useScope: 'global' })

const user = ref(null)
const stats = ref({ active: 0, delivered: 0, canceled: 0, stock: 0 })
const recentOrders = ref([])
const upcomingEvents = ref([])

onMounted(async () => {
  try {
    // 1️⃣ Load logged-in distributor
    const userRes = await httpClient.get(`/users/${DEMO_USER_ID}`)
    user.value = userRes.data

    // 2️⃣ Load related orders
    const ordersRes = await httpClient.get(`/orders?userId=${user.value.id}`)
    const orders = ordersRes.data || []
    console.log('📦 Orders loaded:', orders)

    // Normalize status & calculate KPIs
    const normalizedOrders = orders.map(o => ({
      ...o,
      status: o.status?.trim().toLowerCase()
    }))

    stats.value = {
      active: normalizedOrders.filter(o => o.status === 'active').length,
      delivered: normalizedOrders.filter(o => o.status === 'delivered').length,
      canceled: normalizedOrders.filter(o => ['cancelled', 'canceled'].includes(o.status)).length,
      stock: 0 // filled below
    }

    // 3️⃣ Recent orders (last 3)
    recentOrders.value = orders.slice(-3).reverse()

    // 4️⃣ Inventory
    const invRes = await httpClient.get(`/inventory?userId=${user.value.id}`)
    const inventory = invRes.data || []
    stats.value.stock = inventory.reduce((sum, i) => sum + (i.stock || 0), 0)

    // 5️⃣ Upcoming events
    const eventsRes = await httpClient.get(`/events?userId=${user.value.id}`)
    upcomingEvents.value = eventsRes.data || []
  } catch (error) {
    console.error('❌ Error loading distributor dashboard:', error)
  }
})

const userName = computed(() => (user.value ? user.value.firstName : 'Usuario'))
</script>

<style scoped>
/* ============================================================
 * 🎨 Styles — Distributor Dashboard
 * ============================================================ */
.distributor-dashboard {
  background: #f8fafc;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Header */
.header {
  text-align: center;
}
.header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
}
.subtitle {
  color: #64748b;
  margin-top: 0.3rem;
}

/* KPI Cards */
.kpi-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}
.kpi-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.kpi-card h2 {
  margin: 0;
  font-size: 1.8rem;
}
.kpi-card p {
  color: #64748b;
  font-size: 0.9rem;
}
.kpi-card.blue h2 { color: #2563eb; }
.kpi-card.green h2 { color: #16a34a; }
.kpi-card.yellow h2 { color: #f59e0b; }
.kpi-card.red h2 { color: #dc2626; }

/* Tables & Lists */
.recent-orders, .upcoming-events {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.recent-orders h3, .upcoming-events h3 {
  margin-bottom: 1rem;
  color: #1e293b;
}

/* Recent Orders Table */
.recent-orders table {
  width: 100%;
  border-collapse: collapse;
}
.recent-orders th, .recent-orders td {
  padding: 0.5rem 1rem;
  text-align: left;
}
.recent-orders th {
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
}
.recent-orders td {
  color: #1e293b;
  font-size: 0.9rem;
}

/* Status */
.status {
  font-weight: 600;
  text-transform: capitalize;
}
.status.active { color: #2563eb; }
.status.delivered { color: #16a34a; }
.status.cancelled { color: #dc2626; }

/* Upcoming Events */
.upcoming-events ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.upcoming-events li {
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
}
.upcoming-events strong {
  color: #2563eb;
}
</style>

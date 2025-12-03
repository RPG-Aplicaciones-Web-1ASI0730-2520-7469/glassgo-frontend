<template>
  <!-- ============================================================
       Home — Carrier Dashboard (GlassGo)
       ------------------------------------------------------------
       Main dashboard for carriers showing key delivery metrics,
       active routes, and recent deliveries.
       ============================================================ -->
  <div class="transport-dashboard">
    <ConnectionStatus /> <!-- Floating connection card -->

    <!-- 🏷Header -->
    <header class="header">
      <h1> {{ t('homeCarrier.welcome') }}, {{ userName }}!</h1>
      <p class="subtitle">{{ t('homeCarrier.subtitle') }}</p>
    </header>

    <!--  KPI Section -->
    <section class="kpi-section">
      <div class="kpi-card blue">
        <h2>{{ stats.deliveriesToday }}</h2>
        <p>{{ t('homeCarrier.deliveriesToday') }}</p>
      </div>
      <div class="kpi-card green">
        <h2>{{ stats.completedDeliveries }}</h2>
        <p>{{ t('homeCarrier.completedDeliveries') }}</p>
      </div>
      <div class="kpi-card yellow">
        <h2>{{ stats.pendingDeliveries }}</h2>
        <p>{{ t('homeCarrier.pendingDeliveries') }}</p>
      </div>
      <div class="kpi-card red">
        <h2>{{ stats.failedDeliveries }}</h2>
        <p>{{ t('homeCarrier.failedDeliveries') }}</p>
      </div>
    </section>

    <!-- Active Routes -->
    <section class="routes">
      <h3>️ {{ t('homeCarrier.activeRoutes') }}</h3>
      <table>
        <thead>
        <tr>
          <th>{{ t('homeCarrier.table.route') }}</th>
          <th>{{ t('homeCarrier.table.origin') }}</th>
          <th>{{ t('homeCarrier.table.destination') }}</th>
          <th>{{ t('homeCarrier.table.status') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(route, i) in activeRoutes" :key="i">
          <td>{{ route.id }}</td>
          <td>{{ route.origin }}</td>
          <td>{{ route.destination }}</td>
          <td>
              <span :class="['status', route.status.replaceAll(' ', '-').toLowerCase()]">
                {{ t(`homeCarrier.status.${route.status.replaceAll(' ', '-').toLowerCase()}`) }}
              </span>
          </td>
        </tr>
        </tbody>
      </table>
    </section>

    <!--  Recent Deliveries -->
    <section class="recent-deliveries">
      <h3> {{ t('homeCarrier.recentDeliveries') }}</h3>
      <ul>
        <li v-for="(delivery, i) in recentDeliveries" :key="i">
          <strong>{{ delivery.id }}</strong> — {{ delivery.client }}
          <span :class="['status', delivery.status.toLowerCase()]">
            ({{ t(`homeCarrier.status.${delivery.status.toLowerCase()}`) }})
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
/* ============================================================
 *  Logic — Carrier Dashboard (dynamic from db.json)
 * ============================================================ */
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { httpClient } from '@/shared/infrastructure/http-client'
import { DEMO_USER_ID } from '@/shared/config/demo-user'
import ConnectionStatus from '@/shared/presentation/components/ui/connection-status.vue'

const { t } = useI18n({ useScope: 'global' })

const user = ref(null)
const userName = computed(() => (user.value ? user.value.firstName : 'Transportista'))

const stats = ref({
  deliveriesToday: 0,
  completedDeliveries: 0,
  pendingDeliveries: 0,
  failedDeliveries: 0
})

const activeRoutes = ref([])
const recentDeliveries = ref([])

onMounted(async () => {
  try {
    //  Load carrier user
    const userRes = await httpClient.get(`/users/${DEMO_USER_ID}`)
    user.value = userRes.data

    //  Load carrier orders
    const ordersRes = await httpClient.get(`/orders?userId=${user.value.id}`)
    const orders = ordersRes.data || []
    console.log('📦 Orders loaded:', orders)

    // Normalize statuses
    const normalizedOrders = orders.map(o => ({
      ...o,
      status: o.status?.trim().toLowerCase()
    }))

    // KPIs
    stats.value.deliveriesToday = normalizedOrders.length
    stats.value.completedDeliveries = normalizedOrders.filter(o => o.status === 'delivered').length
    stats.value.pendingDeliveries = normalizedOrders.filter(o => o.status === 'pending').length
    stats.value.failedDeliveries = normalizedOrders.filter(o => ['failed', 'cancelled'].includes(o.status)).length

    // Active routes
    const routesRes = await httpClient.get(`/routes?userId=${user.value.id}`)
    activeRoutes.value = routesRes.data || []
    console.log('🗺️ Routes loaded:', activeRoutes.value)

    // Recent deliveries (last 3)
    recentDeliveries.value = normalizedOrders.slice(-3).reverse()
  } catch (error) {
    console.error('❌ Error loading carrier dashboard:', error)
  }
})
</script>

<style scoped>
/* ============================================================
 * 🎨 Styles — Carrier Dashboard
 * ============================================================ */
.transport-dashboard {
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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

/* Routes Table */
.routes {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.routes h3 {
  margin-bottom: 1rem;
  color: #1e293b;
}
.routes table {
  width: 100%;
  border-collapse: collapse;
}
.routes th, .routes td {
  padding: 0.5rem 1rem;
  text-align: left;
}
.routes th {
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
}
.routes td {
  color: #1e293b;
  font-size: 0.9rem;
}

/* Deliveries List */
.recent-deliveries {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.recent-deliveries ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.recent-deliveries li {
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
}
.recent-deliveries strong {
  color: #2563eb;
}

/* Status tags */
.status {
  font-weight: 600;
  text-transform: capitalize;
}
.status.pending { color: #f59e0b; }
.status.delivered, .status.completed { color: #16a34a; }
.status.failed { color: #dc2626; }
.status.in-transit { color: #9333ea; }
</style>

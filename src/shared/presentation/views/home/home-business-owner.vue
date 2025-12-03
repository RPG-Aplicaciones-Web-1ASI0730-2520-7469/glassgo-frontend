<template>
  <!-- ============================================================
       Home — Business Owner Dashboard (GlassGo)
       ------------------------------------------------------------
       Main dashboard for business owners showing consumption,
       active subscriptions, and recent orders.
       ============================================================ -->
  <div class="business-dashboard">
    <ConnectionStatus /> <!--  Floating status card -->

    <!-- 🏷 Header -->
    <header class="header">
      <h1> {{ t('homeBusinessOwner.welcome') }}, {{ userName }}</h1>
      <p class="subtitle">{{ t('homeBusinessOwner.subtitle') }}</p>
    </header>

    <!--  KPI Section -->
    <section class="kpi-section">
      <div class="kpi-card blue">
        <h2>{{ stats.monthlyConsumption || 0 }} L</h2>
        <p>{{ t('homeBusinessOwner.monthlyConsumption') }}</p>
      </div>
      <div class="kpi-card green">
        <h2>{{ stats.activeSubscriptions || 0 }}</h2>
        <p>{{ t('homeBusinessOwner.activeSubscriptions') }}</p>
      </div>
      <div class="kpi-card yellow">
        <h2>{{ stats.pendingOrders || 0 }}</h2>
        <p>{{ t('homeBusinessOwner.pendingOrders') }}</p>
      </div>
      <div class="kpi-card red">
        <h2>S/. {{ stats.totalSpent || 0 }}</h2>
        <p>{{ t('homeBusinessOwner.totalSpent') }}</p>
      </div>
    </section>

    <!--  Recent Orders -->
    <section class="recent-orders">
      <h3> {{ t('homeBusinessOwner.recentOrders') }}</h3>
      <table>
        <thead>
        <tr>
          <th>{{ t('homeBusinessOwner.table.id') }}</th>
          <th>{{ t('homeBusinessOwner.table.date') }}</th>
          <th>{{ t('homeBusinessOwner.table.status') }}</th>
          <th>{{ t('homeBusinessOwner.table.total') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(order, i) in recentOrders" :key="i">
          <td>{{ order.id }}</td>
          <td>{{ order.date }}</td>
          <td>
              <span :class="['status', order.status.toLowerCase()]">
                {{ t(`homeBusinessOwner.status.${order.status.toLowerCase()}`) }}
              </span>
          </td>
          <td>S/. {{ order.total }}</td>
        </tr>
        </tbody>
      </table>
    </section>

    <!--  Active Subscriptions -->
    <section class="subscriptions">
      <h3> {{ t('homeBusinessOwner.activeSubscriptionsTitle') }}</h3>
      <ul>
        <li v-for="(sub, i) in subscriptions" :key="i">
          <strong>{{ sub.name }}</strong> — {{ sub.type }} ({{ sub.renewal }})
        </li>
      </ul>
    </section>

    <!--  Loyalty Program -->
    <section class="loyalty">
      <h3> {{ t('homeBusinessOwner.loyaltyProgram') }}</h3>
      <p>
        {{ t('homeBusinessOwner.loyaltyPoints') }}
        <strong>{{ loyaltyPoints }}</strong>
      </p>
      <progress :value="loyaltyPoints" max="100"></progress>
      <p v-if="loyaltyPoints >= 100">{{ t('homeBusinessOwner.maxLoyalty') }}</p>
    </section>
  </div>
</template>

<script setup>
/* ============================================================
 *  Logic — Business Owner Dashboard (dynamic from db.json)
 * ============================================================ */
import { ref, reactive, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { httpClient } from '@/shared/infrastructure/http-client'
import ConnectionStatus from '@/shared/presentation/components/ui/connection-status.vue'
import { DEMO_USER_ID } from '@shared/domain/model/demo-user.js'

const { t } = useI18n({ useScope: 'global' })

const user = ref(null)
const stats = reactive({
  monthlyConsumption: 0,
  activeSubscriptions: 0,
  pendingOrders: 0,
  totalSpent: 0
})
const recentOrders = ref([])
const subscriptions = ref([])
const loyaltyPoints = ref(0)

onMounted(async () => {
  try {
    //  Load user
    const userRes = await httpClient.get(`/users/${DEMO_USER_ID}`)
    user.value = userRes.data
    loyaltyPoints.value = user.value.loyaltyPoints || 0

    //  Load orders
    const ordersRes = await httpClient.get(`/orders?userId=${user.value.id}`)
    const orders = ordersRes.data || []
    console.log('📦 Orders loaded:', orders)

    const normalizedOrders = orders.map(o => ({
      ...o,
      status: o.status?.trim().toLowerCase()
    }))

    // KPIs
    stats.monthlyConsumption = normalizedOrders
        .filter(o => ['delivered', 'pending'].includes(o.status))
        .reduce((sum, o) => sum + (o.liters || 0), 0)

    stats.pendingOrders = normalizedOrders.filter(o => o.status === 'pending').length
    stats.totalSpent = normalizedOrders
        .filter(o => o.status !== 'cancelled' && o.status !== 'canceled')
        .reduce((sum, o) => sum + (o.total || 0), 0)

    // Recent orders (last 3)
    recentOrders.value = orders.slice(-3).reverse()

    // Subscriptions
    const subsRes = await httpClient.get(`/subscriptions?userId=${user.value.id}`)
    subscriptions.value = subsRes.data?.filter(s => s.isActive) || []
    stats.activeSubscriptions = subscriptions.value.length
  } catch (error) {
    console.error('❌ Error loading business owner dashboard:', error)
  }
})

const userName = computed(() => (user.value ? user.value.firstName : 'Usuario'))
</script>

<style scoped>
/* ============================================================
 * Styles — Business Owner Dashboard
 * ============================================================ */
.business-dashboard {
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

/* Cards & Tables */
.recent-orders, .subscriptions, .loyalty {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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

/* Subscriptions */
.subscriptions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.subscriptions li {
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
}
.subscriptions strong {
  color: #2563eb;
}

/* Loyalty */
.loyalty progress {
  width: 100%;
  height: 12px;
  border-radius: 6px;
  margin: 0.5rem 0;
  accent-color: #2563eb;
}

/* Status */
.status {
  font-weight: 600;
  text-transform: capitalize;
}
.status.delivered { color: #16a34a; }
.status.pending { color: #f59e0b; }
.status.cancelled { color: #dc2626; }
</style>

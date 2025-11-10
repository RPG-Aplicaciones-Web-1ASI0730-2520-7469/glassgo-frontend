<template>
  <!-- ============================================================
       🧑‍💼 Home — Admin Dashboard (GlassGo)
       ------------------------------------------------------------
       Main admin view displaying global metrics, role distribution,
       and system activity logs.
       ============================================================ -->
  <div class="admin-dashboard">
    <ConnectionStatus /> <!-- ✅ Floating connection card -->

    <!-- 🏷️ Header -->
    <header class="header">
      <h1>⚙️ {{ t('homeAdmin.title') }}</h1>
      <p class="subtitle">{{ t('homeAdmin.subtitle') }}</p>
    </header>

    <!-- 📊 System KPIs -->
    <section class="kpi-section">
      <div class="kpi-card blue">
        <h2>{{ systemStats.totalUsers }}</h2>
        <p>{{ t('homeAdmin.kpi.totalUsers') }}</p>
      </div>
      <div class="kpi-card green">
        <h2>{{ systemStats.activeOrders }}</h2>
        <p>{{ t('homeAdmin.kpi.activeOrders') }}</p>
      </div>
      <div class="kpi-card yellow">
        <h2>{{ systemStats.servicesOnline }}</h2>
        <p>{{ t('homeAdmin.kpi.servicesOnline') }}</p>
      </div>
      <div class="kpi-card red">
        <h2>{{ systemStats.alerts }}</h2>
        <p>{{ t('homeAdmin.kpi.alerts') }}</p>
      </div>
    </section>

    <!-- 👥 Role distribution -->
    <section class="user-role-distribution">
      <h3>👥 {{ t('homeAdmin.roles.title') }}</h3>
      <ul>
        <li><span class="dot distributor"></span> {{ t('homeAdmin.roles.distributor') }} — {{ roleStats.distributor }}</li>
        <li><span class="dot transport"></span> {{ t('homeAdmin.roles.transport') }} — {{ roleStats.transport }}</li>
        <li><span class="dot business"></span> {{ t('homeAdmin.roles.business') }} — {{ roleStats.business }}</li>
        <li><span class="dot admin"></span> {{ t('homeAdmin.roles.admin') }} — {{ roleStats.admin }}</li>
      </ul>
    </section>

    <!-- 🧠 Recent system activity -->
    <section class="activity-log">
      <h3>🧠 {{ t('homeAdmin.activity.title') }}</h3>
      <table>
        <thead>
        <tr>
          <th>{{ t('homeAdmin.activity.date') }}</th>
          <th>{{ t('homeAdmin.activity.user') }}</th>
          <th>{{ t('homeAdmin.activity.action') }}</th>
          <th>{{ t('homeAdmin.activity.result') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(log, i) in activityLogs" :key="i">
          <td>{{ log.date }}</td>
          <td>{{ log.user }}</td>
          <td>{{ log.action }}</td>
          <td>
              <span :class="['status', log.status]">
                {{ t(`homeAdmin.status.${log.status}`) }}
              </span>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
/* ============================================================
 * 🧠 Logic — Admin Dashboard (dynamic data via db.json)
 * ============================================================ */
import { ref, onMounted } from 'vue'
import { httpClient } from '@/shared/infrastructure/http-client'
import ConnectionStatus from '@/shared/presentation/components/ui/connection-status.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })

const systemStats = ref({
  totalUsers: 0,
  activeOrders: 0,
  servicesOnline: 0,
  alerts: 0
})

const roleStats = ref({
  distributor: 0,
  transport: 0,
  business: 0,
  admin: 0
})

const activityLogs = ref([])

onMounted(async () => {
  try {
    // 1️⃣ Load general system data
    const systemRes = await httpClient.get('/system')
    const systemData = systemRes.data || {}
    systemStats.value = systemData.stats || systemStats.value
    roleStats.value = systemData.roleDistribution || roleStats.value

    // 2️⃣ Load activity logs
    const logsRes = await httpClient.get('/activityLogs')
    activityLogs.value = logsRes.data || []

    // 3️⃣ Compute metrics dynamically from real collections
    const usersRes = await httpClient.get('/users')
    const ordersRes = await httpClient.get('/orders')
    const servicesRes = await httpClient.get('/services')

    systemStats.value.totalUsers = usersRes.data.length
    systemStats.value.activeOrders = ordersRes.data.filter(o =>
        o.status?.toLowerCase() === 'active'
    ).length
    systemStats.value.servicesOnline = servicesRes.data.filter(s =>
        s.status?.toLowerCase() === 'online'
    ).length

    console.log('✅ Admin dashboard loaded successfully.')
  } catch (error) {
    console.error('❌ Error loading admin dashboard data:', error)
  }
})
</script>

<style scoped>
/* ============================================================
 * 🎨 Styles — Admin Dashboard
 * ============================================================ */
.admin-dashboard {
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

/* Role Distribution */
.user-role-distribution {
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.user-role-distribution h3 {
  margin-bottom: 1rem;
  color: #1e293b;
}
.user-role-distribution ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.user-role-distribution li {
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.dot.distributor { background: #2563eb; }
.dot.transport { background: #16a34a; }
.dot.business { background: #f59e0b; }
.dot.admin { background: #7e22ce; }

/* Activity Log */
.activity-log {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.activity-log table {
  width: 100%;
  border-collapse: collapse;
}
.activity-log th, .activity-log td {
  padding: 0.5rem 1rem;
  text-align: left;
}
.activity-log th {
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
}
.activity-log td {
  color: #1e293b;
  font-size: 0.9rem;
}
.status {
  font-weight: 600;
  text-transform: capitalize;
}
.status.success { color: #16a34a; }
.status.warning { color: #f59e0b; }
.status.danger { color: #dc2626; }
</style>

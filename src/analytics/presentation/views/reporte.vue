<template>
  <div class="dashboard-view">
    <div class="dashboard-header">
      <h1 class="titulo-reportes">Reporte</h1>
      <p class="subtitulo-reportes">Analiza desempeño, costos y eficiencia en reportes fáciles de entender.</p>
    </div>
    <div class="dashboard-main">
      <template v-if="analyticsStore.loading">
        <div class="no-data">Cargando reporte...</div>
      </template>
      <template v-else-if="currentReport">
        <div class="dashboard-chart-area">
          <dashboard-chart :chartData="chartData" :options="chartOptions" v-if="chartData.labels && chartData.labels.length" />
          <div v-else class="no-data">No hay datos suficientes para mostrar el gráfico.</div>
          <!-- Sección productos más pedidos solo para distribuidor -->
          <div v-if="userRole === 'distributor' && topProducts.length" class="top-products-section">
            <h3 class="top-products-title">Productos más pedidos del mes</h3>
            <table class="top-products-table">
              <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Cantidad</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(prod, idx) in topProducts" :key="prod.name">
                <td>{{ idx + 1 }}</td>
                <td>{{ prod.name }}</td>
                <td>{{ prod.quantity }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="dashboard-kpis">
          <kpi-card
              v-for="kpi in kpis"
              :key="kpi.label"
              :value="kpi.value"
              :label="kpi.label"
              :trend="kpi.trend"
              :link="kpi.link"
          />
          <div v-if="!kpis.length" class="no-data">No hay métricas para mostrar.</div>
        </div>
      </template>
      <template v-else>
        <div class="no-data" style="width:100%;text-align:center;padding:3rem 0;">No hay reporte disponible para tu usuario este mes.</div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.no-data {
  color: #888;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 2rem;
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAnalyticsStore } from '../../application/analytics.store.js';
import { useUserStore } from '@/stores/user.store.js';
import DashboardChart from '../components/dashboard-chart.vue';
import KpiCard from '../components/kpi-card.vue';
import { fetchTopProducts } from '../../infrastructure/top-products-api.js';

const analyticsStore = useAnalyticsStore();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const userId = computed(() => user.value?.id);
const userRole = computed(() => user.value?.role);

const currentReport = computed(() => {
  // Mostrar siempre el reporte de distribuidor/octubre aunque el userId no coincida
  const defaultReports = analyticsStore.reports.filter(r => r.role === 'distributor' && r.period && r.period.toLowerCase().includes('octubre'));
  if (defaultReports.length > 0) {
    return defaultReports.slice().sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt))[0];
  }
  // Si no existe, mostrar el último reporte disponible
  if (analyticsStore.reports.length > 0) {
    return analyticsStore.reports.slice().sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt))[0];
  }
  return undefined;
});

const kpis = computed(() => {
  if (!currentReport.value) return [];
  // Mostrar todas las métricas como KPIs
  return currentReport.value.metrics.map(m => ({
    value: m.value,
    label: m.name,
    trend: 0, // Aquí puedes calcular tendencia si tienes datos históricos
    link: null
  }));
});

// Ejemplo: gráfico de barras con los pedidos completados y pendientes
const chartData = computed(() => {
  if (!currentReport.value) return { labels: [], datasets: [] };
  // Solo para distribuidor: mostrar pedidos completados y pendientes
  if (currentReport.value.role === 'distributor') {
    return {
      labels: currentReport.value.metrics.filter(m => m.name.includes('Pedidos')).map(m => m.name),
      datasets: [
        {
          label: currentReport.value.period,
          backgroundColor: ['#42A5F5', '#EF5350', '#FFA726', '#66BB6A'],
          data: currentReport.value.metrics.filter(m => m.name.includes('Pedidos')).map(m => m.value)
        }
      ]
    };
  }
  // Para otros roles, mostrar todas las métricas
  return {
    labels: currentReport.value.metrics.map(m => m.name),
    datasets: [
      {
        label: currentReport.value.period,
        backgroundColor: '#42A5F5',
        data: currentReport.value.metrics.map(m => m.value)
      }
    ]
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: currentReport.value ? currentReport.value.title : '' }
  },
  indexAxis: 'y',
  scales: {
    x: { title: { display: true, text: '' } },
    y: { title: { display: true, text: '' } }
  }
}));

// Productos más pedidos (top 3) para distribuidor
const topProducts = ref([]);
onMounted(async () => {
  await analyticsStore.loadReports();
  // Debug: mostrar usuario y reportes cargados
  console.log('Usuario logueado:', user.value);
  console.log('userId:', userId.value, 'userRole:', userRole.value);
  console.log('Reportes cargados:', analyticsStore.reports);
  console.log('Reporte encontrado:', currentReport.value);

  // Solo para distribuidor, obtener top productos del mes
  if (userRole.value === 'distributor' && userId.value) {
    const now = new Date();
    try {
      topProducts.value = await fetchTopProducts({
        userId: userId.value,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        top: 3
      });
    } catch (e) {
      topProducts.value = [];
    }
  }
});
</script>
<style scoped>
/* Mejora visual tabla top productos */
.top-products-section {
  margin-top: 2rem;
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.top-products-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #003057;
  margin-bottom: 1rem;
}
.top-products-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.top-products-table th, .top-products-table td {
  padding: 0.7rem 1.2rem;
  text-align: left;
  border-bottom: 1px solid #e3e8ee;
  font-size: 1rem;
}
.top-products-table th {
  background: #003057;
  color: #fff;
  font-weight: 700;
  border-bottom: 2px solid #003057;
}
.top-products-table tr:last-child td {
  border-bottom: none;
}
.top-products-table tr:nth-child(even) td {
  background: #f0f4fa;
}
.top-products-table tr:nth-child(odd) td {
  background: #fff;
}
.top-products-table td {
  color: #003057;
  font-weight: 500;
}
</style>

<style scoped>
.dashboard-view {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 2rem;
}
.dashboard-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}
.titulo-reportes {
  margin: 0 0 0.5rem 0;
  color: #003057;
  font-size: 2.5rem;
  font-weight: 800;
}
.subtitulo-reportes {
  margin: 0;
  color: #003057;
  font-size: 1.2rem;
  font-weight: 500;
}
.dashboard-main {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
}
.dashboard-chart-area {
  flex: 2;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 2rem 1.5rem;
}
.dashboard-kpis {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
</style>

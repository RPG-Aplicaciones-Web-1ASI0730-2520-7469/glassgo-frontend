<template>
  <div class="home-container">
    <!-- Header de bienvenida -->
    <div class="welcome-header">
      <h1>{{ t('dashboard.greeting', { name: userFirstName }) }}! 👋</h1>
      <p>{{ t('dashboard.summary') }}</p>
    </div>

    <!-- Métricas principales -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">{{ t('dashboard.metrics.activeOrders') }}</span>
        </div>
        <div class="metric-value">230</div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">{{ t('dashboard.metrics.availableStock') }}</span>
        </div>
        <div class="metric-value">342</div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">{{ t('dashboard.metrics.estimatedTime') }}</span>
        </div>
        <div class="metric-value">42 hrs</div>
      </div>

      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-label">{{ t('dashboard.metrics.avoidedOrders') }}</span>
        </div>
        <div class="metric-value">230</div>
      </div>
    </div>

    <!-- Tarjetas de secciones principales -->
    <div class="sections-grid">
      <!-- Tracking & Pedidos recientes -->
      <div class="section-card">
        <div class="section-header">
          <h3>{{ t('dashboard.sections.tracking') }}</h3>
          <router-link to="/app/tracking" class="view-more">{{ t('dashboard.viewMore') }}</router-link>
        </div>
        <div class="section-content">
          <div class="status-item">
            <span class="status-label">{{ t('dashboard.status.inTransit') }}</span>
            <div class="tracking-items">
              <div class="tracking-item">
                <span class="tracking-number">{{ t('dashboard.trackingNumber') }}: GG2025010002</span>
              </div>
              <div class="tracking-item">
                <span class="tracking-number">{{ t('dashboard.trackingNumber') }}: GG2025010007</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventario -->
      <div class="section-card">
        <div class="section-header">
          <h3>{{ t('dashboard.sections.inventory') }}</h3>
          <router-link to="/app/inventario" class="view-more">{{ t('dashboard.viewMore') }}</router-link>
        </div>
        <div class="section-content">
          <div class="status-item">
            <span class="status-label">{{ t('dashboard.status.status') }}</span>
            <div class="inventory-items">
              <div class="inventory-item">
                <span class="tracking-number">{{ t('dashboard.trackingNumber') }}: GG2025010002</span>
              </div>
              <div class="inventory-item">
                <span class="tracking-number">{{ t('dashboard.trackingNumber') }}: GG2025010007</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reportes -->
      <div class="section-card">
        <div class="section-header">
          <h3>{{ t('dashboard.sections.reports') }}</h3>
          <router-link to="/app/reportes" class="view-more">{{ t('dashboard.viewMore') }}</router-link>
        </div>
        <div class="section-content">
          <div class="status-item">
            <span class="status-label">{{ t('dashboard.sections.visualizeReports') }}</span>
          </div>
        </div>
      </div>

      <!-- Calendario -->
      <div class="section-card">
        <div class="section-header">
          <h3>{{ t('dashboard.sections.calendar') }}</h3>
          <router-link to="/app/calendar" class="view-more">{{ t('dashboard.viewMore') }}</router-link>
        </div>
        <div class="section-content">
          <div class="calendar-info">
            <div class="calendar-item">
              <i class="pi pi-calendar"></i>
              <span>30 / Jun / 2025</span>
            </div>
            <div class="calendar-item">
              <span>{{ t('dashboard.order') }}: GG2025010054</span>
            </div>
            <div class="calendar-item">
              <span>{{ t('dashboard.order') }}: GG2025010055</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const userFirstName = computed(() => {
  return 'Usuario'; // Default user name for demo
});

const metrics = ref({
  activePedidos: 230,
  stockDisponible: 342,
  tiempoEstimado: '42 hrs',
  pedidosEvitados: 230
});

onMounted(() => {
  console.log('Dashboard loaded');
});
</script>

<style scoped>
.home-container {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.welcome-header {
  margin-bottom: 2rem;
}

.welcome-header h1 {
  margin: 0 0 0.5rem 0;
  color: #1a202c;
  font-size: 1.875rem;
  font-weight: 600;
}

.welcome-header p {
  margin: 0;
  color: #64748b;
  font-size: 1rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.metric-label {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-top: 0.5rem;
}

.sections-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.section-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section-header {
  background: #1e293b;
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.view-more {
  color: white;
  text-decoration: none;
  font-size: 0.875rem;
  opacity: 0.8;
}

.view-more:hover {
  opacity: 1;
}

.section-content {
  padding: 1.5rem;
}

.status-label {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  margin-bottom: 1rem;
}

.tracking-item, .inventory-item {
  margin-bottom: 0.75rem;
}

.tracking-number {
  color: #059669;
  font-size: 0.875rem;
  font-weight: 500;
}

.calendar-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.calendar-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  font-size: 0.875rem;
}

@media (max-width: 1024px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .sections-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
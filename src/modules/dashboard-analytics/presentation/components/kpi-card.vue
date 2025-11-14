<template>
  <div class="kpi-card" :class="trendClass">
    <div class="kpi-value">
      {{ value }}
      <span v-if="trend !== 0" class="kpi-trend">
        <i :class="trend > 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
        {{ Math.abs(trend) }}%
      </span>
    </div>
    <div class="kpi-label">{{ label }}</div>
    <div v-if="link" class="kpi-link">
      <a :href="link.url" target="_blank">{{ link.text }}</a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  value: [String, Number],
  label: String,
  trend: { type: Number, default: 0 },
  link: { type: Object, default: null }
})

const trendClass = props.trend > 0 ? 'kpi-up' : props.trend < 0 ? 'kpi-down' : ''
</script>

<style scoped>
.kpi-card {
  background: #fff;
  border: 2px solid #222;
  border-radius: 12px;
  padding: 1.2rem 1rem 1rem 1rem;
  margin-bottom: 1.2rem;
  min-width: 220px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.kpi-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
}
.kpi-label {
  font-size: 1.1rem;
  color: #222;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.kpi-link a {
  color: #1976d2;
  font-size: 0.95rem;
  text-decoration: underline;
}
.kpi-up .kpi-value { color: #2e7d32; }
.kpi-down .kpi-value { color: #c62828; }
.kpi-trend {
  font-size: 1rem;
  margin-left: 0.5rem;
}
.kpi-up .kpi-trend { color: #2e7d32; }
.kpi-down .kpi-trend { color: #c62828; }
</style>

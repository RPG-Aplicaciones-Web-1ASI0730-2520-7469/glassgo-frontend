<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Reportes Generados</h2>
    <ul v-if="reports.length">
      <li v-for="report in reports" :key="report.reportId" class="mb-2 p-3 border rounded bg-white">
        <div class="font-semibold">{{ report.title }}</div>
        <div class="text-sm text-gray-500">{{ report.period }} | {{ report.generatedAt }}</div>
        <div class="text-xs">{{ report.metrics.length }} métricas</div>
      </li>
    </ul>
    <div v-else class="text-gray-400">No hay reportes generados.</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAnalyticsStore } from '../../application/analytics.store.js';
const store = useAnalyticsStore();
const reports = computed(() => store.reports);
</script>

<template>
  <!-- =============================================================
       Payments — Admin View
       -------------------------------------------------------------
       Displays all system payments for auditing and tracking.
       ============================================================= -->
  <section class="payments-admin">
    <header class="header">
      <h1>🧾 {{ t('payments.titleAdmin') }}</h1>
      <p class="subtitle">{{ t('payments.subtitleAdmin') }}</p>
    </header>

    <!--  Filters -->
    <div class="filters">
      <input
          v-model="search"
          type="text"
          :placeholder="t('payments.searchPlaceholder')"
      />
    </div>

    <!--  Global Table -->
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>{{ t('payments.table.user') }}</th>
        <th>{{ t('payments.table.amount') }}</th>
        <th>{{ t('payments.table.date') }}</th>
        <th>{{ t('payments.table.status') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in filtered" :key="p.id">
        <td>#{{ p.id }}</td>
        <td>{{ p.userId }}</td>
        <td>{{ p.currency }} {{ p.amount.toFixed(2) }}</td>
        <td>{{ p.date }}</td>
        <td><span :class="['status', p.status]">{{ t(`payments.status.${p.status}`) }}</span></td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { httpClient } from '@/shared/infrastructure/http-client'

const { t } = useI18n({ useScope: 'global' })
const payments = ref([])
const search = ref('')

onMounted(async () => {
  const res = await httpClient.get('/payments')
  payments.value = res.data || []
})

const filtered = computed(() =>
    payments.value.filter(p =>
        String(p.userId).toLowerCase().includes(search.value.toLowerCase())
    )
)
</script>

<style scoped>
.header h1 { font-size:1.6rem; font-weight:700; color:#1e293b; }
.subtitle { color:#64748b; margin-bottom:1rem; }
.filters { margin-bottom:1rem; }
.filters input {
  width:100%; padding:0.5rem 0.8rem; border-radius:8px; border:1px solid #cbd5e1;
}
table {
  width:100%; border-collapse:collapse; background:#fff;
  border-radius:12px; overflow:hidden;
  box-shadow:0 2px 6px rgba(0,0,0,0.05);
}
th, td { padding:0.75rem 1rem; text-align:left; }
th { background:#f1f5f9; color:#475569; font-weight:600; }
td { color:#1e293b; }
.status.completed { color:#16a34a; }
.status.pending { color:#f59e0b; }
.status.failed, .status.cancelled { color:#dc2626; }
</style>

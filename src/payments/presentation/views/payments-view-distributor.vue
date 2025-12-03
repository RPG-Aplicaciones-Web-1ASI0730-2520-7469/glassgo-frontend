<template>
  <!-- =============================================================
        Payments — Distributor View
       -------------------------------------------------------------
       Displays received commissions or pending payouts related
       to distribution operations.
       ============================================================= -->
  <section class="payments-distributor">
    <header class="header">
      <h1>💰 {{ t('payments.titleDistributor') }}</h1>
      <p class="subtitle">{{ t('payments.subtitleDistributor') }}</p>
    </header>

    <table>
      <thead>
      <tr>
        <th>{{ t('payments.table.id') }}</th>
        <th>{{ t('payments.table.date') }}</th>
        <th>{{ t('payments.table.amount') }}</th>
        <th>{{ t('payments.table.status') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in payments" :key="p.id">
        <td>#{{ p.id }}</td>
        <td>{{ p.date }}</td>
        <td>{{ p.currency }} {{ p.amount.toFixed(2) }}</td>
        <td><span :class="['status', p.status]">{{ t(`payments.status.${p.status}`) }}</span></td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { DEMO_USER_ID } from '@/shared/config/demo-user'
import { getPaymentsByUser } from '../../application/payment.service'

const { t } = useI18n({ useScope: 'global' })
const payments = ref([])

onMounted(async () => {
  payments.value = await getPaymentsByUser(DEMO_USER_ID)
})
</script>

<style scoped>
.header h1 { font-size:1.6rem; font-weight:700; color:#1e293b; }
.subtitle { color:#64748b; margin-bottom:1rem; }
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
.status.failed { color:#dc2626; }
</style>

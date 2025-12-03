<template>
  <article class="card">
    <header class="row">
      <strong>#{{ payment.id }}</strong>
      <span :class="['status', payment.status]">
        {{ t(`payments.status.${payment.status}`) }}
      </span>
    </header>

    <p class="amount">
      {{ currency }} {{ payment.amount.toFixed(2) }}
    </p>

    <footer class="meta">
      <small>{{ t('payments.date') }}: {{ payment.date }}</small>
    </footer>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  payment: { type: Object, required: true }
})

const { t } = useI18n({ useScope: 'global' })
const currency = computed(() => (props.payment.currency || 'PEN'))
</script>

<style scoped>
.card {
  background: #fff; border: 1px solid #e5eaf0; border-radius: 12px;
  padding: .9rem 1rem; display: flex; flex-direction: column; gap: .25rem;
}
.row { display: flex; justify-content: space-between; align-items: center; }
.amount { margin: .2rem 0; font-size: 1.15rem; font-weight: 700; color: #111827; }
.meta { color: #6b7280; }
.status { padding: .1rem .5rem; border-radius: 999px; font-size: .75rem; font-weight: 700; text-transform: capitalize; }
.status.completed { background: #ecfdf5; color: #065f46; }
.status.pending   { background: #fff7ed; color: #9a3412; }
.status.failed,
.status.cancelled,
.status.canceled  { background: #fef2f2; color: #991b1b; }
</style>

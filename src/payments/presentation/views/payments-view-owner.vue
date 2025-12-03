<template>
  <!-- =============================================================
       Payments — Business Owner View (GlassGo)
       -------------------------------------------------------------
       Displays the user's current payments, active subscriptions,
       and allows renewal or quick payment actions.
       ============================================================= -->
  <section class="payments-owner">
    <header class="header">
      <h1>💳 {{ t('payments.titleOwner') }}</h1>
      <p class="subtitle">{{ t('payments.subtitleOwner') }}</p>
    </header>

    <!--  Active Subscription -->
    <div v-if="subscription" class="subscription-card">
      <h2>{{ t('payments.activeSubscription') }}</h2>
      <p>
        {{ t('payments.plan') }}:
        <strong>{{ subscription.plan }}</strong> —
        {{ t('payments.renewal') }}: <strong>{{ subscription.renewalDate }}</strong>
      </p>
      <button class="btn" @click="renew">{{ t('payments.renewNow') }}</button>
    </div>

    <!--  Payment History -->
    <div class="payment-history">
      <h2>{{ t('payments.history') }}</h2>
      <div class="grid">
        <article
            v-for="p in payments"
            :key="p.id"
            class="payment-card"
        >
          <header>
            <strong>#{{ p.id }}</strong>
            <span :class="['status', p.status]">
              {{ t(`payments.status.${p.status}`) }}
            </span>
          </header>
          <p>{{ p.currency }} {{ p.amount.toFixed(2) }}</p>
          <small>{{ t('payments.date') }}: {{ p.date }}</small>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { DEMO_USER_ID } from '@/shared/config/demo-user'
import { getPaymentsByUser, getSubscriptionByUser, createPayment } from '../../application/payment.service'

const { t } = useI18n({ useScope: 'global' })
const payments = ref([])
const subscription = ref(null)

onMounted(async () => {
  const [p, s] = await Promise.all([
    getPaymentsByUser(DEMO_USER_ID),
    getSubscriptionByUser(DEMO_USER_ID)
  ])
  payments.value = p
  subscription.value = s
})

async function renew() {
  const payload = {
    userId: DEMO_USER_ID,
    amount: 39.9,
    currency: 'PEN',
    date: new Date().toISOString().slice(0, 10),
    status: 'completed'
  }
  const newPayment = await createPayment(payload)
  payments.value.unshift(newPayment)
}
</script>

<style scoped>
.payments-owner { display:flex; flex-direction:column; gap:1.5rem; }
.header h1 { font-size:1.6rem; font-weight:700; color:#1e293b; }
.subtitle { color:#64748b; }

.subscription-card {
  background:#fff; padding:1rem; border-radius:12px;
  box-shadow:0 2px 6px rgba(0,0,0,0.05);
}
.btn {
  margin-top:.5rem; background:#2563eb; color:#fff;
  border:none; border-radius:8px; padding:.5rem 1rem;
  font-weight:600; cursor:pointer;
}
.payment-history .grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:.8rem;
}
.payment-card {
  background:#fff; border-radius:10px; padding:1rem;
  box-shadow:0 2px 6px rgba(0,0,0,0.05);
}
.status.completed { color:#16a34a; }
.status.pending { color:#f59e0b; }
.status.failed, .status.cancelled { color:#dc2626; }
</style>

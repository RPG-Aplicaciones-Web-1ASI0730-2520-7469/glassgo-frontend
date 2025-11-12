<template>
  <article class="card">
    <header class="row">
      <strong>📄 {{ t('payments.subscription.title') }}</strong>
      <span :class="['badge', isActive ? 'on' : 'off']">
        {{ isActive ? t('payments.subscription.active') : t('payments.subscription.inactive') }}
      </span>
    </header>

    <p class="plan">
      {{ t('payments.subscription.plan') }}: <strong>{{ sub.plan }}</strong>
    </p>
    <p class="renewal" v-if="sub.renewalDate">
      {{ t('payments.subscription.renewal') }}: <strong>{{ sub.renewalDate }}</strong>
    </p>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  sub: { type: Object, required: true }
})

const { t } = useI18n({ useScope: 'global' })
const isActive = computed(() => !!props.sub.isActive)
</script>

<style scoped>
.card { background:#fff; border:1px solid #e5eaf0; border-radius:12px; padding:1rem; }
.row { display:flex; justify-content:space-between; align-items:center; }
.badge { padding:.15rem .5rem; border-radius:999px; font-size:.75rem; font-weight:700; }
.badge.on  { background:#ecfdf5; color:#065f46; }
.badge.off { background:#f1f5f9; color:#334155; }
.plan, .renewal { margin:.35rem 0; color:#1f2937; }
</style>

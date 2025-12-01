<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();

const email = ref('');
const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (!email.value.trim()) {
    toast.add({
      severity: 'error',
      summary: t('auth.validation-error'),
      detail: t('auth.required-field', { field: t('auth.username') }),
      life: 3000
    });
    return;
  }
  isSubmitting.value = true;
  // Simulate sending recovery email
  setTimeout(() => {
    toast.add({
      severity: 'success',
      summary: t('auth.forgot-password'),
      detail: t('auth.recovery-email-sent'),
      life: 5000
    });
    isSubmitting.value = false;
    router.push('/auth/login');
  }, 1500);
// ...existing code...
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h2 class="login-title">{{ t('auth.forgot-password') }}</h2>
    <div class="field">
      <InputText
        id="email"
        name="email"
        v-model="email"
        type="email"
        autocomplete="email"
        class="w-full clean-input"
        :placeholder="t('auth.username')"
      />
    </div>
    <Button
      type="submit"
      :label="t('auth.send-recovery')"
      class="w-full sign-in-btn"
      :loading="isSubmitting"
      :disabled="isSubmitting"
    />
    <div class="no-account">
      <a class="register-link" href="#" @click.prevent="router.push('/auth/login')">{{ t('auth.back-to-login') }}</a>
    </div>
  </form>
</template>

<style scoped>
.login-title {
  font-size: 3rem;
  font-weight: 900;
  color: #000;
  letter-spacing: -0.03em;
  font-family: 'Baloo Chettan 2', cursive;
  margin-bottom: 2.5rem;
  text-align: center;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 420px;
  width: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 3.5rem;
}
.field {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  max-width: 420px;
}
.clean-input {
  padding: 1rem 1.5rem !important;
  border: 2px solid #e5e7eb !important;
  border-radius: 12px !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  background: #f9fafb !important;
  transition: all 0.2s ease !important;
  font-family: 'Baloo Chettan 2', cursive !important;
  color: #111827 !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
  width: 100% !important;
  max-width: 420px !important;
}
.clean-input:focus {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  outline: none !important;
}
.clean-input::placeholder {
  color: #6b7280 !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
  font-family: 'Baloo Chettan 2', cursive !important;
}
.sign-in-btn {
  background: #6b7280 !important;
  border-color: #6b7280 !important;
  color: #ffffff !important;
  font-weight: 800 !important;
  padding: 1rem 2rem !important;
  border-radius: 12px !important;
  font-size: 1rem !important;
  letter-spacing: 0.025em !important;
  transition: all 0.2s ease !important;
  font-family: 'Baloo Chettan 2', cursive !important;
  box-shadow: 0 6px 18px rgba(107, 114, 128, 0.18) !important;
  width: auto !important;
  max-width: 300px !important;
  min-width: 250px !important;
}
.sign-in-btn:hover:not(:disabled) {
  background: #4b5563 !important;
  border-color: #4b5563 !important;
  color: #ffffff !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 22px rgba(107, 114, 128, 0.22) !important;
}
.no-account {
  margin-top: 0.5rem;
  color: #374151;
  font-family: 'Baloo Chettan 2', cursive;
  font-size: 0.95rem;
}
.register-link {
  color: #2563eb;
  font-weight: 700;
  margin-left: 0.25rem;
  cursor: pointer;
  text-decoration: none;
}
.register-link:hover {
  text-decoration: underline;
}
</style>
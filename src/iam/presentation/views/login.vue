// ...existing code...
<script setup>
import {ref, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {useToast} from 'primevue/usetoast';
import {useAuthStore} from '../../application/auth.store.js';
import {LoginCredentials} from '../../domain/model/login-credentials.entity.js';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

// Navigate to register view
const handleRegister = () => {
  router.push({ name: 'auth-register' });
};

// Form state
const formData = reactive({
  email: '',
  password: '',
  role: 'distributor', // Default selection
  rememberMe: false
});

const showPassword = ref(false);
const isSubmitting = ref(false);

// Form validation
const validateForm = () => {
  const errors = [];
  
  if (!formData.email.trim()) {
    errors.push(t('auth.required-field', { field: t('auth.username') }));
  }
  
  if (!formData.password.trim()) {
    errors.push(t('auth.required-field', { field: t('auth.password') }));
  }
  
  if (!formData.role) {
    errors.push(t('auth.required-field', { field: t('auth.user-type') }));
  }
  
  return errors;
};

// Handle form submission
const handleSubmit = async () => {
  const validationErrors = validateForm();
  
  if (validationErrors.length > 0) {
    validationErrors.forEach(error => {
      toast.add({
        severity: 'error',
        summary: t('auth.validation-error'),
        detail: error,
        life: 3000
      });
    });
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    const credentials = new LoginCredentials({
      username: formData.email,
      password: formData.password,
      role: formData.role,
      rememberMe: formData.rememberMe
    });
    
    const user = await authStore.login(credentials);
    
    toast.add({
      severity: 'success',
      summary: t('auth.welcome'),
      detail: `Logged in as ${user.role}`,
      life: 3000
    });
    
    // Redirect to home
    router.push('/app/home');
    
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('auth.login-failed'),
      detail: error.message || t('auth.invalid-credentials'),
      life: 5000
    });
  } finally {
    isSubmitting.value = false;
  }
};

// Handle forgot password
const handleForgotPassword = () => {
  router.push('/auth/forgot-password');
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="login-form">
      <h2 class="login-title">{{ t('auth.sign-in') }}</h2>
      <!-- User Field -->
      <div class="field">
           <InputText 
          id="email"
          name="email"
          v-model="formData.email"
          type="text"
          :placeholder="t('auth.username')"
          autocomplete="email"
          class="w-full clean-input"
        />
      </div>

      <!-- Password Field -->
      <div class="field">
           <IconField icon-position="right">
             <InputIcon class="cursor-pointer" @click="showPassword = !showPassword">
               <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
             </InputIcon>
             <InputText 
            id="password"
            name="password"
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="t('auth.password')"
            autocomplete="current-password"
            class="w-full clean-input"
          />
  </IconField>
      </div>

      <!-- Role Selection -->
      <div class="role-selection">
        <div class="role-options">
          <div class="role-option">
            <input 
              type="radio"
              id="distributor"
              v-model="formData.role"
              name="role"
              value="distributor"
              class="role-radio"
            />
            <label for="distributor" class="role-label">{{ t('auth.distributor') }}</label>
          </div>
          
          <div class="role-option">
            <input 
              type="radio"
              id="transport"
              v-model="formData.role"
              name="role"
              value="carrier"
              class="role-radio"
            />
            <label for="transport" class="role-label">{{ t('auth.transport') }}</label>
          </div>
          
          <div class="role-option">
            <input 
              type="radio"
              id="business"
              v-model="formData.role"
              name="role"
              value="business-owner"
              class="role-radio"
            />
            <label for="business" class="role-label">{{ t('auth.business-owner') }}</label>
          </div>
        </div>
      </div>

      <!-- Remember Me -->
      <div class="field-checkbox">
           <Checkbox 
          id="rememberMe"
          name="rememberMe"
          v-model="formData.rememberMe"
          binary
        />
        <label for="rememberMe" class="remember-label">{{ t('auth.remember-me') }}</label>
      </div>

      <!-- Forgot Password Link -->
      <div class="forgot-password">
        <a @click="handleForgotPassword" class="forgot-link">
          {{ t('auth.forgot-password') }}
        </a>
      </div>

      <!-- Sign In Button -->
         <Button 
        type="submit"
        :label="t('auth.sign-in')"
        class="w-full sign-in-btn"
        :loading="isSubmitting"
        :disabled="isSubmitting"
      />

      <!-- Inline register link -->
      <div class="no-account">
        <span>¿No tienes una cuenta? </span>
        <a class="register-link" href="#" @click.prevent="handleRegister">Regístrate aquí</a>
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

.field-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
  text-align: center;
  width: 100%;
}

.remember-label {
  color: #374151;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Baloo Chettan 2', cursive;
}

.forgot-password {
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.forgot-link {
  color: #2563eb;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
  font-family: 'Baloo Chettan 2', cursive;
}

.forgot-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.sign-in-btn {
  /* Primary button: gray #6b7280 */
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

.register-btn {
  background: transparent !important;
  border: 2px solid #d1d5db !important;
  color: #111827 !important;
  font-weight: 700 !important;
  padding: 0.9rem 1.5rem !important;
  border-radius: 12px !important;
  font-size: 0.95rem !important;
  width: auto !important;
  max-width: 300px !important;
  min-width: 250px !important;
  margin-top: 0.5rem !important;
  box-shadow: 0 4px 12px rgba(17,24,39,0.04) !important;
}

.register-btn:hover:not(:disabled) {
  background: #f3f4f6 !important;
  border-color: #c8ccd0 !important;
  transform: translateY(-1px) !important;
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

/* Role selection styles */
.role-selection {
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
}

.role-options {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: nowrap;
  margin-bottom: 0;
  width: 100%;
}

.role-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.role-radio {
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  background: #ffffff;
  transition: all 0.2s ease;
  position: relative;
}

.role-radio:checked {
  border-color: #3b82f6;
  background: #ffffff;
}

.role-radio:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3b82f6;
}

.role-radio:hover {
  border-color: #9ca3af;
}

.role-label {
  font-family: 'Baloo Chettan 2', cursive;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  margin-left: 0.25rem;
  user-select: none;
}

/* PrimeVue overrides */
.login-form .field .p-icon-field {
  position: relative !important;
}

.login-form .field .p-icon-field .p-input-icon {
  position: absolute !important;
  right: 1rem !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  color: #6b7280 !important;
  font-size: 1.2rem !important;
  cursor: pointer !important;
  z-index: 100 !important;
  padding: 0.5rem !important;
  width: auto !important;
  height: auto !important;
}

.login-form .field .p-icon-field .p-input-icon:hover {
  color: #374151 !important;
}

.login-form .field .p-icon-field .p-inputtext {
  padding-right: 3.5rem !important;
}

.field-checkbox .p-checkbox .p-checkbox-box {
  width: 20px !important;
  height: 20px !important;
  border: 2px solid #d1d5db !important;
  border-radius: 4px !important;
  background: #ffffff !important;
  transition: all 0.2s ease !important;
}

.field-checkbox .p-checkbox .p-checkbox-box:hover {
  border-color: #9ca3af !important;
}

.field-checkbox .p-checkbox .p-checkbox-box.p-highlight {
  border-color: #3b82f6 !important;
  background: #3b82f6 !important;
}

.field-checkbox .p-checkbox .p-checkbox-box .p-checkbox-icon {
  color: #ffffff !important;
  font-size: 12px !important;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .login-form {
    max-width: 100%;
  }
  
  .role-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .role-option {
    justify-content: flex-start;
  }
}
</style>
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

// Form state
const formData = reactive({
  email: '',
  password: '',
  role: 'distributor', // Default selection
  rememberMe: false
});

const showPassword = ref(false);
const isSubmitting = ref(false);

// Role options
const roleOptions = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Distributor', value: 'distributor' },
  { label: 'Transport Company', value: 'transport' }
];

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
    
    // Redirect to profile for all users
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

// Navigate to register view
const handleRegister = () => {
  router.push({ name: 'auth-register' });
};

// Handle social login (placeholder functions)
const handleGoogleLogin = () => {
  toast.add({
    severity: 'info',
    summary: 'Coming Soon',
    detail: 'Google login will be available soon',
    life: 3000
  });
};

const handleFacebookLogin = () => {
  toast.add({
    severity: 'info',
    summary: 'Coming Soon',
    detail: 'Facebook login will be available soon',
    life: 3000
  });
};

const handleAppleLogin = () => {
  toast.add({
    severity: 'info',
    summary: 'Coming Soon',
    detail: 'Apple login will be available soon',
    life: 3000
  });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="login-form">
        <!-- User Field -->
        <div class="field">
          <pv-input-text 
            id="email"
            name="email"
            v-model="formData.email"
            type="text"
            :placeholder="t('auth.username')"
            autocomplete="email"
            class="w-full clean-input"
            :class="{ 'p-invalid': !formData.email.trim() }"
          />
        </div>

        <!-- Password Field -->
        <div class="field">
          <pv-icon-field icon-position="right">
            <pv-input-icon class="cursor-pointer" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
            </pv-input-icon>
            <pv-input-text 
              id="password"
              name="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="t('auth.password')"
              autocomplete="current-password"
              class="w-full clean-input"
              :class="{ 'p-invalid': !formData.password.trim() }"
            />
          </pv-icon-field>
        </div>

      <!-- Role Selection (radio buttons) -->
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
              value="transport"
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
              value="admin"
              class="role-radio"
            />
            <label for="business" class="role-label">{{ t('auth.admin') }}</label>
          </div>
        </div>
      </div>

      <!-- Role Selection (hidden but required for backend) -->
      <!-- <input type="hidden" v-model="formData.role" value="admin" /> -->

      <!-- Remember Me -->
      <div class="field-checkbox">
        <pv-checkbox 
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
      <pv-button 
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

      <!-- Divider -->
      <div class="divider">
        <hr class="divider-line"/>
        <span class="divider-text">{{ t('auth.sign-in-with') }}</span>
        <hr class="divider-line"/>
      </div>

      <!-- Social Login Buttons -->
      <div class="social-buttons">
        <pv-button 
          @click="handleGoogleLogin"
          class="social-btn google-btn"
          :disabled="isSubmitting"
        >
          <i class="pi pi-google"></i>
        </pv-button>
        
        <pv-button 
          @click="handleFacebookLogin"
          class="social-btn facebook-btn"
          :disabled="isSubmitting"
        >
          <i class="pi pi-facebook"></i>
        </pv-button>
        
        <pv-button 
          @click="handleAppleLogin"
          class="social-btn apple-btn"
          :disabled="isSubmitting"
        >
          <i class="pi pi-apple"></i>
        </pv-button>
      </div>
    </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 420px;
  width: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;
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
  /* Primary button: brand navy */
  background: #002240 !important;
  border-color: #002240 !important;
  color: #ffffff !important;
  font-weight: 800 !important;
  padding: 1rem 2rem !important;
  border-radius: 12px !important;
  font-size: 1rem !important;
  letter-spacing: 0.025em !important;
  transition: all 0.2s ease !important;
  font-family: 'Baloo Chettan 2', cursive !important;
  box-shadow: 0 6px 18px rgba(0, 34, 64, 0.25) !important;
  width: auto !important;
  max-width: 300px !important;
  min-width: 250px !important;
}

.sign-in-btn:hover:not(:disabled) {
  background: #003366 !important;
  border-color: #003366 !important;
  color: #ffffff !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 22px rgba(0, 34, 64, 0.28) !important;
}

.divider {
  display: flex;
  align-items: center;
  margin: 1rem 0 1rem 0;
  width: 100%;
}

.divider-line {
  flex: 1;
  height: 1px;
  border: none;
  background: #e5e7eb;
}

.divider-text {
  padding: 0 1.5rem;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Baloo Chettan 2', cursive;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.social-btn {
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: none !important;
  transition: all 0.2s ease !important;
  padding: 0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.social-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.google-btn {
  background: #ffffff !important;
  color: #4285f4 !important;
  border: 1px solid #dadce0 !important;
}

.google-btn:hover:not(:disabled) {
  background: #f8f9fa !important;
}

.facebook-btn {
  background: #1877f2 !important;
  color: #ffffff !important;
}

.facebook-btn:hover:not(:disabled) {
  background: #166fe5 !important;
}

.apple-btn {
  background: #000000 !important;
  color: #ffffff !important;
}

.apple-btn:hover:not(:disabled) {
  background: #1a1a1a !important;
}

/* Global PrimeVue overrides for icon positioning */
.p-icon-field.p-icon-field-right > .p-input-icon {
  right: 1rem !important;
  color: #6b7280 !important;
  font-size: 1.2rem !important;
  cursor: pointer !important;
}

.p-icon-field.p-icon-field-right > .p-inputtext {
  padding-right: 3.5rem !important;
}

/* Icon field adjustments - More specific selectors */
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

.login-form .field .p-icon-field .clean-input {
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
.social-btn i {
  font-size: 1.25rem !important;
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

.role-option:nth-child(3) {
  grid-column: unset;
  justify-self: unset;
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

/* Responsive adjustments */
@media (max-width: 480px) {
  .login-form {
    max-width: 100%;
  }
  
  .social-buttons {
    gap: 1rem;
  }
  
  .social-btn {
    width: 44px !important;
    height: 44px !important;
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
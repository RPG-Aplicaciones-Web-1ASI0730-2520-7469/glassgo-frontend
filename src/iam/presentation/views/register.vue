<script setup>
import {ref, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {useToast} from 'primevue/usetoast';

const { t } = useI18n();
const router = useRouter();
const toast = useToast();

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: ''
});

const isSubmitting = ref(false);

// Role options (Spanish labels)
const roleOptions = [
  { label: 'Negocio', value: 'admin' },
  { label: 'Distribuidor', value: 'distributor' },
  { label: 'Transporte', value: 'transport' }
];

const validateForm = () => {
  const errors = [];
  
  if (!formData.username.trim()) {
    errors.push('El nombre de usuario es requerido');
  }
  
  if (!formData.email.trim()) {
    errors.push('El correo electrónico es requerido');
  }
  
  if (!formData.password.trim()) {
    errors.push('La contraseña es requerida');
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.push('Las contraseñas no coinciden');
  }
  
  if (!formData.role) {
    errors.push('Por favor selecciona un tipo de usuario');
  }
  
  return errors;
};

const handleSubmit = async () => {
  const validationErrors = validateForm();
  
  if (validationErrors.length > 0) {
    validationErrors.forEach(error => {
      toast.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: error,
        life: 3000
      });
    });
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // Here you would call the registration API
    // For now, just show a success message
    toast.add({
      severity: 'success',
      summary: 'Registration Successful',
      detail: 'Your account has been created. Please sign in.',
      life: 5000
    });
    
    // Redirect to login
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
    
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Registration Failed',
      detail: error.message || 'Failed to create account',
      life: 5000
    });
  } finally {
    isSubmitting.value = false;
  }
};

const handleBackToLogin = () => {
  router.push('/auth/login');
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h2 class="login-title">{{ t('auth.sign-up') }}</h2>
        <!-- Role Selection (radio buttons como login) -->
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
              <label for="distributor" class="role-label">Distribuidor</label>
            </div>
            <div class="role-option">
              <input 
                type="radio"
                id="carrier"
                v-model="formData.role"
                name="role"
                value="carrier"
                class="role-radio"
              />
              <label for="carrier" class="role-label">Transportista</label>
            </div>
            <div class="role-option">
              <input 
                type="radio"
                id="business-owner"
                v-model="formData.role"
                name="role"
                value="business-owner"
                class="role-radio"
              />
              <label for="business-owner" class="role-label">Dueño de Negocio</label>
            </div>
          </div>
        </div>

        <!-- Email Field -->
        <div class="field">
          <InputText 
            id="email"
            name="email"
            v-model="formData.email"
            type="email"
            autocomplete="email"
            class="w-full clean-input"
            :placeholder="'Correo Electrónico'"
          />
        </div>

        <!-- Username Field -->
        <div class="field">
          <InputText 
            id="username"
            name="username"
            v-model="formData.username"
            type="text"
            autocomplete="username"
            class="w-full clean-input"
            :placeholder="'Usuario'"
          />
        </div>

        <!-- Password Field -->
        <div class="field" style="margin-top:1.5rem;">
          <InputText 
            id="password"
            name="password"
            v-model="formData.password"
            type="password"
            autocomplete="new-password"
            class="w-full clean-input"
            :placeholder="'Contraseña'"
          />
        </div>

        <!-- Confirm Password Field -->
        <div class="field">
          <InputText 
            id="confirmPassword"
            name="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            autocomplete="new-password"
            class="w-full clean-input"
            :placeholder="'Confirmar Contraseña'"
          />
        </div>

        <!-- Submit Button -->
        <Button 
          type="submit"
          :label="'Crear Cuenta'"
          class="w-full sign-in-btn"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        />

        <!-- Back to Login como enlace de texto -->
        <div class="no-account">
          <span>¿Ya tienes cuenta?</span>
          <a class="register-link" href="#" @click.prevent="handleBackToLogin">Iniciar Sesión</a>
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
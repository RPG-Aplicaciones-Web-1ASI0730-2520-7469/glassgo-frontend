<template>
  <profile-layout>
    <div class="profile-view improved-layout">
      <div class="profile-header">
        <h1>{{ $t('profile.title') }}</h1>
        <p class="subtitle">{{ $t('profile.subtitle') }}</p>
      </div>
      <div class="profile-grid">
        <div class="profile-card user-info-card">
          <div class="card-header">
            <h2>{{ $t('profile.userInfo.title') }}</h2>
            <button class="edit-btn" @click="toggleEdit">
              <i class="pi pi-pencil"></i>
              {{ isEditing ? $t('profile.cancel') : $t('profile.edit') }}
            </button>
          </div>
          <div class="card-content">
            <div class="profile-avatar">
              <div class="avatar-circle">
                <i class="pi pi-user"></i>
              </div>
              <button class="change-avatar-btn">
                <i class="pi pi-camera"></i>
                {{ $t('profile.changePhoto') }}
              </button>
            </div>
            <div class="profile-form">
              <div class="form-row">
                <div class="form-group">
                  <label>{{ $t('profile.userInfo.firstName') }}</label>
                  <input v-model="userProfile.firstName" :disabled="!isEditing" class="form-input" />
                </div>
                <div class="form-group">
                  <label>{{ $t('profile.userInfo.lastName') }}</label>
                  <input v-model="userProfile.lastName" :disabled="!isEditing" class="form-input" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>{{ $t('profile.userInfo.email') }}</label>
                  <input v-model="userProfile.email" type="email" :disabled="!isEditing" class="form-input" />
                </div>
                <div class="form-group">
                  <label>{{ $t('profile.userInfo.role') }}</label>
                  <input v-model="userProfile.role" :disabled="true" class="form-input" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>{{ $t('profile.userInfo.company') }}</label>
                  <input v-model="userProfile.company" :disabled="!isEditing" class="form-input" />
                </div>
                <div class="form-group">
                  <label>{{ $t('profile.userInfo.phone') }}</label>
                  <input v-model="userProfile.phone" :disabled="!isEditing" class="form-input" />
                </div>
              </div>
              <div class="form-actions" v-if="isEditing">
                <button class="btn-secondary" @click="cancelEdit">
                  {{ $t('profile.cancel') }}
                </button>
                <button class="btn-primary" @click="saveProfile">
                  {{ $t('profile.save') }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-card settings-card">
          <div class="card-header">
            <h2>{{ $t('profile.settings.title') }}</h2>
          </div>
          <div class="card-content">
            <div class="settings-list">
              <div class="setting-item">
                <div class="setting-info">
                  <i class="pi pi-bell"></i>
                  <div>
                    <h4>{{ $t('profile.settings.notifications') }}</h4>
                    <p>{{ $t('profile.settings.notificationsDesc') }}</p>
                  </div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="settings.notifications">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="setting-item">
                <div class="setting-info">
                  <i class="pi pi-shield"></i>
                  <div>
                    <h4>{{ $t('profile.settings.twoFactor') }}</h4>
                    <p>{{ $t('profile.settings.twoFactorDesc') }}</p>
                  </div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="settings.twoFactor">
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </profile-layout>
</template>
import ProfileLayout from '../components/profile-layout.vue';

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/iam/application/auth.store.js';

const authStore = useAuthStore();

const isEditing = ref(false);
const userProfile = ref({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  company: '',
  phone: ''
});

const settings = ref({
  notifications: true,
  twoFactor: false
});

const originalProfile = ref({});

const toggleEdit = () => {
  if (isEditing.value) {
    cancelEdit();
  } else {
    originalProfile.value = { ...userProfile.value };
    isEditing.value = true;
  }
};

const cancelEdit = () => {
  userProfile.value = { ...originalProfile.value };
  isEditing.value = false;
};

const saveProfile = () => {
  // Aquí guardarías los cambios en el backend
  console.log('Saving profile:', userProfile.value);
  isEditing.value = false;
  // TODO: Implementar llamada a la API para guardar
};

const loadProfile = () => {
  // Cargar datos del usuario autenticado directamente
  const user = authStore.user;
  if (user) {
    userProfile.value = {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      role: user.role || '',
      company: user.company || 'Distribuidora Central SAC',
      phone: user.phone || '+51 987654321'
    };
  }
};

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>

.profile-view.improved-layout {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 2rem 1rem 2rem;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: visible;
}

.profile-header {
  margin-bottom: 2rem;
  text-align: left;
}

.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: flex-start;
}

.user-info-card {
  min-width: 0;
}

.settings-card {
  min-width: 0;
}

@media (max-width: 900px) {
  .profile-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.profile-header {
  margin-bottom: 2rem;
}

.profile-header h1 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 600;
}

.subtitle {
  margin: 0;
  color: #6c757d;
  font-size: 1rem;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 600;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  background: transparent;
  color: #007bff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background: #007bff;
  color: white;
}

.card-content {
  padding: 1.5rem;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.avatar-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007bff, #6610f2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
}

.change-avatar-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #6c757d;
  background: transparent;
  color: #6c757d;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.change-avatar-btn:hover {
  background: #6c757d;
  color: white;
}

.profile-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-input:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.setting-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.setting-info i {
  font-size: 1.5rem;
  color: #007bff;
}

.setting-info h4 {
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
}

.setting-info p {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #007bff;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.language-select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .profile-view {
    padding: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
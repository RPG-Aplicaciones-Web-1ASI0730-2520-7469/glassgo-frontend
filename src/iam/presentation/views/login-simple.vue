<template>
  <div class="login-page-simple">
    <div class="login-container">
      <div class="login-form">
        <h1>Login Simple Test</h1>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>Email:</label>
            <input 
              v-model="formData.email"
              type="email"
              required
            />
          </div>
          
          <div class="form-group">
            <label>Password:</label>
            <input 
              v-model="formData.password"
              type="password"
              required
            />
          </div>
          
          <div class="form-group">
            <label>Role:</label>
            <select v-model="formData.role">
              <option value="admin">Admin</option>
              <option value="distributor">Distributor</option>
              <option value="transport">Transport</option>
            </select>
          </div>
          
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '../../application/auth.store.js';
import {LoginCredentials} from '../../domain/model/login-credentials.entity.js';

const router = useRouter();
const authStore = useAuthStore();

const formData = reactive({
  email: '',
  password: '',
  role: 'distributor'
});

const handleLogin = async () => {
  try {
    const credentials = new LoginCredentials(formData);
    await authStore.login(credentials);
    router.push('/app/home');
  } catch (error) {
    console.error('Login error:', error);
  }
};
</script>

<style scoped>
.login-page-simple {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
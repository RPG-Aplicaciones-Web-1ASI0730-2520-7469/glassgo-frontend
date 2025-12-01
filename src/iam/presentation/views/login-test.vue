<template>
  <div class="test-login">
    <h2>Login Test Component</h2>
    <p>Si puedes ver esto, el routing está funcionando.</p>
    <form @submit.prevent="testSubmit" class="simple-form">
      <div class="form-group">
        <label>Email:</label>
        <input v-model="email" type="email" placeholder="tu@email.com" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input v-model="password" type="password" placeholder="contraseña" />
      </div>
      <button type="submit">Test Login</button>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const message = ref('');

const testSubmit = () => {
  message.value = `Test: ${email.value} - ${password.value}`;
};
</script>

<style scoped>
.test-login {
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.simple-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: bold;
  color: #333;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #0056b3;
}

.message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #e7f3ff;
  border-radius: 4px;
  color: #333;
}
</style>
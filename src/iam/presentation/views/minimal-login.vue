<template>
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f0f0f0;">
    <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 400px; width: 100%;">
      <h1 style="text-align: center; margin-bottom: 2rem;">Minimal Login Test</h1>
      
      <div style="margin-bottom: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem;">Email:</label>
        <input 
          v-model="email"
          type="email"
          style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;"
          placeholder="Enter your email"
        />
      </div>
      
      <div style="margin-bottom: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem;">Password:</label>
        <input 
          v-model="password"
          type="password"
          style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;"
          placeholder="Enter your password"
        />
      </div>
      
      <button 
        @click="testLogin"
        style="width: 100%; padding: 0.75rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        Test Login
      </button>
      
      <div v-if="message" style="margin-top: 1rem; padding: 0.75rem; background: #e7f3ff; border-radius: 4px;">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const message = ref('');

const testLogin = () => {
  if (email.value && password.value) {
    message.value = `Login attempted with: ${email.value}`;
  } else {
    message.value = 'Please fill in both fields';
  }
};
</script>
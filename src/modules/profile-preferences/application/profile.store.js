import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ProfileApi } from '../infrastructure/profile-api.js';
import { UserProfile } from '../domain/model/user-profile.entity.js';
import { HistoryItem } from '../domain/model/history-item.entity.js';

export const useProfileStore = defineStore('profile', () => {
  const profile = ref(null);
  const historyItems = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const profileApi = new ProfileApi();

  // Cargar perfil del usuario
  const loadProfile = async (userId) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await profileApi.getProfile(userId);
      profile.value = new UserProfile(response.data);
      return profile.value;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Cargar historial del usuario
  const loadHistory = async (userId) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await profileApi.getHistory(userId);
      historyItems.value = response.data.map(item => new HistoryItem(item));
      return historyItems.value;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Actualizar perfil
  const updateProfile = async (profileData) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await profileApi.updateProfile(profileData);
      profile.value = new UserProfile(response.data);
      return profile.value;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Limpiar estado
  const clearProfile = () => {
    profile.value = null;
    historyItems.value = [];
    error.value = null;
  };

  return {
    // State
    profile,
    historyItems,
    isLoading,
    error,
    
    // Actions
    loadProfile,
    loadHistory,
    updateProfile,
    clearProfile
  };
});
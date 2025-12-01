import { httpClient } from '../../shared/infrastructure/http-client.js';

export class ProfileApi {
  constructor() {
    this.http = httpClient;
  }

  // Obtener perfil del usuario
  async getProfile(userId) {
    return this.http.get(`/users/${userId}`);
  }

  // Obtener historial del usuario
  async getHistory(userId) {
    // Get all history items and filter by userId on the client side
    // since json-server doesn't support nested routes by default
    const response = await this.http.get('/history');
    const allHistory = response.data || response;
    
    // Filter by userId if provided
    if (userId) {
      const userHistory = allHistory.filter(item => item.userId === userId);
      return { data: userHistory };
    }
    
    return { data: allHistory };
  }

  // Actualizar perfil del usuario
  async updateProfile(profileData) {
    return this.http.put(`/users/${profileData.id}`, profileData);
  }

  // Obtener estadísticas del dashboard
  async getDashboardStats(userId) {
    return this.http.get(`/users/${userId}/stats`);
  }

  // Obtener configuraciones del usuario
  async getUserSettings(userId) {
    return this.http.get(`/users/${userId}/settings`);
  }

  // Actualizar configuraciones del usuario
  async updateUserSettings(userId, settings) {
    return this.http.put(`/users/${userId}/settings`, settings);
  }
}
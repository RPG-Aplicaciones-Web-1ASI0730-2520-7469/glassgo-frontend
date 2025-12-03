// API utilitario para fetch directo desde el store
import { httpClient } from '@/shared/infrastructure/http-client.js';

// API utilitario para obtener productos usando Axios
export async function fetchProducts() {
  try {
    const response = await httpClient.get('/products');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products: ' + error.message);
  }
}
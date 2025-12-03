import { defineStore } from 'pinia';
import { fetchProducts } from '../infrastructure/products-api';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),
  actions: {
    async loadProducts() {
      this.loading = true;
      this.error = null;
      try {
        this.products = await fetchProducts();
      } catch (err) {
        this.error = err.message || 'Error loading products';
      } finally {
        this.loading = false;
      }
    },
  },
});

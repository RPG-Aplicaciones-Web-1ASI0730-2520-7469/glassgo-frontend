import { httpClient } from '@shared/infrastructure/http-client.js';

/**
 * @typedef {Object} OrderResource
 * @property {number} userId - User who created the order
 * @property {Array<OrderItemResource>} items - Array of order item resources
 * @property {Object} delivery - Delivery information
 * @property {Object} totals - Order totals summary
 * @property {string} status - Order status
 * @property {string} createdAt - Creation timestamp
 */

/**
 * @typedef {Object} OrderItemResource
 * @property {number} productId - Product identifier
 * @property {string} productName - Product name
 * @property {number} quantity - Quantity ordered
 * @property {number} unitPrice - Price per unit
 * @property {number} subtotal - Subtotal for the item
 */

/**
 * @typedef {Object} ProductResource
 * @property {number} id - Product ID
 * @property {string} name - Product name
 * @property {string} category - Product category
 * @property {string} description - Product description
 * @property {number} price - Unit price
 * @property {string} unit - Unit of measurement
 * @property {number} stock - Available stock
 * @property {number} [minQuantity=1] - Minimum order quantity
 * @property {number} [maxQuantity=100] - Maximum order quantity
 * @property {Object} [specifications={}] - Product specifications
 * @property {string} [supplier=''] - Supplier name
 * @property {string} [imageUrl=''] - Product image URL
 * @property {boolean} [isActive=true] - Whether product is active
 */

/**
 * Service Planning API - Infrastructure Layer
 * Provides HTTP client functions for service planning operations.
 * Handles communication with the backend API for products and orders management.
 */
export const ServicePlanningApi = {
    // Products API
    /**
     * Fetch products resources from API
     * Infrastructure layer function for retrieving product resources from the backend.
     *
     * @returns {Promise<Array<ProductResource>>} List of product resources
     * @throws {Error} When API request fails
     */
    async fetchProducts() {
        try {
            const response = await httpClient.get('/products');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch products: ' + error.message);
        }
    },

    // Orders API
    /**
     * Create a new order resource
     * @param {OrderResource} orderResource - Order resource data
     * @returns {Promise} HTTP response promise
     */
    createOrder(orderResource) {
        return httpClient.post('/orders', orderResource);
    },

    /**
     * Get user orders resources
     * @param {number} userId - User identifier
     * @returns {Promise} HTTP response promise with orders resources
     */
    getUserOrders(userId) {
        return httpClient.get(`/orders?userId=${userId}`);
    },

    /**
     * Get order resource by ID
     * @param {number} orderId - Order identifier
     * @returns {Promise} HTTP response promise with order resource
     */
    getOrder(orderId) {
        return httpClient.get(`/orders/${orderId}`);
    },

    /**
     * Update order status
     * @param {number} orderId - Order identifier
     * @param {string} status - New order status
     * @returns {Promise} HTTP response promise
     */
    updateOrderStatus(orderId, status) {
        return httpClient.patch(`/orders/${orderId}`, { status });
    },

    /**
     * Cancel order
     * @param {number} orderId - Order identifier
     * @returns {Promise} HTTP response promise
     */
    cancelOrder(orderId) {
        return ServicePlanningApi.updateOrderStatus(orderId, 'cancelled');
    }
};

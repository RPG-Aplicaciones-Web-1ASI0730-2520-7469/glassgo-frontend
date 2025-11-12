import { httpClient } from '@shared/infrastructure/http-client.js';

/**
 * Orders API functions
 * Handles order-related API operations
 */

export const OrdersApi = {
    /**
     * Create a new order
     * @param {Object} orderData
     * @returns {Promise}
     */
    createOrder(orderData) {
        return httpClient.post('/orders', orderData);
    },

    /**
     * Get user orders
     * @param {number} userId
     * @returns {Promise}
     */
    getUserOrders(userId) {
        return httpClient.get(`/orders?userId=${userId}`);
    },

    /**
     * Get order by ID
     * @param {number} orderId
     * @returns {Promise}
     */
    getOrder(orderId) {
        return httpClient.get(`/orders/${orderId}`);
    },

    /**
     * Update order status
     * @param {number} orderId
     * @param {string} status
     * @returns {Promise}
     */
    updateOrderStatus(orderId, status) {
        return httpClient.patch(`/orders/${orderId}`, { status });
    },

    /**
     * Cancel order
     * @param {number} orderId
     * @returns {Promise}
     */
    cancelOrder(orderId) {
        return OrdersApi.updateOrderStatus(orderId, 'cancelled');
    }
}
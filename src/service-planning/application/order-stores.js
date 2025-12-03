import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ServicePlanningApi } from '../infrastructure/order-api.js';
import { Product } from '../domain/model/product.entity.js';
import { Order } from '../domain/model/order.entity.js';
import { OrderItem } from '../domain/model/order-item.entity.js';

/**
 * Products Store - Application Layer
 * Manages product data state using Pinia options store.
 * Handles loading and caching of product information.
 */
export const useProductsStore = defineStore('products', {
  state: () => ({
    /**
     * List of products
     * @type {Array}
     */
    products: [],

    /**
     * Loading state for product operations
     * @type {boolean}
     */
    loading: false,

    /**
     * Error message from failed operations
     * @type {string|null}
     */
    error: null,
  }),
  actions: {
    /**
     * Load products from API
     * @returns {Promise<void>}
     */
    async loadProducts() {
      this.loading = true;
      this.error = null;
      try {
        this.products = await ServicePlanningApi.fetchProducts();
      } catch (err) {
        this.error = err.message || 'Error loading products';
      } finally {
        this.loading = false;
      }
    },
  },
});

/**
 * Orders Store - Application Layer
 * Manages order creation and product selection state using Pinia composable store.
 * Handles business logic for adding/removing items, calculating totals, and submitting orders.
 *
 * @returns {Object} Store instance with state, getters, and actions
 */
export const useOrdersStore = defineStore('orders', () => {
    // State
    /**
     * Current order being created
     * @type {import('vue').Ref<Order>}
     */
    const currentOrder = ref(new Order({ userId: null }));

    /**
     * List of available products for ordering
     * @type {import('vue').Ref<Array<Product>>}
     */
    const availableProducts = ref([]);

    /**
     * Loading state for async operations
     * @type {import('vue').Ref<boolean>}
     */
    const isLoading = ref(false);

    /**
     * Error message from failed operations
     * @type {import('vue').Ref<string|null>}
     */
    const error = ref(null);

    // Getters
    /**
     * Computed list of items in current order
     * @type {import('vue').ComputedRef<Array<OrderItem>>}
     */
    const orderItems = computed(() => currentOrder.value.items);

    /**
     * Computed order totals summary
     * @type {import('vue').ComputedRef<Object>}
     */
    const orderTotals = computed(() => currentOrder.value.getTotalsSummary());

    /**
     * Computed validation status for order submission
     * @type {import('vue').ComputedRef<boolean>}
     */
    const canSubmitOrder = computed(() => currentOrder.value.isValid());

    // Actions
    /**
     * Load available products from API
     * @returns {Promise<Array<Product>>} List of available products
     * @throws {Error} When API call fails
     */
    const loadProducts = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const products = await ServicePlanningApi.fetchProducts();
            availableProducts.value = products
                .filter(p => p.isActive)
                .map(p => new Product(p));
            return availableProducts.value;
        } catch (err) {
            error.value = err.message;
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Search products by query string
     * @param {string} query - Search term
     * @returns {Array<Product>} Filtered products
     */
    const searchProducts = async (query) => {
        if (!query.trim()) {
            return availableProducts.value;
        }

        const searchTerm = query.toLowerCase();
        return availableProducts.value.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    };

    /**
     * Add product to current order
     * @param {Product} product - Product to add
     * @param {number} [quantity=1] - Quantity to add
     * @throws {Error} When quantity is invalid
     */
    const addProductToOrder = (product, quantity = 1) => {
        if (!product.isValidQuantity(quantity)) {
            throw new Error(`Invalid quantity. Min: ${product.minQuantity}, Max: ${product.maxQuantity}`);
        }

        const existingItem = currentOrder.value.items.find(item => item.product.id === product.id);

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (!product.isValidQuantity(newQuantity)) {
                throw new Error(`Cannot add more. Maximum quantity is ${product.maxQuantity}`);
            }
            existingItem.quantity = newQuantity;
        } else {
            const orderItem = new OrderItem({
                id: Date.now(),
                product,
                quantity,
                unitPrice: product.price
            });
            currentOrder.value.addItem(orderItem);
        }
    };

    /**
     * Remove item from current order
     * @param {number} itemId - ID of item to remove
     */
    const removeItemFromOrder = (itemId) => {
        currentOrder.value.removeItem(itemId);
    };

    /**
     * Update quantity of order item
     * @param {number} itemId - ID of item to update
     * @param {number} quantity - New quantity
     * @throws {Error} When quantity is invalid
     */
    const updateItemQuantity = (itemId, quantity) => {
        const item = currentOrder.value.items.find(i => i.id === itemId);
        if (item) {
            if (!item.updateQuantity(quantity)) {
                throw new Error(`Invalid quantity. Min: ${item.product.minQuantity}, Max: ${item.product.maxQuantity}`);
            }
        }
    };

    /**
     * Increment quantity of order item by 1
     * @param {number} itemId - ID of item to increment
     * @throws {Error} When maximum quantity reached
     */
    const incrementItemQuantity = (itemId) => {
        const item = currentOrder.value.items.find(i => i.id === itemId);
        if (item && !item.incrementQuantity()) {
            throw new Error(`Maximum quantity is ${item.product.maxQuantity}`);
        }
    };

    /**
     * Decrement quantity of order item by 1
     * @param {number} itemId - ID of item to decrement
     * @throws {Error} When minimum quantity reached
     */
    const decrementItemQuantity = (itemId) => {
        const item = currentOrder.value.items.find(i => i.id === itemId);
        if (item && !item.decrementQuantity()) {
            throw new Error(`Minimum quantity is ${item.product.minQuantity}`);
        }
    };

    /**
     * Toggle expanded state of order item (UI)
     * @param {number} itemId - ID of item to toggle
     */
    const toggleItemExpanded = (itemId) => {
        const item = currentOrder.value.items.find(i => i.id === itemId);
        if (item) {
            item.expanded = !item.expanded;
        }
    };

    /**
     * Update delivery information for current order
     * @param {Object} deliveryInfo - Delivery details
     */
    const updateDeliveryInfo = (deliveryInfo) => {
        currentOrder.value.delivery = { ...deliveryInfo };
    };

    /**
     * Submit current order to API
     * @returns {Promise<Object>} API response data
     * @throws {Error} When order is invalid or API fails
     */
    const submitOrder = async () => {
        if (!currentOrder.value.isValid()) {
            throw new Error('Order is not valid. Please check all required fields.');
        }

        isLoading.value = true;
        error.value = null;

        try {
            const orderData = {
                userId: currentOrder.value.userId,
                items: currentOrder.value.items.map(item => ({
                    productId: item.product.id,
                    productName: item.product.name,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    subtotal: item.getSubtotal()
                })),
                delivery: currentOrder.value.delivery,
                totals: currentOrder.value.getTotalsSummary(),
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            const response = await ServicePlanningApi.createOrder(orderData);

            // Reset current order after successful submission
            resetCurrentOrder();

            return response.data;
        } catch (err) {
            error.value = err.message;
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Reset current order to initial state
     */
    const resetCurrentOrder = () => {
        currentOrder.value = new Order({ userId: currentOrder.value.userId });
    };

    /**
     * Initialize order with user ID
     * @param {number} userId - User ID for the order
     */
    const initializeOrder = (userId) => {
        currentOrder.value = new Order({ userId });
    };

    /**
     * Clear current error state
     */
    const clearError = () => {
        error.value = null;
    };

    return {
        // State
        currentOrder,
        availableProducts,
        isLoading,
        error,

        // Getters
        orderItems,
        orderTotals,
        canSubmitOrder,

        // Actions
        loadProducts,
        searchProducts,
        addProductToOrder,
        removeItemFromOrder,
        updateItemQuantity,
        incrementItemQuantity,
        decrementItemQuantity,
        toggleItemExpanded,
        updateDeliveryInfo,
        submitOrder,
        resetCurrentOrder,
        initializeOrder,
        clearError
    };
});

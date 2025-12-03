import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchProducts } from '../infrastructure/products-api.js';
import { OrdersApi } from '../infrastructure/orders-api.js';
import { Product } from '../domain/model/product.entity.js';
import { Order } from '../domain/model/order.entity.js';
import { OrderItem } from '../domain/model/order-item.entity.js';

export const useOrdersStore = defineStore('orders', () => {
    // State
    const currentOrder = ref(new Order({ userId: null }));
    const availableProducts = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    // APIs
    // ...existing code...
    const ordersApi = OrdersApi;

    // Getters
    const orderItems = computed(() => currentOrder.value.items);
    const orderTotals = computed(() => currentOrder.value.getTotalsSummary());
    const canSubmitOrder = computed(() => currentOrder.value.isValid());

    // Actions
    const loadProducts = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const products = await fetchProducts();
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

    const removeItemFromOrder = (itemId) => {
        currentOrder.value.removeItem(itemId);
    };

    const updateItemQuantity = (itemId, quantity) => {
        const item = currentOrder.value.items.find(i => i.id === itemId);
        if (item) {
            if (!item.updateQuantity(quantity)) {
                throw new Error(`Invalid quantity. Min: ${item.product.minQuantity}, Max: ${item.product.maxQuantity}`);
            }
        }
    };

    const incrementItemQuantity = (itemId) => {
        const item = currentOrder.value.items.find(i => i.id === itemId);
        if (item && !item.incrementQuantity()) {
            throw new Error(`Maximum quantity is ${item.product.maxQuantity}`);
        }
    };

    const decrementItemQuantity = (itemId) => {
        const item = currentOrder.value.items.find(i => i.id === itemId);
        if (item && !item.decrementQuantity()) {
            throw new Error(`Minimum quantity is ${item.product.minQuantity}`);
        }
    };

    const toggleItemExpanded = (itemId) => {
        const item = currentOrder.value.items.find(i => i.id === itemId);
        if (item) {
            item.expanded = !item.expanded;
        }
    };

    const updateDeliveryInfo = (deliveryInfo) => {
        currentOrder.value.delivery = { ...deliveryInfo };
    };

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

            const response = await ordersApi.createOrder(orderData);
            
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

    const resetCurrentOrder = () => {
        currentOrder.value = new Order({ userId: currentOrder.value.userId });
    };

    const initializeOrder = (userId) => {
        currentOrder.value = new Order({ userId });
    };

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
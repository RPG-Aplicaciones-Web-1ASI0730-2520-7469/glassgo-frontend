/**
 * Order Aggregate Root Entity
 * Represents a complete order as the root of the Order aggregate in Domain-Driven Design.
 * Encapsulates order items, delivery information, and business rules for order management.
 */
export class Order {
    /**
     * Creates an instance of Order
     * @param {Object} params - Order parameters
     * @param {number} params.id - Order ID
     * @param {number} params.userId - User who created the order
     * @param {Array} params.items - Array of OrderItem objects
     * @param {Object} params.delivery - Delivery information
     * @param {string} params.status - Order status
     * @param {Date} params.createdAt - Creation date
     */
    constructor({
        id = null,
        userId,
        items = [],
        delivery = {},
        status = 'draft',
        createdAt = new Date()
    }) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.delivery = delivery;
        this.status = status;
        this.createdAt = createdAt;
    }

    /**
     * Add item to order
     * @param {OrderItem} item
     */
    addItem(item) {
        const existingItem = this.items.find(i => i.product.id === item.product.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
    }

    /**
     * Remove item from order
     * @param {number} itemId
     */
    removeItem(itemId) {
        const index = this.items.findIndex(i => i.id === itemId);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    /**
     * Calculate subtotal (before taxes)
     * @returns {number}
     */
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
    }

    /**
     * Calculate IGV (18%)
     * @returns {number}
     */
    getIGV() {
        return this.getSubtotal() * 0.18;
    }

    /**
     * Calculate total (subtotal + IGV)
     * @returns {number}
     */
    getTotal() {
        return this.getSubtotal() + this.getIGV();
    }

    /**
     * Check if order is valid for submission
     * @returns {boolean}
     */
    isValid() {
        return this.items.length > 0 && 
               this.delivery.address && 
               this.delivery.date;
    }

    /**
     * Get order totals summary
     * @returns {Object}
     */
    getTotalsSummary() {
        const subtotal = this.getSubtotal();
        const igv = this.getIGV();
        const total = this.getTotal();

        return {
            subtotal,
            igv,
            total,
            itemCount: this.items.length
        };
    }
}
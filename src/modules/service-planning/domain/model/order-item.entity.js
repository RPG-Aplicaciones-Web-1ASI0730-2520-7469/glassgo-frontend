/**
 * Order Item Entity
 * Represents an item within an order
 */
export class OrderItem {
    /**
     * Creates an instance of OrderItem
     * @param {Object} params - Order item parameters
     * @param {number} params.id - Item ID
     * @param {Object} params.product - Product object
     * @param {number} params.quantity - Quantity ordered
     * @param {number} params.unitPrice - Price per unit at time of order
     */
    constructor({
        id,
        product,
        quantity,
        unitPrice = null
    }) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.unitPrice = unitPrice || product.price;
        this.expanded = false; // UI state
    }

    /**
     * Calculate subtotal for this item
     * @returns {number}
     */
    getSubtotal() {
        return this.quantity * this.unitPrice;
    }

    /**
     * Update quantity if valid
     * @param {number} newQuantity
     * @returns {boolean} Success status
     */
    updateQuantity(newQuantity) {
        if (this.product.isValidQuantity(newQuantity)) {
            this.quantity = newQuantity;
            return true;
        }
        return false;
    }

    /**
     * Increment quantity
     * @returns {boolean} Success status
     */
    incrementQuantity() {
        return this.updateQuantity(this.quantity + 1);
    }

    /**
     * Decrement quantity
     * @returns {boolean} Success status
     */
    decrementQuantity() {
        return this.updateQuantity(this.quantity - 1);
    }
}
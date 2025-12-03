/**
 * Product Entity
 * Represents a product available for ordering
 */
export class Product {
    /**
     * Creates an instance of Product
     * @param {Object} params - Product parameters
     * @param {number} params.id - Product ID
     * @param {string} params.name - Product name
     * @param {string} params.category - Product category
     * @param {string} params.description - Product description
     * @param {number} params.price - Unit price
     * @param {string} params.unit - Unit of measurement
     * @param {number} params.stock - Available stock
     * @param {number} params.minQuantity - Minimum order quantity
     * @param {number} params.maxQuantity - Maximum order quantity
     * @param {Object} params.specifications - Product specifications
     * @param {string} params.supplier - Supplier name
     * @param {string} params.imageUrl - Product image URL
     * @param {boolean} params.isActive - Whether product is active
     */
    constructor({
        id,
        name,
        category,
        description,
        price,
        unit,
        stock,
        minQuantity = 1,
        maxQuantity = 100,
        specifications = {},
        supplier = '',
        imageUrl = '',
        isActive = true
    }) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.unit = unit;
        this.stock = stock;
        this.minQuantity = minQuantity;
        this.maxQuantity = maxQuantity;
        this.specifications = specifications;
        this.supplier = supplier;
        this.imageUrl = imageUrl;
        this.isActive = isActive;
    }

    /**
     * Check if product is available for ordering
     * @returns {boolean}
     */
    isAvailable() {
        return this.isActive && this.stock > 0;
    }

    /**
     * Check if a quantity is valid for this product
     * @param {number} quantity
     * @returns {boolean}
     */
    isValidQuantity(quantity) {
        return quantity >= this.minQuantity && 
               quantity <= this.maxQuantity && 
               quantity <= this.stock;
    }

    /**
     * Calculate subtotal for a given quantity
     * @param {number} quantity
     * @returns {number}
     */
    calculateSubtotal(quantity) {
        return this.price * quantity;
    }
}
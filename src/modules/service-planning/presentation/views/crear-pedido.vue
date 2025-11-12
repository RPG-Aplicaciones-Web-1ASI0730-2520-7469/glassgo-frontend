<template>
  <div class="crear-pedido-view">
    <div class="page-header">
      <h1>{{ $t('orders.create.title') }}</h1>
      <p class="subtitle">{{ $t('orders.create.subtitle') }}</p>
    </div>

    <div class="crear-pedido-content">
      <!-- Búsqueda de productos -->
      <div class="search-section">
        <div class="search-bar">
          <div class="search-input-container">
            <i class="pi pi-search search-icon"></i>
            <input 
              v-model="searchQuery"
              type="text"
              :placeholder="$t('orders.create.searchPlaceholder')"
              class="search-input"
              @input="handleSearch"
              @blur="hideSearchResults"
              @focus="handleSearchFocus"
            />
          </div>
          <button class="add-product-btn" @click="showAllProducts">
            <i class="pi pi-plus"></i>
            {{ $t('orders.create.addNewProduct') }}
          </button>
        </div>

        <!-- Resultados de búsqueda -->
        <div v-if="showSearchResults && searchResults.length > 0" class="search-results">
          <div 
            v-for="product in searchResults" 
            :key="product.id"
            class="product-item"
            @click="addProductToOrder(product)"
          >
            <div class="product-info">
              <img 
                :src="product.imageUrl || '/placeholder-product.jpg'" 
                :alt="product.name"
                class="product-image"
              />
              <div class="product-details">
                <h4>{{ product.name }}</h4>
                <p class="product-category">{{ product.category }}</p>
                <p class="product-price">S/ {{ product.price.toFixed(2) }} / {{ product.unit }}</p>
              </div>
            </div>
            <button class="add-btn" @click.stop="addProductToOrder(product)">
              <i class="pi pi-plus"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="order-layout">
        <!-- Información del pedido -->
        <div class="order-info-section">
          <div class="section-card">
            <div class="section-header">
              <h2>{{ $t('orders.create.orderInfo') }}</h2>
            </div>

            <div class="order-items">
              <div 
                v-for="item in orderItems" 
                :key="item.id"
                class="order-item"
              >
                <div class="item-row">
                  <div class="item-info">
                    <h4>{{ item.product.name }}</h4>
                    <p class="item-category">{{ item.product.category }}</p>
                  </div>
                  <div class="item-controls">
                    <div class="quantity-controls">
                      <button 
                        @click="decrementQuantity(item.id)"
                        class="quantity-btn"
                        :disabled="item.quantity <= item.product.minQuantity"
                      >
                        <i class="pi pi-minus"></i>
                      </button>
                      <span class="quantity">{{ item.quantity }}</span>
                      <button 
                        @click="incrementQuantity(item.id)"
                        class="quantity-btn"
                        :disabled="item.quantity >= item.product.maxQuantity"
                      >
                        <i class="pi pi-plus"></i>
                      </button>
                    </div>
                    <span class="item-price">S/ {{ item.getSubtotal().toFixed(2) }}</span>
                    <button 
                      @click="removeItem(item.id)"
                      class="remove-btn"
                    >
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>
                </div>
                
                <!-- Detalles expandibles del producto -->
                <div v-if="item.expanded" class="item-details">
                  <p><strong>{{ $t('orders.create.description') }}:</strong> {{ item.product.description }}</p>
                  <p><strong>{{ $t('orders.create.unitPrice') }}:</strong> S/ {{ item.product.price.toFixed(2) }} / {{ item.product.unit }}</p>
                  <p><strong>{{ $t('orders.create.supplier') }}:</strong> {{ item.product.supplier }}</p>
                </div>
                
                <button 
                  @click="toggleItemDetails(item.id)"
                  class="toggle-details-btn"
                >
                  <i :class="item.expanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"></i>
                  {{ item.expanded ? $t('orders.create.hideDetails') : $t('orders.create.showDetails') }}
                </button>
              </div>

              <!-- Estado vacío -->
              <div v-if="orderItems.length === 0" class="empty-order">
                <i class="pi pi-shopping-cart empty-icon"></i>
                <p>{{ $t('orders.create.emptyOrder') }}</p>
                <p class="empty-subtitle">{{ $t('orders.create.emptyOrderSubtitle') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumen del pedido e información de entrega -->
        <div class="order-summary-section">
          <!-- Resumen del pedido -->
          <div class="section-card">
            <div class="section-header">
              <h3>{{ $t('orders.create.orderSummary') }}</h3>
            </div>

            <div class="summary-content">
              <div class="summary-line">
                <span>{{ $t('orders.create.subtotal') }}</span>
                <span>S/ {{ orderTotals.subtotal.toFixed(2) }}</span>
              </div>
              <div class="summary-line">
                <span>{{ $t('orders.create.igv') }} (18%)</span>
                <span>S/ {{ orderTotals.igv.toFixed(2) }}</span>
              </div>
              <div class="summary-line total-line">
                <span><strong>{{ $t('orders.create.total') }}</strong></span>
                <span><strong>S/ {{ orderTotals.total.toFixed(2) }}</strong></span>
              </div>
              <div class="summary-line">
                <span>{{ $t('orders.create.itemCount') }}</span>
                <span>{{ orderTotals.itemCount }} {{ $t('orders.create.items') }}</span>
              </div>
            </div>
          </div>

          <!-- Información de entrega -->
          <div class="section-card delivery-card">
            <div class="section-header">
              <h3>{{ $t('orders.create.deliveryInfo') }}</h3>
            </div>

            <div class="delivery-form">
              <div class="form-group">
                <label>{{ $t('orders.create.deliveryDate') }}</label>
                <input 
                  v-model="deliveryInfo.date"
                  type="date"
                  class="form-input"
                  :min="minDeliveryDate"
                />
              </div>

              <div class="form-group">
                <label>{{ $t('orders.create.deliveryTime') }}</label>
                <select v-model="deliveryInfo.time" class="form-select">
                  <option value="">{{ $t('orders.create.selectTime') }}</option>
                  <option value="08:00-12:00">08:00 - 12:00</option>
                  <option value="12:00-16:00">12:00 - 16:00</option>
                  <option value="16:00-20:00">16:00 - 20:00</option>
                </select>
              </div>

              <div class="form-group">
                <label>{{ $t('orders.create.deliveryAddress') }}</label>
                <textarea 
                  v-model="deliveryInfo.address"
                  class="form-textarea"
                  :placeholder="$t('orders.create.addressPlaceholder')"
                  rows="3"
                ></textarea>
              </div>

              <div class="form-group">
                <label>{{ $t('orders.create.specialInstructions') }}</label>
                <textarea 
                  v-model="deliveryInfo.instructions"
                  class="form-textarea"
                  :placeholder="$t('orders.create.instructionsPlaceholder')"
                  rows="2"
                ></textarea>
              </div>
            </div>

            <div class="order-actions">
              <button 
                @click="resetOrder"
                class="btn-secondary"
                :disabled="isLoading"
              >
                {{ $t('orders.create.cancel') }}
              </button>
              <button 
                @click="submitOrder"
                class="btn-primary"
                :disabled="!canSubmitOrder || isLoading"
              >
                <i v-if="isLoading" class="pi pi-spin pi-spinner"></i>
                {{ isLoading ? $t('orders.create.submitting') : $t('orders.create.submitOrder') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de éxito -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeSuccessModal">
      <div class="modal-content" @click.stop>
        <div class="success-icon">
          <i class="pi pi-check-circle"></i>
        </div>
        <h3>{{ $t('orders.create.orderSuccess') }}</h3>
        <p>{{ $t('orders.create.orderSuccessMessage') }}</p>
        <button @click="closeSuccessModal" class="btn-primary">
          {{ $t('orders.create.continue') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useOrdersStore } from '../../application/orders.store.js';
import { useUserStore } from '@/stores/user.store.js';
// ...existing code...

const router = useRouter();
const ordersStore = useOrdersStore();
const userStore = useUserStore();
// ...existing code...

// Reactive state
const searchQuery = ref('');
const searchResults = ref([]);
const showSearchResults = ref(false);
const showAddProductModal = ref(false);
const showSuccessModal = ref(false);
const deliveryInfo = ref({
  date: '',
  time: '',
  address: '',
  instructions: ''
});

// Computed properties
const orderItems = computed(() => ordersStore.orderItems);
const orderTotals = computed(() => ordersStore.orderTotals);
const canSubmitOrder = computed(() => {
  return orderItems.value.length > 0 && 
         deliveryInfo.value.date && 
         deliveryInfo.value.address;
});
const isLoading = computed(() => ordersStore.isLoading);

const minDeliveryDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
});

// Methods
const handleSearch = async () => {
  if (searchQuery.value.trim().length < 2) {
    showSearchResults.value = false;
    return;
  }

  try {
    searchResults.value = await ordersStore.searchProducts(searchQuery.value);
    showSearchResults.value = searchResults.value.length > 0;
  } catch (error) {
    console.error('Error searching products:', error);
    showSearchResults.value = false;
  }
};

const showAllProducts = async () => {
  try {
    // Mostrar todos los productos disponibles
    searchResults.value = ordersStore.availableProducts;
    searchQuery.value = '';
    showSearchResults.value = searchResults.value.length > 0;
  } catch (error) {
    console.error('Error loading all products:', error);
  }
};

const handleSearchFocus = () => {
  // Si hay texto en la búsqueda, mostrar resultados
  if (searchQuery.value.trim().length >= 2) {
    handleSearch();
  }
};

const addProductToOrder = (product) => {
  try {
    console.log('Adding product to order:', product); // Debug
    ordersStore.addProductToOrder(product, 1);
    showSearchResults.value = false;
    searchQuery.value = '';
    
    // Mostrar mensaje de éxito temporal
    console.log('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error);
    alert(error.message);
  }
};

const incrementQuantity = (itemId) => {
  try {
    ordersStore.incrementItemQuantity(itemId);
  } catch (error) {
    alert(error.message);
  }
};

const decrementQuantity = (itemId) => {
  try {
    ordersStore.decrementItemQuantity(itemId);
  } catch (error) {
    alert(error.message);
  }
};

const removeItem = (itemId) => {
  ordersStore.removeItemFromOrder(itemId);
};

const toggleItemDetails = (itemId) => {
  ordersStore.toggleItemExpanded(itemId);
};

const resetOrder = () => {
  if (confirm('¿Estás seguro de que deseas cancelar este pedido?')) {
    ordersStore.resetCurrentOrder();
    deliveryInfo.value = {
      date: '',
      time: '',
      address: '',
      instructions: ''
    };
  }
};

const submitOrder = async () => {
  try {
    ordersStore.updateDeliveryInfo(deliveryInfo.value);
    await ordersStore.submitOrder();
    showSuccessModal.value = true;
  } catch (error) {
    alert(error.message);
  }
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  // ...existing code...
};

// Lifecycle
onMounted(async () => {
  // Initialize order with current user
  if (userStore.user) {
    ordersStore.initializeOrder(userStore.user.id);
  } else {
    await userStore.fetchUser();
    if (userStore.user) {
      ordersStore.initializeOrder(userStore.user.id);
    }
  }

  // Load available products
  try {
    await ordersStore.loadProducts();
  } catch (error) {
    console.error('Error loading products:', error);
  }
});

// Watch for clicks outside search results
watch(() => searchQuery.value, (newValue) => {
  if (!newValue) {
    // Delay hiding results to allow clicks on products
    setTimeout(() => {
      showSearchResults.value = false;
    }, 200);
  }
});

// Hide search results when clicking outside
const hideSearchResults = () => {
  setTimeout(() => {
    showSearchResults.value = false;
  }, 200);
};
</script>

<style scoped>
.crear-pedido-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 600;
}

.subtitle {
  margin: 0;
  color: #6c757d;
  font-size: 1rem;
}

.crear-pedido-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Search Section */
.search-section {
  position: relative;
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input-container {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #2c3e50;
}

.search-input::placeholder {
  color: #6c757d;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  color: #2c3e50;
}

.add-product-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.add-product-btn:hover {
  background: #0056b3;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.product-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.product-item:hover {
  background: #f8f9fa;
}

.product-item:last-child {
  border-bottom: none;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-image {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

.product-details h4 {
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.product-category {
  margin: 0 0 0.25rem 0;
  color: #6c757d;
  font-size: 0.875rem;
}

.product-price {
  margin: 0;
  color: #007bff;
  font-weight: 600;
  font-size: 0.875rem;
}

.add-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.add-btn:hover {
  background: #0056b3;
}

/* Order Layout */
.order-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.order-summary-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

.delivery-card {
  margin-top: 1rem;
}

.section-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header h2,
.section-header h3 {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.total-badge {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Order Items */
.order-items {
  padding: 1rem;
}

.order-item {
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.order-item:last-child {
  margin-bottom: 0;
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.item-info h4 {
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.item-category {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
  font-weight: 500;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 0.25rem;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #007bff;
  background: white;
  color: #007bff;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-weight: 600;
}

.quantity-btn:hover:not(:disabled) {
  background: #007bff;
  color: white;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #dee2e6;
  color: #6c757d;
}

.quantity {
  min-width: 40px;
  text-align: center;
  font-weight: 700;
  color: #2c3e50;
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.item-price {
  font-weight: 700;
  color: #28a745;
  min-width: 80px;
  text-align: right;
  font-size: 1.1rem;
}

.remove-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #dc3545;
  background: white;
  color: #dc3545;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-weight: 600;
}

.remove-btn:hover {
  background: #dc3545;
  color: white;
  transform: scale(1.05);
}

.item-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
  font-size: 0.875rem;
  color: #6c757d;
}

.item-details p {
  margin: 0.5rem 0;
}

.toggle-details-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: transparent;
  color: #007bff;
  cursor: pointer;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.toggle-details-btn:hover {
  color: #0056b3;
}

.empty-order {
  text-align: center;
  padding: 3rem 1rem;
  color: #6c757d;
  background: #f8f9fa;
  border-radius: 8px;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
  color: #007bff;
}

.empty-order p {
  margin: 0.5rem 0;
  color: #495057;
  font-weight: 500;
}

.empty-subtitle {
  font-size: 0.875rem;
  color: #6c757d;
}

/* Order Summary */
.summary-content {
  padding: 1.5rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
  color: #2c3e50;
  font-weight: 500;
}

.summary-line:last-child {
  border-bottom: none;
}

.summary-line span:first-child {
  color: #495057;
}

.summary-line span:last-child {
  color: #007bff;
  font-weight: 600;
}

.total-line {
  border-top: 2px solid #e9ecef;
  margin-top: 0.5rem;
  padding-top: 1rem;
  font-size: 1.1rem;
}

.total-line span:first-child {
  color: #2c3e50;
  font-weight: 700;
}

.total-line span:last-child {
  color: #28a745;
  font-weight: 700;
}

/* Delivery Form */
.delivery-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

/* Order Actions */
.order-actions {
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 1rem;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #0056b3, #004085);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #6c757d, #545b62);
  color: white;
  box-shadow: 0 2px 4px rgba(108, 117, 125, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  background: linear-gradient(135deg, #545b62, #383d41);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(108, 117, 125, 0.4);
}

.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.success-icon {
  font-size: 3rem;
  color: #28a745;
  margin-bottom: 1rem;
}

.modal-content h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.modal-content p {
  margin: 0 0 2rem 0;
  color: #6c757d;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .order-layout {
    grid-template-columns: 1fr;
  }

  .order-summary-section {
    order: -1;
  }
}

@media (max-width: 768px) {
  .crear-pedido-view {
    padding: 1rem;
  }

  .search-bar {
    flex-direction: column;
  }

  .item-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .item-controls {
    align-self: stretch;
    justify-content: space-between;
  }

  .order-actions {
    flex-direction: column;
  }
}
</style>
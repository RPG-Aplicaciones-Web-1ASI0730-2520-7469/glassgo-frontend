import { TrackingApi } from '../infrastructure/tracking-api.js';
import { defineStore } from 'pinia';
import { computed, ref, ComputedRef } from 'vue';
import { TrackingAssembler } from '../infrastructure/tracking.assembler.js';

const trackingApi = new TrackingApi();

/**
 * Pinia store for managing tracking state, including deliveries.
 * Provides state, getters, and actions for fetching, adding, updating, and deleting deliveries.
 *
 * @store
 * @example
 * import { useTrackingStore } from '@/service-execution/application/tracking.store.js';
 * const trackingStore = useTrackingStore();
 * trackingStore.fetchDeliveries();
 * console.log(trackingStore.deliveries);
 */
const useTrackingStore = defineStore('tracking', () => {
    // State
    const deliveries = ref([]);
    const errors = ref([]);
    const deliveriesLoaded = ref(false);

    // Properties
    /**
     * Computed property that returns the count of loaded deliveries.
     * @type {ComputedRef<number>}
     */
    const deliveriesCount = computed(() => {
        return deliveriesLoaded.value ? deliveries.value.length : 0;
    });

    /**
     * Computed property that returns completed deliveries.
     * @type {ComputedRef<Array>}
     */
    const completedDeliveries = computed(() => {
        return deliveries.value.filter(delivery => delivery.isCompleted());
    });

    /**
     * Computed property that returns pending deliveries.
     * @type {ComputedRef<Array>}
     */
    const pendingDeliveries = computed(() => {
        return deliveries.value.filter(delivery => delivery.status === 'pending');
    });

    /**
     * Computed property that returns in-transit deliveries.
     * @type {ComputedRef<Array>}
     */
    const inTransitDeliveries = computed(() => {
        return deliveries.value.filter(delivery => delivery.status === 'in-transit');
    });

    /**
     * Computed property that returns the count of completed deliveries.
     * @type {ComputedRef<number>}
     */
    const completedCount = computed(() => completedDeliveries.value.length);

    /**
     * Computed property that returns the count of pending deliveries.
     * @type {ComputedRef<number>}
     */
    const pendingCount = computed(() => pendingDeliveries.value.length);

    /**
     * Computed property that returns the count of in-transit deliveries.
     * @type {ComputedRef<number>}
     */
    const inTransitCount = computed(() => inTransitDeliveries.value.length);

    // Actions
    /**
     * Fetches deliveries from the API and updates the store state.
     */
    function fetchDeliveries() {
        trackingApi.getDeliveries().then(response => {
            deliveries.value = response;
            deliveriesLoaded.value = true;
            console.log('Deliveries loaded:', deliveries.value);
        }).catch(error => {
            errors.value.push(error);
            console.error('Error fetching deliveries:', error);
        });
    }

    /**
     * Finds a delivery by ID in the local state.
     * @param {string} id - The ID of the delivery.
     * @returns {Delivery|null} The delivery or null if not found.
     */
    function getDeliveryById(id) {
        return deliveries.value.find(delivery => delivery.deliveryId === id);
    }

    /**
     * Adds a new delivery by sending it to the API and updating the store.
     * @param {Delivery|Object} delivery - The delivery to add.
     */
    function addDelivery(delivery) {
        const resource = TrackingAssembler.toPersistence(delivery);
        trackingApi.createDelivery(resource).then(newDelivery => {
            if (newDelivery) {
                deliveries.value.push(newDelivery);
                console.log('Delivery added:', newDelivery);
            }
        }).catch(error => {
            errors.value.push(error);
            console.error('Error adding delivery:', error);
        });
    }

    /**
     * Updates an existing delivery by sending it to the API and updating the store.
     * @param {Delivery|Object} delivery - The delivery to update.
     */
    function updateDelivery(delivery) {
        const resource = TrackingAssembler.toPersistence(delivery);
        trackingApi.updateDelivery(resource).then(updatedDelivery => {
            if (updatedDelivery) {
                const index = deliveries.value.findIndex(d => d.deliveryId === updatedDelivery.deliveryId);
                if (index !== -1) {
                    deliveries.value[index] = updatedDelivery;
                    console.log('Delivery updated:', updatedDelivery);
                }
            }
        }).catch(error => {
            errors.value.push(error);
            console.error('Error updating delivery:', error);
        });
    }

    /**
     * Deletes a delivery by ID from the API and updates the store.
     * @param {string} deliveryId - The ID of the delivery to delete.
     */
    function deleteDelivery(deliveryId) {
        trackingApi.deleteDelivery(deliveryId).then(() => {
            const index = deliveries.value.findIndex(d => d.deliveryId === deliveryId);
            if (index !== -1) {
                deliveries.value.splice(index, 1);
                console.log('Delivery deleted:', deliveryId);
            }
        }).catch(error => {
            errors.value.push(error);
            console.error('Error deleting delivery:', error);
        });
    }

    /**
     * Updates the location of a delivery.
     * @param {string} deliveryId - The ID of the delivery.
     * @param {string} location - The new location.
     */
    function updateDeliveryLocation(deliveryId, location) {
        const delivery = getDeliveryById(deliveryId);
        if (delivery) {
            delivery.updateLocation(location);
            updateDelivery(delivery);
        }
    }

    /**
     * Updates the status of a delivery.
     * @param {string} deliveryId - The ID of the delivery.
     * @param {string} status - The new status.
     */
    function updateDeliveryStatus(deliveryId, status) {
        const delivery = getDeliveryById(deliveryId);
        if (delivery) {
            delivery.changeStatus(status);
            updateDelivery(delivery);
        }
    }

    /**
     * Fetches deliveries for a specific carrier.
     * @param {string} carrierId - The ID of the carrier.
     */
    function fetchDeliveriesByCarrier(carrierId) {
        trackingApi.getDeliveriesByCarrier(carrierId).then(response => {
            deliveries.value = response;
            deliveriesLoaded.value = true;
            console.log(`Deliveries for carrier ${carrierId}:`, deliveries.value);
        }).catch(error => {
            errors.value.push(error);
            console.error(`Error fetching deliveries for carrier ${carrierId}:`, error);
        });
    }

    /**
     * Fetches deliveries for a specific route.
     * @param {string} routeId - The ID of the route.
     */
    function fetchDeliveriesByRoute(routeId) {
        trackingApi.getDeliveriesByRoute(routeId).then(response => {
            deliveries.value = response;
            deliveriesLoaded.value = true;
            console.log(`Deliveries for route ${routeId}:`, deliveries.value);
        }).catch(error => {
            errors.value.push(error);
            console.error(`Error fetching deliveries for route ${routeId}:`, error);
        });
    }

    /**
     * Clears all errors from the store.
     */
    function clearErrors() {
        errors.value = [];
    }

    return {
        // State
        deliveries,
        errors,
        deliveriesLoaded,
        // Properties
        deliveriesCount,
        completedDeliveries,
        pendingDeliveries,
        inTransitDeliveries,
        completedCount,
        pendingCount,
        inTransitCount,
        // Actions
        fetchDeliveries,
        addDelivery,
        updateDelivery,
        deleteDelivery,
        getDeliveryById,
        updateDeliveryLocation,
        updateDeliveryStatus,
        fetchDeliveriesByCarrier,
        fetchDeliveriesByRoute,
        clearErrors
    };
});

export default useTrackingStore;


import { httpClient } from '@/shared/infrastructure/http-client.js';
import { TrackingAssembler } from './tracking.assembler.js';

const deliveriesEndpointPath = import.meta.env.VITE_DELIVERIES_ENDPOINT_PATH || '/deliveries';

/**
 * Tracking API class to interact with the deliveries endpoint.
 * Provides methods to perform CRUD operations on deliveries and retrieve tracking information.
 *
 * @example
 * const api = new TrackingApi();
 * const deliveries = await api.getDeliveries();
 * const delivery = await api.getDeliveryById('DEL-12345');
 * const updated = await api.updateDeliveryLocation('DEL-12345', { location: 'Zone A' });
 */
export class TrackingApi {

    /**
     * Creates an instance of TrackingApi.
     * @constructor
     */
    constructor() {
        this.endpoint = deliveriesEndpointPath;
    }

    /**
     * Fetches all deliveries from the deliveries endpoint.
     * @returns {Promise<Array>} A promise that resolves to an array of Delivery entities.
     */
    async getDeliveries() {
        try {
            const response = await httpClient.get(this.endpoint);
            return TrackingAssembler.ToEntitiesFromResponse({
                status: response.status,
                data: response.data
            });
        } catch (error) {
            console.error('Error fetching deliveries:', error);
            return [];
        }
    }

    /**
     * Fetches a delivery by its ID from the deliveries endpoint.
     * @param {string} id - The ID of the delivery to fetch.
     * @returns {Promise<Object>} A promise that resolves to the Delivery entity.
     */
    async getDeliveryById(id) {
        try {
            const response = await httpClient.get(`${this.endpoint}/${id}`);
            return TrackingAssembler.ToEntityFromResource(response.data);
        } catch (error) {
            console.error(`Error fetching delivery ${id}:`, error);
            return null;
        }
    }

    /**
     * Creates a new delivery by sending a POST request to the deliveries endpoint.
     * @param {Object} resource - The delivery data to create.
     * @param {string|null} resource.deliveryId - The delivery ID (auto-generated if null).
     * @param {string|null} resource.carrierId - The carrier ID.
     * @param {string|null} resource.routeId - The route ID.
     * @param {string} resource.status - The status of the delivery (default: 'pending').
     * @param {string} resource.location - The current location of the delivery.
     * @returns {Promise<Object>} A promise that resolves to the created Delivery entity.
     */
    async createDelivery(resource) {
        try {
            const response = await httpClient.post(this.endpoint, resource);
            return TrackingAssembler.ToEntityFromResource(response.data);
        } catch (error) {
            console.error('Error creating delivery:', error);
            return null;
        }
    }

    /**
     * Updates an existing delivery by sending a PUT request to the deliveries endpoint.
     * @param {Object} resource - The delivery data to update.
     * @param {string} resource.deliveryId - The ID of the delivery.
     * @param {string|null} resource.carrierId - The carrier ID.
     * @param {string|null} resource.routeId - The route ID.
     * @param {string} resource.status - The status of the delivery.
     * @param {string} resource.location - The current location of the delivery.
     * @returns {Promise<Object>} A promise that resolves to the updated Delivery entity.
     */
    async updateDelivery(resource) {
        try {
            const response = await httpClient.put(`${this.endpoint}/${resource.deliveryId}`, resource);
            return TrackingAssembler.ToEntityFromResource(response.data);
        } catch (error) {
            console.error(`Error updating delivery ${resource.deliveryId}:`, error);
            return null;
        }
    }

    /**
     * Updates the location of a delivery.
     * @param {string} id - The ID of the delivery to update.
     * @param {Object} locationData - The location data.
     * @param {string} locationData.location - The new location.
     * @returns {Promise<Object>} A promise that resolves to the updated Delivery entity.
     */
    async updateDeliveryLocation(id, locationData) {
        try {
            const delivery = await this.getDeliveryById(id);
            if (delivery) {
                delivery.updateLocation(locationData.location);
                return await this.updateDelivery(delivery.toJSON());
            }
            return null;
        } catch (error) {
            console.error(`Error updating delivery location ${id}:`, error);
            return null;
        }
    }

    /**
     * Updates the status of a delivery.
     * @param {string} id - The ID of the delivery to update.
     * @param {Object} statusData - The status data.
     * @param {string} statusData.status - The new status.
     * @returns {Promise<Object>} A promise that resolves to the updated Delivery entity.
     */
    async updateDeliveryStatus(id, statusData) {
        try {
            const delivery = await this.getDeliveryById(id);
            if (delivery) {
                delivery.changeStatus(statusData.status);
                return await this.updateDelivery(delivery.toJSON());
            }
            return null;
        } catch (error) {
            console.error(`Error updating delivery status ${id}:`, error);
            return null;
        }
    }

    /**
     * Deletes a delivery by its ID by sending a DELETE request to the deliveries endpoint.
     * @param {string} id - The ID of the delivery to delete.
     * @returns {Promise<Object>} A promise that resolves to the deletion result.
     */
    async deleteDelivery(id) {
        try {
            const response = await httpClient.delete(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting delivery ${id}:`, error);
            return null;
        }
    }

    /**
     * Fetches all deliveries for a specific carrier.
     * @param {string} carrierId - The ID of the carrier.
     * @returns {Promise<Array>} A promise that resolves to an array of Delivery entities.
     */
    async getDeliveriesByCarrier(carrierId) {
        try {
            const response = await httpClient.get(this.endpoint, {
                params: { carrierId }
            });
            return TrackingAssembler.ToEntitiesFromResponse({
                status: response.status,
                data: response.data
            });
        } catch (error) {
            console.error(`Error fetching deliveries for carrier ${carrierId}:`, error);
            return [];
        }
    }

    /**
     * Fetches all deliveries for a specific route.
     * @param {string} routeId - The ID of the route.
     * @returns {Promise<Array>} A promise that resolves to an array of Delivery entities.
     */
    async getDeliveriesByRoute(routeId) {
        try {
            const response = await httpClient.get(this.endpoint, {
                params: { routeId }
            });
            return TrackingAssembler.ToEntitiesFromResponse({
                status: response.status,
                data: response.data
            });
        } catch (error) {
            console.error(`Error fetching deliveries for route ${routeId}:`, error);
            return [];
        }
    }
}

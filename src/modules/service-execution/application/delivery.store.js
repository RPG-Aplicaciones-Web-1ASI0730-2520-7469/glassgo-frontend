import {DeliveryRepository} from "@modules/service-execution/infrastructure/delivery.repository.js";
import {TwilioAdapter} from "@modules/service-execution/infrastructure/twilio.adapter.js";
import {MonitoringService} from "@modules/service-execution/application/monitoring.service.js";
import {DeliveryService} from "@modules/service-execution/application/delivery.service.js";
import {DeliveryController} from "@modules/service-execution/application/delivery.controller.js";
import {defineStore} from "pinia";


const repo = new DeliveryRepository();
const twilio = new TwilioAdapter({ defaultPhone: '' });
const monitoring = new MonitoringService(twilio);
const service = new DeliveryService(repo, monitoring);
const controller = new DeliveryController(service);

export const useDeliveryStore = defineStore('tracking-delivery', {
    state: () => ({
        deliveries: []
    }),

    actions: {
        load() {
            const res = controller.listAll();
            this.deliveries = res.ok ? res.data : [];
        },

        start(payload) {
            const res = controller.startDelivery(payload);
            if (!res.ok) throw new Error(res.error);
            this.deliveries.push(res.data);
            return res.data;
        },

        updateStatus(id, status) {
            const res = controller.updateDeliveryStatus(id, status);
            if (!res.ok) throw new Error(res.error);


            // actualiza solo el objeto correspondiente
            const index = this.deliveries.findIndex(d => d.deliveryId === id);
            if (index !== -1) this.deliveries[index].status = status;
            return res.data;
        },

        updateLocation(id, location) {
            const res = controller.updateDeliveryLocation(id, location);
            if (!res.ok) throw new Error(res.error);
            const index = this.deliveries.findIndex(d => d.deliveryId === id);
            if (index !== -1) this.deliveries[index].location = location;
            return res.data;
        },

        complete(id) {
            const res = controller.completeDelivery(id);
            if (!res.ok) throw new Error(res.error);
            const index = this.deliveries.findIndex(d => d.deliveryId === id);
            if (index !== -1) this.deliveries[index].status = 'completed';
            return res.data;
        }
    }
});
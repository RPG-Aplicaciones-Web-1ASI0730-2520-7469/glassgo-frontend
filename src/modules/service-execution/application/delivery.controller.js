export class DeliveryController {
    constructor(deliveryService) {
        this.deliveryService = deliveryService;
    }

    startDelivery(payload) {
        try {
            const d = this.deliveryService.startDelivery(payload);
            return { ok: true, data: d };
        } catch (e) {
            return { ok: false, error: e.message };
        }
    }

    updateDeliveryStatus(deliveryId, status) {
        try {
            const d = this.deliveryService.updateDeliveryStatus(deliveryId, status);
            return { ok: true, data: d };
        } catch (e) {
            return { ok: false, error: e.message };
        }
    }

    updateDeliveryLocation(deliveryId, location) {
        try {
            const d = this.deliveryService.updateDeliveryLocation(deliveryId, location);
            return { ok: true, data: d };
        } catch (e) {
            return { ok: false, error: e.message };
        }
    }

    completeDelivery(deliveryId) {
        return this.updateDeliveryStatus(deliveryId, 'completed');
    }

    listAll() {
        try {
            const list = this.deliveryService.listAll();
            return { ok: true, data: list };
        } catch (e) {
            return { ok: false, error: e.message };
        }
    }
}
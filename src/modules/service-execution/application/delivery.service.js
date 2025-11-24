import {Delivery} from "@modules/service-execution/domain/model/delivery.entity.js";


export class DeliveryService {
    constructor(deliveryRepo, monitoringService) {
        this.deliveryRepo = deliveryRepo;
        this.monitoringService = monitoringService;
    }

    startDelivery(payload = {}) {
        const d = new Delivery({
            deliveryId: payload.deliveryId ?? null,
            carrierId: payload.carrierId ?? null,
            routeId: payload.routeId ?? null,
            status: 'in_progress',
            location: payload.location ?? null
        });
        this.deliveryRepo.save(d);
        this.monitoringService.generateImpactAlert(d, 'info');
        return d;
    }

    updateDeliveryStatus(deliveryId, status) {
        const d = this.deliveryRepo.findById(deliveryId);
        if (!d) throw new Error('Delivery not found');

        if (d.isCompleted()) return d;
        d.changeStatus(status);
        this.deliveryRepo.update(d);
        if (status === 'delayed' || status === 'incident') {
            this.monitoringService.generateImpactAlert(d, 'critical');
        } else {
            this.monitoringService.generateImpactAlert(d, 'info');
        }
        return d;
    }

    updateDeliveryLocation(deliveryId, location) {
        const d = this.deliveryRepo.findById(deliveryId);
        if (!d) throw new Error('Delivery not found');
        d.updateLocation(location);
        this.deliveryRepo.update(d);
        const ok = this.monitoringService.verifyLocation(d);
        if (!ok) {
            this.monitoringService.generateImpactAlert(d, 'warning');
        }
        return d;
    }

    completeDelivery(deliveryId) {
        return this.updateDeliveryStatus(deliveryId, 'completed');
    }

    listAll() {
        return this.deliveryRepo.listAll();
    }
}
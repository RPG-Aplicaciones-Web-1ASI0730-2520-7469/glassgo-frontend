import {Delivery} from "@modules/service-execution/domain/model/delivery.entity.js";

export class DeliveryRepository {
    constructor(storageKey = 'gg_deliveries') {
        this.storageKey = storageKey;
        this._ensureStorage();
    }

    _ensureStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
    }

    _loadAll() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            const arr = JSON.parse(raw || '[]');
            return arr.map(item => Delivery.fromJSON(item));
        } catch (e) {
            console.error('DeliveryRepository _loadAll error', e);
            return [];
        }
    }

    _saveAll(list) {
        const raw = JSON.stringify(list.map(d => d.toJSON()));
        localStorage.setItem(this.storageKey, raw);
    }

    listAll() {
        return this._loadAll();
    }

    findById(deliveryId) {
        const found = this._loadAll().find(d => String(d.deliveryId) === String(deliveryId));
        return found || null;
    }

    save(delivery) {
        const list = this._loadAll();
        list.push(delivery);
        this._saveAll(list);
        return delivery;
    }

    update(delivery) {
        const list = this._loadAll();
        const idx = list.findIndex(d => String(d.deliveryId) === String(delivery.deliveryId));
        if (idx >= 0) {
            list[idx] = delivery;
            this._saveAll(list);
            return delivery;
        } else {
            return this.save(delivery);
        }
    }
}
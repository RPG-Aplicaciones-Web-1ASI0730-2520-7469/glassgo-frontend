export class Delivery {
    constructor({
                    deliveryId = null,
                    carrierId = null,
                    routeId = null,
                    status = 'pending',
                    location = '',
                    timestamp = null
                }) {
        this.deliveryId = deliveryId ?? `DEL-${Math.floor(10000 + Math.random() * 90000)}`;
        this.carrierId = carrierId;
        this.routeId = routeId;
        this.status = status;
        this.location = location;
        this.timestamp = timestamp ? new Date(timestamp) : new Date();
    }

    updateLocation(location) {
        this.location = location;
        this.timestamp = new Date();
    }

    changeStatus(status) {
        this.status = status;
        this.timestamp = new Date();
    }

    isCompleted() {
        return this.status === 'completed' || this.status === 'delivered';
    }

    toJSON() {
        return {
            deliveryId: this.deliveryId,
            carrierId: this.carrierId,
            routeId: this.routeId,
            status: this.status,
            location: this.location,
            timestamp: this.timestamp.toISOString()
        };
    }

    static fromJSON(obj = {}) {
        return new Delivery({
            deliveryId: obj.deliveryId,
            carrierId: obj.carrierId,
            routeId: obj.routeId,
            status: obj.status,
            location: obj.location,
            timestamp: obj.timestamp
        });
    }
}
export class MonitoringService {
    constructor(twilioAdapter) {
        this.twilioAdapter = twilioAdapter;
    }
    verifyLocation(delivery) {
        // si no tiene location devuelve false
        if (!delivery || !delivery.location) return false;
        // si location es objeto con lat/lng asumimos válido
        if (typeof delivery.location === 'object' && delivery.location.lat && delivery.location.lng) return true;
        // si es string, asumimos válido también
        return typeof delivery.location === 'string';
    }

    generateImpactAlert(delivery, alertType = 'info') {
        const message = `[Alert:${alertType}] Delivery ${delivery.deliveryId} status ${delivery.status}`;

        this.sendNotification(message);

        // ejemplo: enviar sms por si alertType === 'critical'

        if (alertType === 'critical') {
            this.twilioAdapter.sendSMS(message, this.twilioAdapter.config.defaultPhone || '');
        }
        return true;
    }

    sendNotification(message = '') {
        console.info('MonitoringService notification:', message);
        // intentar notification API por navegador
        try {
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('GlassGo Monitoring', { body: message });
            } else if ('Notification' in window && Notification.permission !== 'denied') {
                Notification.requestPermission().then(p => {
                    if (p === 'granted') new Notification('GlassGo Monitoring', { body: message });
                });
            }
        } catch (e) {
            console.error('MonitoringService sendNotification error', e);
        }
        return true;
    }
}
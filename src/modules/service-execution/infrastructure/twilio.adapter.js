export class TwilioAdapter {
    constructor(config = {}) {
        this.config = config;
        // adapter stub para frontend
    }

    connect() {
        console.log('TwilioAdapter.connect() [stub]');
        return true;
    }

    sendSMS(message = '', phoneNumber = '') {
        console.log('TwilioAdapter.sendSMS [stub]', { message, phoneNumber });
        return true;
    }
}
export class HistoryItem {
  constructor(data = {}) {
    this.id = data.id || 0;
    this.location = data.location || '';
    this.product = data.product || '';
    this.quantity = data.quantity || '';
    this.status = data.status || '';
    this.trackingNumber = data.trackingNumber || '';
    this.price = data.price || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  get formattedPrice() {
    return `S/${this.price}`;
  }

  get isComplete() {
    return this.status.toLowerCase() === 'complete';
  }
}
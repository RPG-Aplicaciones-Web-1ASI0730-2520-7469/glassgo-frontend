// =====================================================
// payment.entity.js — Domain model (Payment)
// =====================================================
export class Payment {
    constructor({ id, userId, amount, currency, date, status }) {
        this.id = id
        this.userId = userId
        this.amount = Number(amount ?? 0)
        this.currency = currency || 'PEN'
        this.date = date || new Date().toISOString().slice(0, 10)
        this.status = (status || 'pending').toLowerCase()
    }

    static fromDTO(dto = {}) {
        return new Payment({
            id: dto.id,
            userId: dto.userId,
            amount: dto.amount,
            currency: dto.currency,
            date: dto.date,
            status: dto.status
        })
    }

    isCompleted() { return this.status === 'completed' }
    isPending()   { return this.status === 'pending' }
    isFailed()    { return this.status === 'failed' || this.status === 'cancelled' || this.status === 'canceled' }
}

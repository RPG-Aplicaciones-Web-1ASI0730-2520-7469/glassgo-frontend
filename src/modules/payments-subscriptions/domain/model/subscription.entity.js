// =====================================================
// 🧩 subscription.entity.js — Domain model (Subscription)
// =====================================================
export class Subscription {
    constructor({ id, userId, plan, renewalDate, isActive }) {
        this.id = id
        this.userId = userId
        this.plan = plan || 'Basic'
        this.renewalDate = renewalDate || null
        this.isActive = Boolean(isActive)
    }

    static fromDTO(dto = {}) {
        return new Subscription({
            id: dto.id,
            userId: dto.userId,
            plan: dto.plan,
            renewalDate: dto.renewalDate,
            isActive: dto.isActive
        })
    }
}

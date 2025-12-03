// =====================================================
//  payment.service.js — Application layer (use cases)
// =====================================================
import { paymentsApi } from '../infrastructure/payments-api'
import { Payment } from '../domain/model/payment.entity'
import { Subscription } from '../domain/model/subscription.entity'

/**
 * Load all payments for a given user and map to domain entities.
 */
export async function getPaymentsByUser(userId) {
    const dto = await paymentsApi.fetchPayments(userId)
    return dto.map(Payment.fromDTO)
}

/**
 * Load the active subscription for a given user.
 */
export async function getSubscriptionByUser(userId) {
    const dto = await paymentsApi.fetchSubscription(userId)
    return dto ? Subscription.fromDTO(dto) : null
}

/**
 * Create a new payment (e.g., renewal or invoice payment).
 */
export async function createPayment(payload) {
    const dto = await paymentsApi.postPayment(payload)
    return Payment.fromDTO(dto)
}

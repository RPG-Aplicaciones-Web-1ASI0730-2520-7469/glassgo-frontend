// =====================================================
//  payments-api.js — Infrastructure (HTTP adapters)
// =====================================================
import { httpClient } from '@/shared/infrastructure/http-client'

export const paymentsApi = {
    async fetchPayments(userId) {
        const { data } = await httpClient.get(`/payments`, { params: { userId } })
        return Array.isArray(data) ? data : []
    },

    async fetchSubscription(userId) {
        const { data } = await httpClient.get(`/subscriptions`, { params: { userId } })
        return Array.isArray(data) ? data[0] : data || null
    },

    async postPayment(payload) {
        const { data } = await httpClient.post(`/payments`, payload)
        return data
    }
}

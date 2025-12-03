import axios from "axios";

const API_ORDERS = "http://localhost:3000/orders";
const API_EVENTS = "http://localhost:3000/events";

export async function fetchCalendarData(userId) {
    const [ordersRes, eventsRes] = await Promise.all([
        axios.get(`${API_ORDERS}?userId=${userId}`),
        axios.get(`${API_EVENTS}?userId=${userId}`)
    ]);

    return {
        orders: ordersRes.data,
        events: eventsRes.data
    };
}

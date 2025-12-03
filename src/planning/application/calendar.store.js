import { defineStore } from "pinia";
import { fetchCalendarData } from "../infrastructure/calendar-api.js";

export const useCalendarStore = defineStore("calendar", {
    state: () => ({
        events: []
    }),

    actions: {
        async loadCalendar(userId) {
            const { orders, events } = await fetchCalendarData(userId);

            const orderEvents = orders.map(o => ({
                title: `Pedido ${o.id} (${o.status})`,
                date: o.date,
                type: "order"
            }));

            const extraEvents = events.map(e => ({
                title: e.description,
                date: e.date,
                type: "event"
            }));

            this.events = [...orderEvents, ...extraEvents];
        }
    }
});

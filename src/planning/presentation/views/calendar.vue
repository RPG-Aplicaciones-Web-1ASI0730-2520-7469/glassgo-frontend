<template>
  <div class="calendar-container">
    <h1>Calendario de Servicios</h1>

    <p-full-calendar
        :events="events"
        :options="calendarOptions"
        style="background-color: white; padding: 1rem; border-radius: 8px;"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useCalendarStore } from "../../application/calendar.store.js";
import { useAuthStore } from "../../../iam/application/auth.store.js";

const store = useCalendarStore();
const authStore = useAuthStore();

// fallback si el store no cargó
const currentUserId = computed(() => {
  return authStore.user?.id || JSON.parse(localStorage.getItem("user"))?.id || 1;
});

const events = computed(() => store.events);

const calendarOptions = {
  initialView: "dayGridMonth",
  locale: "es"
};

onMounted(async () => {
  await store.loadCalendar(currentUserId.value);
});
</script>


<style scoped>
.calendar-container {
  padding: 2rem;
  color: white;
}
</style>

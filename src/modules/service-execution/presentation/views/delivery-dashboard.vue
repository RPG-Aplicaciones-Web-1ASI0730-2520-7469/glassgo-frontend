<script>
import { ref, computed, onMounted } from 'vue';
import { useDeliveryStore } from '../../application/delivery.store.js';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

// PrimeVue
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: 'DeliveryDashboard',

  components: {
    InputText,
    Button,
    DataTable,
    Column
  },

  setup() {
    const { t } = useI18n();
    const store = useDeliveryStore();
    const { deliveries } = storeToRefs(store);

    const searchTerm = ref('');
    const selectedDelivery = ref(null);

    onMounted(() => {
      store.load();
    });

    // Filtro de búsqueda
    const filteredDeliveries = computed(() => {
      const term = (searchTerm.value || '').toString().trim().toLowerCase();
      if (!term) return deliveries.value;

      return deliveries.value.filter(d =>
          String(d.deliveryId || '').toLowerCase().includes(term)
      );
    });

    // Función para mostrar coordenadas
    function prettifyLocation(loc) {
      if (!loc) return t('serviceExecutionMonitoring.execution.noLocation');
      if (typeof loc === 'object' && loc.lat && loc.lng) {
        const latDir = loc.lat > 0 ? 'N' : 'S';
        const lonDir = loc.lng > 0 ? 'E' : 'O';
        return `${Math.abs(loc.lat).toFixed(3)}°${latDir}, ${Math.abs(loc.lng).toFixed(3)}°${lonDir}`;
      }
      const [lat, lon] = String(loc).split(',').map(Number);
      const latDir = lat > 0 ? 'N' : 'S';
      const lonDir = lon > 0 ? 'E' : 'O';
      return `${Math.abs(lat).toFixed(3)}°${latDir}, ${Math.abs(lon).toFixed(3)}°${lonDir}`;
    }

    // Mapa dinámico
    const mapUrl = computed(() => {
      if (!selectedDelivery.value || !selectedDelivery.value.location) return '';
      const loc = selectedDelivery.value.location;
      const lat = typeof loc === 'object' ? loc.lat : Number(loc.split(',')[0]);
      const lng = typeof loc === 'object' ? loc.lng : Number(loc.split(',')[1]);
      return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;
    });

    function selectDelivery(d) {
      selectedDelivery.value = d;
    }

    function createSample() {
      store.start({
        carrierId: 1,
        routeId: 101,
        location: { lat: -34.6, lng: -58.4 }
      });
    }

    function setStatus(id, status) {
      store.updateStatus(id, status);
    }

    function complete(id) {
      store.complete(id);
    }

    function setLocation(id) {
      const location = {
        lat: -34.6 + Math.random() * 0.01,
        lng: -58.4 + Math.random() * 0.01
      };
      store.updateLocation(id, location);
    }

    return {
      t,
      searchTerm,
      filteredDeliveries,
      createSample,
      setStatus,
      complete,
      setLocation,
      prettifyLocation,
      selectedDelivery,
      selectDelivery,
      mapUrl
    };
  }
};
</script>

<template>
  <div class="p-fluid">
    <h2>{{ t('serviceExecutionMonitoring.title') }}</h2>
    <p>{{ t('serviceExecutionMonitoring.description') }}</p>

    <!-- ACCIONES -->
    <div class="actions">
      <Button
          :label="t('serviceExecutionMonitoring.execution.actions.start')"
          icon="pi pi-play"
          @click="createSample"
      />

      <InputText
          v-model="searchTerm"
          :placeholder="t('serviceExecutionMonitoring.execution.searchPlaceholder')"
          class="w-full"
      />
    </div>

    <!-- DATA TABLE PRIMEVUE -->
    <DataTable
        :value="filteredDeliveries"
        selectionMode="single"
        v-model:selection="selectedDelivery"
        dataKey="deliveryId"
        class="mt-3"
    >

      <Column
          field="deliveryId"
          :header="t('serviceExecutionMonitoring.execution.deliveryId')"
      />

      <Column
          field="status"
          :header="t('serviceExecutionMonitoring.execution.status')"
      />

      <Column :header="t('serviceExecutionMonitoring.execution.location')">
        <template #body="slotProps">
          {{ prettifyLocation(slotProps.data.location) }}
        </template>
      </Column>

      <Column :header="t('serviceExecutionMonitoring.execution.timestamp')">
        <template #body="slotProps">
          {{ slotProps.data.timestamp ? new Date(slotProps.data.timestamp).toLocaleString() : '-' }}
        </template>
      </Column>

      <!-- ACCIONES -->
      <Column :header="t('serviceExecutionMonitoring.execution.actions.title')">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
                label="Start"
                size="small"
                @click.stop="setStatus(slotProps.data.deliveryId, 'in_progress')"
            />
            <Button
                label="Delay"
                size="small"
                severity="warning"
                @click.stop="setStatus(slotProps.data.deliveryId, 'delayed')"
            />
            <Button
                label="Complete"
                size="small"
                severity="success"
                @click.stop="complete(slotProps.data.deliveryId)"
            />
            <Button
                label="Ubicar"
                size="small"
                severity="info"
                @click.stop="setLocation(slotProps.data.deliveryId)"
            />
          </div>
        </template>
      </Column>

    </DataTable>

    <!-- MAPA -->
    <div v-if="selectedDelivery" class="map-container">
      <h3>
        {{ t('serviceExecutionMonitoring.execution.mapTitle') }} -
        {{ selectedDelivery.deliveryId }}
      </h3>
      <iframe
          :src="mapUrl"
          width="100%"
          height="300"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
      />
    </div>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.map-container {
  margin-top: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}
</style>

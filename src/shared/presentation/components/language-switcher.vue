<script setup>
  import { ref, onMounted } from "vue";
  import { useI18n } from "vue-i18n";

  const { locale } = useI18n();
  const selectedLanguage = ref('en');
  
  const setLanguage = (newLang) => {
    console.log('Language switcher: Changing to', newLang);
    
    // Cambiar el idioma usando vue-i18n directamente
    locale.value = newLang;
    selectedLanguage.value = newLang;
    
    // Guardar en localStorage para persistir entre recargas
    localStorage.setItem('selected_language', newLang);
    
    console.log('Language changed to:', newLang);
  };
  
  onMounted(() => {
    console.log('Language switcher mounted');
    
    // Obtener idioma guardado en localStorage
    const savedLanguage = localStorage.getItem('selected_language') || 'en';
    
    // Sincronizar con vue-i18n
    locale.value = savedLanguage;
    selectedLanguage.value = savedLanguage;
    
    console.log('Initial language:', selectedLanguage.value);
  });
</script>

<template>
  <div class="language-switcher">
    <div class="language-buttons">
      <pv-button 
        :class="{ 'p-highlight': selectedLanguage === 'en' }"
        @click="setLanguage('en')"
        size="small"
        outlined
      >
        EN
      </pv-button>
      <pv-button 
        :class="{ 'p-highlight': selectedLanguage === 'es' }"
        @click="setLanguage('es')"
        size="small"
        outlined
      >
        ES
      </pv-button>
    </div>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-buttons {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.language-buttons :deep(.p-button) {
  border-radius: 0 !important;
  border: none !important;
  background: #ffffff !important;
  color: #6b7280 !important;
  font-family: 'Baloo Chettan 2', cursive !important;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  padding: 0.5rem 1rem !important;
  transition: all 0.2s ease !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  min-width: 40px !important;
  border-right: 1px solid #e5e7eb !important;
}

.language-buttons :deep(.p-button:last-child) {
  border-right: none !important;
}

.language-buttons :deep(.p-button.p-highlight) {
  background: #002240 !important;
  color: #ffffff !important;
  box-shadow: none !important;
}

.language-buttons :deep(.p-button:hover:not(.p-highlight)) {
  background: #f3f4f6 !important;
  color: #374151 !important;
}

.language-buttons :deep(.p-button:first-child) {
  border-top-left-radius: 8px !important;
  border-bottom-left-radius: 8px !important;
}

.language-buttons :deep(.p-button:last-child) {
  border-top-right-radius: 8px !important;
  border-bottom-right-radius: 8px !important;
}
</style>
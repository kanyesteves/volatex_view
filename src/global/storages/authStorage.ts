// src/stores/menuStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenuStore = defineStore('authStorage', () => {
  const items_config = ref<any[]>(loadItemsConfig());

  function loadItemsConfig(): any[] {
    const savedConfig = localStorage.getItem('items_config');
    return savedConfig ? JSON.parse(savedConfig) : [];
  }

  function saveItemsConfig(newConfig: any[]): void {
    localStorage.setItem('items_config', JSON.stringify(newConfig));
  }

  function setItemsConfig(newConfig: any[]) {
    items_config.value = newConfig;
    saveItemsConfig(newConfig);
  }

  function clearItemsConfig() {
    items_config.value = [];
    localStorage.removeItem('items_config');
  }

  items_config.value = loadItemsConfig();
  return { items_config, setItemsConfig, clearItemsConfig };
});
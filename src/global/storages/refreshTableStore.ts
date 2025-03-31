import { defineStore } from "pinia";
import { ref } from 'vue';

export const useRefreshTable = defineStore('refreshTableStorage', () => {
  const refresh = ref(false);

  function setRefresh(new_value: boolean) {
    refresh.value = new_value;
  }

  function getRefresh() {
    return refresh.value;
  }

  return { setRefresh, getRefresh };
});
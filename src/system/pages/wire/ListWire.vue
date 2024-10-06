<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
      v-model:selection="wireSelected"
      :scroll-height="screenHeight" 
      :value="wires" 
      :metaKeySelection="false"
      @rowSelect="onRowSelect" 
      @rowUnselect="onRowUnSelect" 
      dataKey="id" 
      tableStyle="min-width: 50rem">

      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="name" header="Nome" style="width: 35%"></Column>
      <Column field="description" header="Descrição"></Column>

    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash';
import { ref, onMounted, defineEmits } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import wireService from '@/system/services/wireService';

const emit = defineEmits(['selected', 'unselected'])

onMounted(() => {
  onLoadWire()
  responsiveScreen();
})

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const loadTable = ref(false)
const wireSelected = ref();
const wires = ref([]);

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

const onLoadWire = debounce(async () => {
  loadTable.value = true
  await wireService.getAll().then((response) => {
    if (response.status === 200) {
      loadTable.value = false
      wires.value = response.data
    }
  })
});

const responsiveScreen = () => {
  if (windowHeight.value === 993)
    screenHeight.value = "800px"

  if (windowHeight.value >= 813)
    screenHeight.value = "640px"
};

</script>

<style module>

</style>
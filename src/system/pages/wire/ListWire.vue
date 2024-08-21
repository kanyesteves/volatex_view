<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      v-model:selection="wireSelected"
      :scroll-height="screenHeight" 
      :value="wires" 
      :metaKeySelection="false"
      @rowSelect="onRowSelect" 
      @rowUnselect="onRowUnSelect" 
      dataKey="id" 
      tableStyle="min-width: 50rem">

      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>

    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash';
import { ref, onMounted, defineEmits, defineProps, watch } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import wireService from '@/system/services/wireService';

const emit = defineEmits(['selected', 'unselected'])
const props = defineProps(['refresh'])

onMounted(() => {
  onLoadWire()
  responsiveScreen();
})

watch(() => props.refresh, () => {
  onLoadWire();
});

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const loadTable = ref(false)
const wireSelected = ref();
const wires = ref([]);

const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'description', header: 'Descrição' }
];

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
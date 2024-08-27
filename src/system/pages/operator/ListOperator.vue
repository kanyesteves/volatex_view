<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      v-model:selection="operatorSelected"
      :scroll-height="screenHeight" 
      :value="operators" 
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
import { ref, onMounted, defineEmits } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { debounce } from 'lodash';
import operatorService from '@/system/services/operatorService';

const emit = defineEmits(['selected', 'unselected'])

onMounted(() => {
  onLoadOperators()
  responsiveScreen();
})

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const operatorSelected = ref();
const operators = ref([]);

const columns = [
  { field: 'turn', header: 'Turno' },
  { field: 'name', header: 'Nome' },
  { field: 'office', header: 'Cargo' },
];

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

const onLoadOperators = debounce(async () => {
  await operatorService.getAll().then((response) => {
    if (response.status === 200) {
      operators.value = response.data
    }
  })
});

const responsiveScreen = () => {
  if (windowHeight.value === 993)
    screenHeight.value = "800px"

  if (windowHeight.value === 813)
    screenHeight.value = "640px"
};

</script>
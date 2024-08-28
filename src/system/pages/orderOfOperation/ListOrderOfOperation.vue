<template>
  <div class="card">
    <DataTable
      stripedRows scrollable
      v-model:selection="opSelected"
      :scroll-height="screenHeight"
      :value="ops"
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
import orderOfOperationService from '@/system/services/orderOfOperationService';

const emit = defineEmits(['selected', 'unselected'])

onMounted(() => {
  onLoadOps()
  responsiveScreen();
})

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const opSelected = ref();
const ops = ref([]);

const columns = [
  { field: 'status', header: 'Status' },
  { field: 'code', header: 'Código' },
  { field: 'weight_per_piece', header: 'Peso por peça' },
  { field: 'article', header: 'Artigo' },
  { field: 'wires', header: 'Fios' },
  { field: 'total_weight', header: 'Peso total' }
];

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

const onLoadOps = debounce(async () => {
  await orderOfOperationService.getAll().then((response) => {
    if (response.status === 200) {
      ops.value = response.data
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

<style module>

</style>
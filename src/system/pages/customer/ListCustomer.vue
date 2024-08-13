<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      v-model:selection="customerSelected"
      :scroll-height="screenHeight" 
      :value="customers" 
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
import { ref, onMounted, defineEmits, defineProps, watch } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { debounce } from 'lodash';
import customerService from '@/system/services/customerService';

const emit = defineEmits(['selected', 'unselected'])
const props = defineProps(['refresh'])

onMounted(() => {
  onLoadCustomer()
  responsiveScreen();
})

watch(() => props.refresh, () => {
  onLoadCustomer();
});

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const loadTable = ref(false)
const customerSelected = ref();
const customers = ref([]);

const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'article', header: 'Artigo' }
];

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

const onLoadCustomer = debounce(async () => {
  loadTable.value = true
  await customerService.getAll().then((response) => {
    if (response.status === 200) {
      loadTable.value = false
      customers.value = response.data
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
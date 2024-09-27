<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
      v-model:selection="tearSelected"
      :scroll-height="screenHeight" 
      :value="teares" 
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
import tearService from '@/system/services/tearService';

const emit = defineEmits(['selected', 'unselected'])

onMounted(() => {
  onLoadTeares()
  responsiveScreen();
})

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const tearSelected = ref();
const teares = ref([]);

const columns = [
  { field: 'status', header: 'Status' },
  { field: 'name', header: 'Nome' },
  { field: 'model', header: 'Modelo' },
];

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

const onLoadTeares = debounce(async () => {
  await tearService.getAll().then((response) => {
    if (response.status === 200) {
      teares.value = response.data
      teares.value.map(item => (item.status == true) ? item.status = 'Ativo' : item.status = 'Inativo')
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
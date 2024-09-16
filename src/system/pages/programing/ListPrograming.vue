<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      v-model:selection="programingSelected"
      :scroll-height="screenHeight" 
      :value="programings" 
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
import programingService from '@/system/service/programingService';

const emit = defineEmits(['selected', 'unselected'])

onMounted(() => {
  onLoadPrograming()
  responsiveScreen();
})

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const programingSelected = ref();
const programings = ref([]);

const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'tear', header: 'Tear' },
  { field: 'op',   header: 'Ordem de Operação' },
];

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

const onLoadPrograming = debounce(async () => {
  await programingService.getAll().then((response) => {
    if (response.status === 200) {
      programings.value = response.data
      programings.value.forEach((ele) => {

        if (ele.tear != null) {
          ele.tear = ele.tear.map(item => item.name).join(', ');
        }

        if (ele.op != null) {
          ele.op = ele.op.map(item => item.code).join(', ');
        }

      })
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
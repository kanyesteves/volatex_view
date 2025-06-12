<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      paginator :rows="50" :rowsPerPageOptions="[5, 10, 20, 50]"
      v-model:selection="operatorSelected"
      :value="operators" 
      :metaKeySelection="false"
      @rowSelect="onRowSelect" 
      @rowUnselect="onRowUnSelect" 
      dataKey="id" 
      tableStyle="min-width: 50rem">

      <Column selectionMode="multiple" headerStyle="width: 3rem">
        <template #body v-if="refresh">
            <Skeleton></Skeleton>
        </template>
      </Column>
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
        <template #body v-if="refresh">
            <Skeleton></Skeleton>
        </template>
      </Column>

    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits, watch } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { debounce } from 'lodash';
import Skeleton from 'primevue/skeleton';
import operatorService from '@/system/services/operatorService';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const emit = defineEmits(['selected', 'unselected'])

onMounted(() => {
  onLoadOperators()
})

const use_refresh_table = useRefreshTable()
const operatorSelected = ref();
const operators = ref([]);
const refresh = ref(false)

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

watch(() => use_refresh_table.getRefresh(), (newValue) => {
  refresh.value = newValue
  onLoadOperators()
})

const onLoadOperators = debounce(async () => {
  await operatorService.getAll().then((response) => {
    if (response.status === 200) {
      operators.value = response.data
      operatorSelected.value = null

      setTimeout(() => {
        use_refresh_table.setRefresh(false)
        refresh.value = false
      }, 500)

    }
  })
});

</script>
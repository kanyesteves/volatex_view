<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      paginator :rows="50" :rowsPerPageOptions="[5, 10, 20, 50]"
      v-model:selection="programingSelected"
      :value="programings" 
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
import programingService from '@/system/services/programingService';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const emit = defineEmits(['selected', 'unselected'])
const use_refresh_table = useRefreshTable()

onMounted(() => {
  onLoadPrograming()
})

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const programingSelected = ref();
const programings = ref([]);
const refresh = ref(false)

const columns = [
  { field: 'tear',          header: 'Tear' },
  { field: 'name',          header: 'Nome' },
  { field: 'op',            header: 'Ordem de Operação' },
  { field: 'rpm',           header: 'RPM' },
  { field: 'weight_daily',  header: 'Peso diário' },
  { field: 'days_for_done', header: 'Dias para conclusão' },
  { field: 'date_start',    header: 'Data Inicial' },
  { field: 'date_end',      header: 'Data Final' },
];

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

watch(() => use_refresh_table.getRefresh(), (newValue) => {
  refresh.value = newValue
  onLoadPrograming()
})

const onLoadPrograming = debounce(async () => {
  await programingService.getAll().then((response) => {
    if (response.status === 200) {
      programings.value = response.data
      programingSelected.value = null

      setTimeout(() => {
        use_refresh_table.setRefresh(false)
        refresh.value = false
      }, 500)

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

</script>
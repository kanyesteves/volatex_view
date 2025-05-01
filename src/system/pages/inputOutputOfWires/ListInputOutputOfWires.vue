<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
      v-model="input_output_of_wires_selected"
      :scroll-height="screenHeight"
      :value="input_output_of_wires"
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
      <Column field="name" header="Titulo do Fio">
        <template #body v-if="refresh">
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="weight" header="Peso">
        <template #body v-if="refresh">
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="type_register" header="Tipo">
        <template #body v-if="refresh">
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="fiscal_note" header="NF">
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
import inputOutputOfWiresService from '@/system/services/inputOutputOfWiresService';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const emit = defineEmits(['selected', 'unselected'])
const use_refresh_table = useRefreshTable()
const refresh = ref(false)

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()

const input_output_of_wires_selected = ref();
const input_output_of_wires = ref([]);

onMounted(() => {
  onLoadInputOutputOfWires()
  responsiveScreen()
})

watch(() => use_refresh_table.getRefresh(), (newValue) => {
  refresh.value = newValue
  onLoadInputOutputOfWires()
})

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

const onLoadInputOutputOfWires = debounce(async () => {
  await inputOutputOfWiresService.getAll().then((response) => {
    if (response.status === 200) {
      input_output_of_wires.value = response.data
      input_output_of_wires_selected.value = null

      setTimeout(() => {
        use_refresh_table.setRefresh(false)
        refresh.value = false
      }, 500)
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
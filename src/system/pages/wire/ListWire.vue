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

      <Column selectionMode="multiple" headerStyle="width: 3rem">
        <template #body v-if="refresh">
            <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="name" header="Nome" style="width: 35%">
        <template #body v-if="refresh">
            <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="weight" header="Peso">
        <template #body="slotProps">
          <Tag :value="slotProps.data.weight + ' kg'" :severity="getSeverity(slotProps.data)" />
        </template>
      </Column>
      <Column field="description" header="Descrição">
        <template #body v-if="refresh">
            <Skeleton></Skeleton>
        </template>
      </Column>

    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import Tag from 'primevue/tag';
import { debounce } from 'lodash';
import { ref, onMounted, defineEmits, watch } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import wireService from '@/system/services/wireService';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const emit = defineEmits(['selected', 'unselected'])
const use_refresh_table = useRefreshTable()

onMounted(() => {
  onLoadWire()
  responsiveScreen();
})

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const wireSelected = ref();
const wires = ref([]);
const refresh = ref(false)

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

const getSeverity = (value) => {
  if (value.weight > 20)
    return "success"
  else if (value.weight >= 10 && value.weight <= 20)
    return "warn"
  else if (value.weight < 10)
    return "danger"
}

watch(() => use_refresh_table.getRefresh(), (newValue) => {
  refresh.value = newValue
  onLoadWire()
})

const onLoadWire = debounce(async () => {
  await wireService.getAll().then((response) => {
    if (response.status === 200) {
      wires.value = response.data
      wireSelected.value = null

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
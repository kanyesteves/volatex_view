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

      <Column selectionMode="multiple" headerStyle="width: 3rem">
        <template #body v-if="refresh">
            <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="status" header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data)" />
        </template>
      </Column>
      <Column field="name" header="Nome">
        <template #body v-if="refresh">
            <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="model" header="Modelo">
        <template #body v-if="refresh">
            <Skeleton></Skeleton>
        </template>
      </Column>

    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits, watch } from 'vue'
import Tag from 'primevue/tag';
import { debounce } from 'lodash';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import tearService from '@/system/services/tearService';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const emit = defineEmits(['selected', 'unselected'])

onMounted(() => {
  onLoadTeares()
  responsiveScreen();
})

const use_refresh_table = useRefreshTable()
const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const tearSelected = ref();
const teares = ref([]);
const refresh = ref(false)

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

watch(() => use_refresh_table.getRefresh(), (newValue) => {
  refresh.value = newValue
  onLoadTeares()
})

const onLoadTeares = debounce(async () => {
  await tearService.getAll().then((response) => {
    if (response.status === 200) {
      teares.value = response.data
      tearSelected.value = null

      setTimeout(() => {
        use_refresh_table.setRefresh(false)
        refresh.value = false
      }, 500)
      
      teares.value.map(item => (item.status == true) ? item.status = 'Ativo' : item.status = 'Inativo')
    }
  })
});

const getSeverity = (status) => {
  switch (status.status) {
    case 'Ativo':
      return 'success';

    case 'Inativo':
      return 'danger';

    default:
      return null;
  }
};

const responsiveScreen = () => {
  if (windowHeight.value === 993)
    screenHeight.value = "800px"

  if (windowHeight.value === 813)
    screenHeight.value = "640px"
};

</script>

<style module>

</style>
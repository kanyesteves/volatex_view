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
      <Column field="status" header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data)" />
        </template>
      </Column>
      <Column field="name" header="Nome"></Column>
      <Column field="model" header="Modelo"></Column>

    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits } from 'vue'
import Tag from 'primevue/tag';
import { debounce } from 'lodash';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
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
<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      v-model:selection="userSelected"
      :scroll-height="screenHeight" 
      :value="users" 
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
import userService from '@/pages/services/userService';

const emit = defineEmits(['selected', 'unselected'])
const props = defineProps(['refresh'])

onMounted(() => {
  onLoadUsers()
  responsiveScreen();
})

watch(() => props.refresh, () => {
  onLoadUsers();
});

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const loadTable = ref(false)
const userSelected = ref();
const users = ref([]);

const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'email', header: 'E-mail' },
  { field: 'office', header: 'Cargo' }
];

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

const onLoadUsers = debounce(async () => {
  loadTable.value = true
  await userService.getAll().then((response) => {
    if (response.status === 200) {
      loadTable.value = false
      users.value = response.data
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
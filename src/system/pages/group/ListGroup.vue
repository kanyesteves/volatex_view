<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
      v-model:selection="groupSelected"
      :scroll-height="screenHeight" 
      :value="groups" 
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
import groupService from '@/system/services/groupService';

const emit = defineEmits(['selected', 'unselected'])

onMounted(() => {
  onLoadGroup()
  responsiveScreen();
})

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const loadTable = ref(false)
const groupSelected = ref();
const groups = ref([]);

const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'users', header: 'Usuários' },
  { field: 'permissions', header: 'Permissões' }
];

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

const onLoadGroup = debounce(async () => {
  loadTable.value = true
  await groupService.getAll().then((response) => {
    if (response.status === 200) {
      loadTable.value = false
      groups.value = response.data
      groups.value.forEach((ele) => {
        if (ele.users != null) {
          ele.users = ele.users.map(item => item.name).join(', ')
        }

        if (ele.permissions != null) {
          ele.permissions = ele.permissions.map(item => item.name).join(', ')
        }
      })
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
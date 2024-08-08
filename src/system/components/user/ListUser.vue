<template>
  <div class="card">
    <DataTable v-model:selection="userSelected" :value="users" :metaKeySelection="false"
               @rowSelect="onRowSelect" showGridlines dataKey="id" tableStyle="min-width: 50rem">

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>

    </DataTable>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { debounce } from 'lodash';
import userService from '@/system/services/userService';

onMounted(() => {
  onLoadUsers()
})

const userSelected = ref();
const users = ref([]);
const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'email', header: 'E-mail' },
  { field: 'office', header: 'Cargo' }
];

const user_id_selected = ref()
const onRowSelect = (event) => {
  user_id_selected.value = event.data.id
}

const onLoadUsers = debounce(() => {
  userService.getAll().then((response) => {
    users.value = response.data
  })
})

</script>
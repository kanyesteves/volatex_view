<template>
  <div class="card">
    <DataTable v-model:selection="userSelected" :value="users" :metaKeySelection="false"
               @rowSelect="onRowSelect" @rowUnselect="onRowUnSelect" stripedRows dataKey="id" tableStyle="min-width: 50rem">

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>

    </DataTable>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits, defineModel } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { debounce } from 'lodash';
import userService from '@/system/services/userService';

const emit = defineEmits(['selected', 'unselected'])

onMounted(() => {
  onLoadUsers()
})

const refresh =  defineModel()
const userSelected = ref();
const users = ref([]);
const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'email', header: 'E-mail' },
  { field: 'office', header: 'Cargo' }
];

const onRowSelect = (event) => {
  emit('selected', event)
}

const onRowUnSelect = () => {
  emit('unselected')
}

const onLoadUsers = debounce(() => {
  userService.getAll().then((response) => {
    users.value = response.data
  })
})

</script>
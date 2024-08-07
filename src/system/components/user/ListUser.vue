<template>
  <div class="card">
    <DataTable :value="products" tableStyle="min-width: 50rem">
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


const products = ref();
const columns = [
  { field: 'name', header: 'Nome' },
  { field: 'email', header: 'E-mail' },
  { field: 'office', header: 'Cargo' }
];

const onLoadUsers = debounce(() => {
  userService.getAll().then((response) => {
    console.log(response)
  })
})

</script>
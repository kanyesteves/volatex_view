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
import groupService from '@/system/services/groupService';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const use_refresh_table = useRefreshTable()
const emit = defineEmits(['selected', 'unselected'])

onMounted(() => {
  onLoadGroup()
  responsiveScreen();
})

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const groupSelected = ref();
const groups = ref([]);
const refresh = ref(false)

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

watch(() => use_refresh_table.getRefresh(), (newValue) => {
  refresh.value = newValue
  onLoadGroup()
})

const onLoadGroup = debounce(async () => {
  await groupService.getAll().then((response) => {
    if (response.status === 200) {
      groups.value = response.data
      groupSelected.value = null

      setTimeout(() => {
        use_refresh_table.setRefresh(false)
        refresh.value = false
      }, 500)

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
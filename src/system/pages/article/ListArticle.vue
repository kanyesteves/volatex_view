<template>
  <div class="card">
    <DataTable 
      stripedRows scrollable
      paginator :rows="50" :rowsPerPageOptions="[5, 10, 20, 50]"
      v-model:selection="articleSelected"
      :value="articles" 
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
      <Column field="price" header="Preço" style="width: 15%">
        <template #body v-if="refresh">
            <Skeleton></Skeleton>
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
import { debounce } from 'lodash';
import { ref, onMounted, defineEmits, watch } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import articleService from '@/system/services/articleService';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const emit = defineEmits(['selected', 'unselected'])
const use_refresh_table = useRefreshTable()

onMounted(() => {
  onLoadArticle()
})

const articleSelected = ref();
const articles = ref([]);
const refresh = ref(false)

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

watch(() => use_refresh_table.getRefresh(), (newValue) => {
  refresh.value = newValue
  onLoadArticle()
})

const onLoadArticle = debounce(async () => {
  await articleService.getAll().then((response) => {
    if (response.status === 200) {
      articles.value = response.data
      articleSelected.value = null

      setTimeout(() => {
        use_refresh_table.setRefresh(false);
        refresh.value = false
      }, 500)


    }
  })
});

</script>
<template>
  <div class="card">
    <!-- <DataTable 
      stripedRows scrollable
      paginator :rows="50" :rowsPerPageOptions="[5, 10, 20, 50]"
      v-model:selection="programingSelected"
      :value="programings" 
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

    </DataTable> -->

    <Card :class="$style.card_list" v-for="programming in programings" :key="programming.id">
      <template #title>
        <div :class="$style.card_title">
            {{programming.tear}} - {{ programming.name }}
          <Button v-tooltip.bottom="'Remover'" icon="pi pi-trash" severity="danger" :style="{'width': '30px', 'height': '30px'}"></Button>
        </div>
      </template>

      <template #content>
        <div :class="$style.card_content">
          <div :class="$style.card_content_body">
            <p><b>RPM: </b>{{ programming.rpm }}</p>
            <p><b>Eficiência: </b>{{ programming.efficiency }} %</p>
          </div>
          <div :class="$style.card_content_body">
            <p><b>Peso por dia: </b>{{ programming.weight_daily }} kg</p>
            <p><b>Peso por dia: </b>{{ programming.days_for_done }} dias</p>
          </div>
        </div>
      </template>

      <template #footer>
        <div :class="$style.card_footer">
          <i>{{ programming.date_start + ' - ' + programming.date_end }}</i>
        </div>
      </template>
    </Card>
    
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits, watch } from 'vue'
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { debounce } from 'lodash';
import Skeleton from 'primevue/skeleton';
import programingService from '@/system/services/programingService';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const emit = defineEmits(['selected', 'unselected'])
const use_refresh_table = useRefreshTable()

onMounted(() => {
  onLoadPrograming()
})

const programingSelected = ref();
const programings = ref([]);
const refresh = ref(false)

const columns = [
  { field: 'tear',          header: 'Tear' },
  { field: 'name',          header: 'Nome' },
  { field: 'op',            header: 'Ordem de Operação' },
  { field: 'rpm',           header: 'RPM' },
  { field: 'weight_daily',  header: 'Peso diário' },
  { field: 'days_for_done', header: 'Dias para conclusão' },
  { field: 'date_start',    header: 'Data Inicial' },
  { field: 'date_end',      header: 'Data Final' },
];

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

watch(() => use_refresh_table.getRefresh(), (newValue) => {
  refresh.value = newValue
  onLoadPrograming()
})

const onLoadPrograming = debounce(async () => {
  await programingService.getAll().then((response) => {
    if (response.status === 200) {
      programings.value = response.data
      programingSelected.value = null

      setTimeout(() => {
        use_refresh_table.setRefresh(false)
        refresh.value = false
      }, 500)

      programings.value.forEach((ele) => {

        if (ele.tear != null) {
          ele.tear = ele.tear.map(item => item.name).join(', ');
        }

        if (ele.op != null) {
          ele.op = ele.op.map(item => item.code).join(', ');
        }

      })
    }
  })
});

</script>

<style lang="scss" module>

.card_list {
  display: flex;
  margin-top: 1rem;
  border: 1px solid #e0e0e0;
  color: #46494e;
}

.card_title {
  display: flex;
  justify-content: space-between;
}

.card_content {
  display: flex;
  align-items: center;
  
  
  .card_content_body {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-right: 15rem;

    p {
     margin: 5px; 
    }
  }
}

.card_footer {
  display: flex;
  justify-content: center;
}
</style>
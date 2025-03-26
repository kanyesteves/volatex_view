<template>
  <div class="card">
    <DataTable
      stripedRows scrollable
      paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
      v-model:selection="opSelected"
      v-model:filters="filters"
      :scroll-height="screenHeight"
      :value="ops"
      :metaKeySelection="false"
      @rowSelect="onRowSelect"
      @rowUnselect="onRowUnSelect"
      dataKey="id"
      tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex justify-end">
            <InputGroup :style="{'max-width': '250px'}">
                <InputGroupAddon>
                    <i class="pi pi-filter" />
                </InputGroupAddon>
                <InputText v-model="filters['global'].value" placeholder="Filtrar" />
            </InputGroup>
        </div>
      </template>

      <template #empty> 
        <Tag severity="warn">
          Nenhuma OP cadastrada. 
        </Tag>
      </template>

      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="status" header="Status" style="width: 14%">
        <template #body="slotProps">
          <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data)" />
        </template>
      </Column>
      <Column field="fiscal_note" header="NF"></Column>
      <Column field="code" header="Código"></Column>
      <Column field="weight_per_piece" header="Peso por peça"></Column>
      <Column field="customer" header="Cliente"></Column>
      <Column field="article" header="Artigo"></Column>
      <Column field="wires" header="Fios"></Column>
      <Column field="total_weight" header="Peso total"></Column>
      <Column field="total_pieces" header="Total de peças"></Column>
      <Column field="date_open" header="Data de abertura"></Column>

    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits, warn } from 'vue'
import DataTable from 'primevue/datatable';
import Tag from 'primevue/tag';
import Column from 'primevue/column';
import { debounce } from 'lodash';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import { FilterMatchMode } from '@primevue/core/api';
import InputGroupAddon from 'primevue/inputgroupaddon';
import orderOfOperationService from '@/system/services/orderOfOperationService';

const emit = defineEmits(['selected', 'unselected'])

onMounted(() => {
  onLoadOps()
  responsiveScreen();
})

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const opSelected = ref();
const ops = ref([]);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const onRowSelect = (event) => {
  emit('selected', event)
};

const onRowUnSelect = (event) => {
  emit('unselected', event)
};

const onLoadOps = debounce(async () => {
  await orderOfOperationService.getAll().then((response) => {
    if (response.status === 200) {
      ops.value = response.data
      ops.value.forEach((ele) => {
        ele.weight_per_piece = ele.weight_per_piece + ' kg'
        ele.total_weight = ele.total_weight + ' kg'

        if (ele.status == 'open') {
          ele.status = 'Aberto';
        } else if (ele.status == 'in_progress') {
          ele.status = 'Em andamento';
        } else if (ele.status == 'closed') {
          ele.status = 'Fechado';
        }

        if (ele.customer != null) {
          ele.customer = ele.customer.map(item => item.name).join(', ');
        }

        if (ele.article != null) {
          ele.article = ele.article.map(item => item.name).join(', ');
        }

        if (ele.wires != null) {
          ele.wires = ele.wires.map(item => item.name).join(', ');
        }
      })
    }
  })
});

const getSeverity = (element) => {
  switch (element.status) {
    case 'Aberto':
      return 'success';

    case 'Em andamento':
      return 'warn';

    case 'Fechado':
      return 'danger';

    default:
      return null;
  }
};

const responsiveScreen = () => {
  if (windowHeight.value <= 820) {
    screenHeight.value = "425px"
  }
};

</script>

<style module>

</style>
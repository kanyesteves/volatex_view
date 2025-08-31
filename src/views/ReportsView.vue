<template>
  <div class="reports">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <Card :class="$style.mainContent" class="card">

        <template #content>
          <Tabs value="0">
            <TabList>
                <Tab value="0">Entradas e Saídas de fios</Tab>
                <Tab value="1">Programações</Tab>
                <Tab value="2">Ordens de Operação</Tab>
            </TabList>
            <TabPanels>

              <!-- Aba das Entradas e Saídas de Fios -->
              <TabPanel value="0" >
                <div :class="$style.box_reports">
                  <InputGroup :style="{'max-width': '250px', 'margin-left': '10px'}">
                    <InputGroupAddon>
                      <i class="pi pi-filter" />
                    </InputGroupAddon>
                    <InputText v-model="filters_io_wires['global'].value" placeholder="Filtrar" />
                  </InputGroup>
                </div>
                <Divider />

                <Message v-if="all_io_wires.length == 0" severity="warn">Nenhum entrada ou saída de fio foi registrada.</Message>

                <DataTable v-else
                  stripedRows scrollable
                  paginator :rows="50" :rowsPerPageOptions="[5, 10, 20, 50]"
                  v-model:filters="filters_io_wires"
                  :scroll-height="screenHeight"
                  :value="all_io_wires"
                  :metaKeySelection="false"
                  dataKey="id"
                  tableStyle="min-width: 50rem">

                  <Column field="type_register" header="Tipo">
                    <template #body="slotProps">
                      <Tag :value="slotProps.data.type_register" :severity="getSeverity(slotProps.data, 'io_wires')" />
                    </template>
                  </Column>
                  <Column field="name" header="Título"></Column>
                  <Column field="weight" header="Peso"></Column>
                  <Column field="date_open" header="Data de abertura"></Column>
                  <Column field="fiscal_note" header="Nº Nota Fiscal"></Column>

                </DataTable>
              </TabPanel>

              <!-- Aba das Programações -->
              <TabPanel value="1">
                <div :class="$style.box_reports">
                  <InputGroup :style="{'max-width': '250px', 'margin-left': '10px'}">
                    <InputGroupAddon>
                      <i class="pi pi-filter" />
                    </InputGroupAddon>
                    <InputText v-model="filters_programing['global'].value" placeholder="Filtrar" />
                  </InputGroup>
                </div>
                <Divider />

                <Message v-if="all_programings_reports.length == 0" severity="warn">Nenhuma programação foi registrado.</Message>

                <DataTable v-else
                  stripedRows scrollable
                  paginator :rows="50" :rowsPerPageOptions="[5, 10, 20, 50]"
                  v-model:filters="filters_programing"
                  :scroll-height="screenHeight"
                  :value="all_programings_reports"
                  :metaKeySelection="false"
                  dataKey="id"
                  tableStyle="min-width: 50rem">

                  <Column field="type_register" header="Tipo">
                    <template #body="slotProps">
                      <Tag :value="slotProps.data.type_register" :severity="getSeverity(slotProps.data, 'programing')" />
                    </template>
                  </Column>
                  <Column field="name" header="Nome"></Column>
                  <Column field="op" header="OP"></Column>
                  <Column field="tear" header="Tear"></Column>
                  <Column field="date_start" header="Data de inicio"></Column>
                  <Column field="date_end" header="Data de finalização"></Column>
                  <Column field="weight_daily" header="Peso diário"></Column>

                </DataTable>
              </TabPanel>

              <!-- Aba das Ordens de Operação -->
              <TabPanel value="2">
                <div :class="$style.box_reports">
                  <InputGroup :style="{'max-width': '250px', 'margin-left': '10px'}">
                    <InputGroupAddon>
                      <i class="pi pi-filter" />
                    </InputGroupAddon>
                    <InputText v-model="filters_ops['global'].value" placeholder="Filtrar" />
                  </InputGroup>
                </div>
                <Divider />

                <Message v-if="all_ops.length == 0" severity="warn">Nenhuma OP foi registrada.</Message>

                <DataTable v-else
                  stripedRows scrollable
                  paginator :rows="50" :rowsPerPageOptions="[5, 10, 20, 50]"
                  v-model:filters="filters_ops"
                  :scroll-height="screenHeight"
                  :value="all_ops"
                  :metaKeySelection="false"
                  dataKey="id"
                  tableStyle="min-width: 50rem">

                  <Column field="status" header="Status" style="width: 14%">
                    <template #body="slotProps">
                      <Tag :value="slotProps.data.status" severity="danger" />
                    </template>
                  </Column>
                  <Column field="code" header="Código"></Column>
                  <Column field="customer" header="Cliente"></Column>
                  <Column field="article" header="Artigo"></Column>
                  <Column field="fiscal_note" header="NF"></Column>
                  <Column field="weight_per_piece" header="Média"></Column>
                  <Column field="total_weight" header="Peso total"></Column>
                  <Column field="total_pieces" header="Total de peças"></Column>
                  <Column field="date_open" header="Data de abertura"></Column>

                </DataTable>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </template>

      </Card>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Tab from 'primevue/tab';
import Tag from 'primevue/tag';
import Tabs from 'primevue/tabs';
import Card from 'primevue/card';
import Column from 'primevue/column';
import TabList from 'primevue/tablist';
import Message from 'primevue/message';
import Divider from 'primevue/divider';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import { useMenuStore } from '@/global/storages/authStorage';
import { FilterMatchMode } from '@primevue/core/api';
import inputOutputOfWiresService from '@/system/services/inputOutputOfWiresService';
import programingReportsService from '@/system/services/programingReportsService';
import orderOfOperationService from '@/system/services/orderOfOperationService';
import router from '@/router';

const menuStore = useMenuStore();
const items_config = menuStore.items_config

onMounted(() => {
  loadAllIoWires()
  loadAllProgramings()
  loadAllOps()
  validMenu()
  responsiveScreen()
})

const validMenu = () => {
  items_config.forEach((section) => {
    if (section.items.length == 1) {

      section.items.forEach(element => {
        if (element.label == "Produção") {

          router.push('/production')

        }
      });

    }
  })
}

const all_io_wires = ref([])
const all_programings_reports = ref([])
const all_ops = ref([])

const filters_io_wires = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
const filters_programing = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
const filters_ops = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });


const getSeverity = (status, screen) => {
  if (screen == 'programing') {
    switch (status.type_register) {
      case 'Criado':
        return 'success';
  
      case 'Removido':
        return 'danger';
  
      default:
        return null;
    }

  } else if (screen == 'io_wires') {
    switch (status.type_register) {
      case 'Entrada':
        return 'success';
  
      case 'Faturado':
        return 'warn';
  
      default:
        return null;
    }

  }

};

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const responsiveScreen = () => {
  screenHeight.value = calcHeight(windowHeight.value) + 'px'
};

const calcHeight = (height) => {
  return height - 285
}


// ------------------------------------------ Aba de Entradas e Saídas de fios.

const loadAllIoWires = async () => {
  await inputOutputOfWiresService.getAll().then((response) => {
    if (response.status == 200) {
      all_io_wires.value = response.data

      all_io_wires.value.forEach((ele) => {
        if (ele.type_register == 'input') {
          ele.type_register = 'Entrada';
        } else {
          ele.type_register = 'Faturado';
        }
      });

    }
  })
}

// ------------------------------------------ Aba de programações.

const loadAllProgramings = async () => {
  await programingReportsService.getAll().then((response) => {
    if (response.status == 200) {
      all_programings_reports.value = response.data

      all_programings_reports.value.forEach((ele) => {
        if (ele.type_register == 'create') {
          ele.type_register = 'Criado';
        } else {
          ele.type_register = 'Removido';
        }
      });

    }
  })
}

// ------------------------------------------ Aba de Ordens de Operação.

const loadAllOps = async () => {
  await orderOfOperationService.getAllClosed().then((response) => {
    if (response.status == 200) {
      all_ops.value = response.data

      all_ops.value.forEach((ele) => {
        ele.weight_per_piece = ele.weight_per_piece + ' kg'
        ele.total_weight = ele.total_weight + ' kg'

        if (ele.status == 'closed') {
          ele.status = 'Fechado';
        }

        if (ele.customer != null) {
          ele.customer = ele.customer.map(item => item.name).join(', ');
        }

        if (ele.article != null) {
          ele.article = ele.article.map(item => item.name).join(', ');
        }
      })
    }
  })
}

</script>

<style module>
  .container {
    display: flex;
    margin-top: 4.5rem;
    height: 100vh;
  }

  .sidebar {
    margin-top: 1rem;
    width: 260px;
    background-color: #f5f5f5;
  }

  .mainContent {
    border-radius: 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
  }

  .box_reports {
    display: flex;
  }
</style>
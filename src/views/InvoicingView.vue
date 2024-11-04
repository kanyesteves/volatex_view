<template>
  <div class="invoicing">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <Card :class="$style.mainContent" class="card">
        <template #content>
          <Tabs value="0">
            <TabList>
                <Tab value="0">Faturar Ordem de Operação</Tab>
                <Tab value="1">Ralatório de faturamentos</Tab>
            </TabList>
            <TabPanels>

              <TabPanel value="0">
                <div :class="$style.box_invoiced">
                  <InputGroup :style="{ 'max-width': '350px' }">
                    <InputGroupAddon>
                      <i class="pi pi-stopwatch"></i>
                    </InputGroupAddon>
                    <Select v-model="op" :options="ops" optionLabel="code" v-on:change="getProductionByOp(op)" filter placeholder="Ordens de Operação" class="w-full md:w-80" />
                  </InputGroup>
                  <Button :disabled="records_for_invoice.length < 1" :style="{ 'margin-left': '2rem' }" type="button" @click="calcRecords()" label="Faturar peças" severity="success"></Button>
                </div>
                <Divider />

                <Message v-if="!productions">Selecione uma <b>Orderm de Operação</b></Message>

                <DataTable v-else
                  stripedRows scrollable
                  paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
                  v-model:selection="recordSelected"
                  :scroll-height="screenHeight"
                  :value="productions"
                  :metaKeySelection="false"
                  @rowSelect="onRowSelect"
                  @rowUnselect="onRowUnSelect"
                  dataKey="id"
                  tableStyle="min-width: 50rem">

                  <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                  <Column field="code_per_piece" header="Código"></Column>
                  <Column field="invoiced" header="Faturado">
                    <template #body="slotProps">
                      <Tag :value="slotProps.data.invoiced" :severity="getSeverity(slotProps.data)" />
                    </template>
                  </Column>
                  <Column field="date" header="Data"></Column>
                  <Column field="weight" header="Peso"></Column>
                  <Column field="op" header="Ordem de Operação"></Column>
                  <Column field="tear" header="Tear"></Column>
                  <Column field="operator" header="Operador"></Column>

                </DataTable>
              </TabPanel>


              <TabPanel value="1">
                <div :class="$style.box_invoiced">
                  <Button :disabled="invoicing_view.length != 1" type="button" @click="getInvoicing()" label="Visualizar faturamento" severity="success"></Button>
                </div>
                <Divider />

                <Message v-if="all_invoicings.length == 0" severity="warn">Nenhum faturamento foi registrado.</Message>

                <DataTable v-else
                  stripedRows scrollable
                  paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
                  v-model:selection="invoicingSelected"
                  :scroll-height="screenHeight"
                  :value="all_invoicings"
                  :metaKeySelection="false"
                  @rowSelect="onRowInvoicingSelect"
                  @rowUnselect="onRowInvoicingUnSelect"
                  dataKey="id"
                  tableStyle="min-width: 50rem">

                  <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                  <Column field="customer" header="Cliente"></Column>
                  <Column field="article" header="Artigo"></Column>
                  <Column field="op" header="Ordem de Operação"></Column>
                  <Column field="total_weight" header="Peso total"></Column>
                  <Column field="date" header="Data"></Column>

                </DataTable>
              </TabPanel>

            </TabPanels>
          </Tabs>
        </template>
      </Card>
    </div>

    <SaveInvoicing 
      v-model="visible"
      :op="op"
      :total_weight="total_weight"
      :weight_per_porcentage="weight_per_porcentage"
      :records_for_invoice="records_for_invoice" />

    <LookInvoicing
      v-model="visible_record"
      :date="invoicing_view.date"
      :op="invoicing_view.op"
      :customer="invoicing_view.customer"
      :article="invoicing_view.article"
      :total_weight="invoicing_view.total_weight"
      :weight_per_wire="invoicing_view.weight_per_wire"
      :records="invoicing_view.records" />

  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { debounce } from 'lodash'
import Tab from 'primevue/tab';
import Tag from 'primevue/tag';
import Tabs from 'primevue/tabs';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Column from 'primevue/column';
import Select from 'primevue/select';
import TabList from 'primevue/tablist';
import Message from 'primevue/message';
import Divider from 'primevue/divider';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import DataTable from 'primevue/datatable';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import productionService from '@/system/services/productionService';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import orderOfOperationService from '@/system/services/orderOfOperationService';
import invoicingService from '@/system/services/invoicingService';
import SaveInvoicing from '@/system/pages/invoicing/SaveInvoicing.vue'
import LookInvoicing from '@/system/pages/invoicing/LookInvoicing.vue'
import { useMenuStore } from '@/global/storages/authStorage';
import router from '@/router';

const menuStore = useMenuStore();
const items_config = menuStore.items_config

onMounted(() => {
  getAllOps()
  loadAllInvoicings();
  responsiveScreen();
  validMenu();
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

const visible = ref(false)
const visible_record = ref(false)
const op = ref()
const ops = ref([])
const all_invoicings = ref([])
const productions = ref()
const recordSelected = ref()
const invoicingSelected = ref()
const records_for_invoice = ref([])
const invoicing_view = ref([])

const getAllOps = debounce(async () => {
  await orderOfOperationService.getAllOpenAndInProgress().then((response) => {
    if (response.status == 200) {
      ops.value = response.data
    }
  })
})

const getProductionByOp = debounce(async (op) => {
  records_for_invoice.value = []
  recordSelected.value = []

  await productionService.getAllRecordsByOp(op.code).then((response) => {
    if (response.status == 200) {
      productions.value = response.data

      productions.value.forEach((element) => {
        if (element.invoiced == false)
          element.invoiced = "Não";
        else
          element.invoiced = "Sim";

      })
    }
  })
})

const total_weight = ref(0)
const weight_per_porcentage = ref([])

const calcRecords = () => {
  visible.value = true
  const totalWeight = total_weight.value;

  weight_per_porcentage.value = op.value.wire_porcentage.map(({ name, value }) => ({
    name,
    value,
    weight: ((value / 100) * totalWeight).toFixed(2)
  }));

}

const onRowSelect = (event) => {
  total_weight.value += event.data.weight

  if (event.data.invoiced == 'Não')
    records_for_invoice.value.push(event.data)

};

const onRowUnSelect = (event) => {
  const index = records_for_invoice.value.findIndex(item => item === event.data);

  if (index !== -1) {
    records_for_invoice.value.splice(index, 1);
    total_weight.value -= event.data.weight
  }
};

const getSeverity = (status) => {
  switch (status.invoiced) {
    case 'Sim':
      return 'success';

    case 'Não':
      return 'warn';

    default:
      return null;
  }
};

// ------------------------------------------

const onRowInvoicingSelect = (event) => {
  if (!Array.isArray(invoicing_view.value)) {
    invoicing_view.value = [];
  }

  invoicing_view.value.push(event.data)
}

const onRowInvoicingUnSelect = (event) => {
  if (Array.isArray(invoicing_view.value)) {
    let index = invoicing_view.value.findIndex(item => item === event.data);
    invoicing_view.value.splice(index, 1)
  }
}

const loadAllInvoicings = async () => {
  await invoicingService.getAll().then((response) => {
    if (response.status == 200) {
      all_invoicings.value = response.data
    }
  })
}

const getInvoicing = async () => {
  visible_record.value = true
  if (Array.isArray(invoicing_view.value) && invoicing_view.value.length > 0) {
    await invoicingService.get(invoicing_view.value[0].id).then((response) => {
      if (response.status === 200) {
        invoicing_view.value = response.data;
      }
    });
  }
}

// ------------------------------------------

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const responsiveScreen = () => {
  if (windowHeight.value <= 820) {
    screenHeight.value = "425px"
  }
};

</script>

<style module>
.container {
  display: flex;
  /* height: 100vh; */
}

.sidebar {
  margin-top: 1rem;
  width: 260px;
  background-color: #f5f5f5;
}

.mainContent {
  margin-top: 1rem;
  flex-grow: 1;
  margin-left: 10px;
}

.box_invoiced {
  display: flex;
}
</style>
<template>
  <div class="invoicing">
    <GlobalToolbar />

    <Card :class="$style.cardbox">
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
                <Button :disabled="records_for_invoice.length < 1" :style="{ 'margin-left': '2rem' }" type="button" @click="visible = true" label="Faturar peças"></Button>
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
              <Message severity="warn">Nenhum faturamento foi registrado.</Message>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </template>
    </Card>

    <SaveInvoicing 
      v-model="visible"
      :op="op"
      :records_for_invoice="records_for_invoice" />

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
import orderOfOperationService from '@/system/services/orderOfOperationService';
import SaveInvoicing from '@/system/pages/invoicing/SaveInvoicing.vue'

onMounted(() => {
  getAllOps()
  responsiveScreen();
})

const visible = ref(false)
const op = ref()
const ops = ref([])
const productions = ref()
const recordSelected = ref()
const records_for_invoice = ref([])

const getAllOps = debounce(async () => {
  await orderOfOperationService.getAllOpenAndInProgress().then((response) => {
    if (response.status == 200) {
      ops.value = response.data
    }
  })
})

const getProductionByOp = debounce(async (op) => {
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

const onRowSelect = (event) => {
  records_for_invoice.value.push(event.data)
};

const onRowUnSelect = (event) => {
  const index = records_for_invoice.value.findIndex(item => item === event.data);

  if (index !== -1) {
    records_for_invoice.value.splice(index, 1);
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

const windowHeight = ref(window.innerHeight);
const screenHeight = ref()
const responsiveScreen = () => {
  if (windowHeight.value <= 820) {
    screenHeight.value = "425px"
  }
};

</script>

<style module>
.cardbox {
  margin-top: 1rem;
}
.box_invoiced {
  display: flex;
}
</style>
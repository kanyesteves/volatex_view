<template>
  <div class="invoicing">
    <GlobalToolbar />

    <Card :class="$style.cardbox">
      <template #content>
        <Tabs value="0">
          <TabList>
              <Tab value="0">Faturar OP</Tab>
              <Tab value="1">Ralatório de faturamentos</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <InputGroup :style="{ 'max-width': '350px' }">
                <InputGroupAddon>
                  <i class="pi pi-stopwatch"></i>
                </InputGroupAddon>
                <Select v-model="op" :options="ops" optionLabel="code" filter placeholder="Ordens de Operação" class="w-full md:w-80" />
              </InputGroup>
              <Divider />
              <p class="m-0">
                Tabela para efetuar o faturamento das OPs
              </p>
            </TabPanel>
            <TabPanel value="1">
              <p class="m-0">
                Tabela para salvar todos os faturamentos registrados
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { debounce } from 'lodash'
import Tab from 'primevue/tab';
import Tabs from 'primevue/tabs';
import Card from 'primevue/card';
import Select from 'primevue/select';
import TabList from 'primevue/tablist';
import Divider from 'primevue/divider';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import orderOfOperationService from '@/system/services/orderOfOperationService';

onMounted(() => {
  getAllOps()
})

const op = ref()
const ops = ref([])
const getAllOps = debounce(async () => {
  await orderOfOperationService.getAllOpenAndInProgress().then((response) => {
    if (response.status == 200) {
      ops.value = response.data
    }
  })
})

</script>

<style module>
.cardbox {
  margin-top: 1rem;
}
</style>
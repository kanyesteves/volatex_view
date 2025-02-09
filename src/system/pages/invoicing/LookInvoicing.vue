<template>
  <Dialog v-model:visible="visible" modal header="Visualizar faturamento" :style="{ width: '60rem' }">

    <DataTable :value="props.records" scrollable scrollHeight="14.8rem" showGridlines tableStyle="min-width: 50rem">
      <Column field="code_per_piece" header="Código"></Column>
      <Column field="date" header="Data"></Column>
      <Column field="weight" header="Peso"></Column>
      <Column field="op" header="Ordem de Operação"></Column>
      <Column field="tear" header="Tear"></Column>
      <Column field="operator" header="Operador"></Column>
    </DataTable>

    <Divider />

    <div :class="$style.infos_of_op">
      <div>
        <InputGroup :class="$style.div_info" :style="{ 'max-width': '180px' }">
          <InputGroupAddon>Cliente</InputGroupAddon>
          <InputText v-model="customer" disabled />
        </InputGroup>

        <InputGroup :class="$style.div_info" :style="{ 'max-width': '180px' }">
          <InputGroupAddon>OP/OT</InputGroupAddon>
          <InputText v-model="op" disabled />
        </InputGroup>
    
        <InputGroup :class="$style.div_info" :style="{ 'max-width': '180px' }">
          <InputGroupAddon>Volumes</InputGroupAddon>
          <InputText v-model="volume" disabled />
        </InputGroup>
      </div>
      
      <div :class="$style.div_porcentage">
        <InputGroup :class="$style.div_info" :style="{ 'max-width': '180px' }">
          <InputGroupAddon>Artigo</InputGroupAddon>
          <InputText v-model="article" disabled />
        </InputGroup>

        <InputGroup :class="$style.div_info" :style="{ 'max-width': '200px' }">
          <InputGroupAddon>Peso total</InputGroupAddon>
          <InputText v-model="total_weight" disabled />
          <InputGroupAddon>Kg</InputGroupAddon>
        </InputGroup>
      </div>

    </div>
    <Divider />

    <DataTable :value="weight_per_wire" showGridlines tableStyle="min-width: 50rem">
      <Column field="name" header="Nome"></Column>
      <Column field="value" header="Porcentagem"></Column>
      <Column field="weight" header="Peso"></Column>
    </DataTable>


    <div :class="$style.space_bottons">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, defineModel, defineProps, watch } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Column from 'primevue/column';
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

const visible = defineModel()
const props = defineProps([
  'customer',
  'article',
  'date',
  'op',
  'volume',
  'records',
  'total_weight',
  'weight_per_wire'
])

const date = ref('')
watch(() => props.date, (newValue) => {
  date.value = newValue
})

const op = ref('')
watch(() => props.op, (newValue) => {
  op.value = newValue
})

const customer = ref('')
watch(() => props.customer, (newValue) => {
  customer.value = newValue
})

const article = ref('')
watch(() => props.article, (newValue) => {
  article.value = newValue
})

const records_for_invoice = ref(props.records_for_invoice)
watch(() => props.records, (newValue) => {
  records_for_invoice.value = newValue
})

const volume = ref(props.count)
watch(() => props.volume, (newValue) => {
  volume.value = newValue
})

const total_weight = ref(props.total_weight)
watch(() => props.total_weight, (newValue) => {
  total_weight.value = newValue
})

const weight_per_wire = ref(props.weight_per_wire)
watch(() => props.weight_per_wire, (newValue) => {
  weight_per_wire.value = newValue
})

</script>

<style module>
  .div_porcentage {
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
  }
  .div_info {
    margin-top: 1rem;
  }
  .infos_of_op {
    display: flex;
  }
  .space_bottons {
    display: flex;
    justify-content: end;
    margin-top: 1.5rem;
  }
</style>
<template>
  <Dialog v-model:visible="visible" modal header="Revisão do faturamento" :style="{ width: '60rem' }">

    <DataTable :value="records_for_invoice" showGridlines tableStyle="min-width: 50rem">
      <Column field="code_per_piece" header="Código"></Column>
      <Column field="invoiced" header="Faturado"></Column>
      <Column field="date" header="Data"></Column>
      <Column field="weight" header="Peso"></Column>
      <Column field="op" header="Ordem de Operação"></Column>
      <Column field="tear" header="Tear"></Column>
      <Column field="operator" header="Operador"></Column>
    </DataTable>

    <Divider />

    <div :class="$style.infos_of_op">
      <div>
        <InputGroup :style="{ 'max-width': '180px' }">
          <InputGroupAddon>Cliente</InputGroupAddon>
          <InputText v-model="customer" disabled />
        </InputGroup>

        <InputGroup :style="{ 'max-width': '230px' }">
          <InputGroupAddon>Ordem de Operação</InputGroupAddon>
          <InputText v-model="op.code" disabled />
        </InputGroup>
    
        <InputGroup :style="{ 'max-width': '180px' }">
          <InputGroupAddon>Artigo</InputGroupAddon>
          <InputText v-model="article" disabled />
        </InputGroup>

        <InputGroup :style="{ 'max-width': '180px' }">
          <InputGroupAddon>Peso total</InputGroupAddon>
          <InputText v-model="total_weight" disabled />
        </InputGroup>
      </div>
  
      <div v-for="porcentage of porcentage_wire" :key="porcentage.name">
        <InputGroup :style="{ 'max-width': '230px' }">
          <InputGroupAddon>{{ porcentage.name }}</InputGroupAddon>
          <InputText v-model="customer" disabled />
          <InputGroupAddon>{{ porcentage.value + '%' }}</InputGroupAddon>
        </InputGroup>
      </div>
    </div>


    <div :class="$style.space_bottons">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
      <Button :style="{ 'margin-left': '1rem' }" type="button" label="Faturar e Exportar" @click="onSaveInvoincing"></Button>
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
  'op', 
  'records_for_invoice'
])
const op = ref(props.op)
const customer = ref('')
const article = ref('')
const porcentage_wire = ref([])
const total_weight = ref(0.0)


watch(() => props.op, (newValue) => {
  op.value = newValue

  customer.value = op.value.customer.map(item => item.name).join(', ')
  article.value = op.value.article.map(item => item.name).join(', ')
  porcentage_wire.value = op.value.wire_porcentage
})

const records_for_invoice = ref(props.records_for_invoice)
watch(() => props.records_for_invoice, (newValue) => {
  records_for_invoice.value = newValue
})

const getValuesOfProduction = (records) => {
  console.log(records)
}

const onSaveInvoincing = () => {
  console.log('Exportando...')
}

</script>

<style module>
  .infos_of_op {
    display: flex;
  }
  .space_bottons {
    display: flex;
    justify-content: end;
    margin-top: 1.5rem;
  }
</style>
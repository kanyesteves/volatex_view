<template>
  <Dialog v-model:visible="visible" modal header="Revisão do faturamento" :style="{ width: '60rem' }">

    <h3></h3>

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

    <h3>Informações da Ordem de operação</h3>
    <div :class="$style.infos_of_op">
      <label><b>Cliente:</b> {{ customer }}</label>
      <label><b>Artigo:</b> {{ article }}</label>
      <div v-for="wire of porcentage_wire" :key="wire.name">
        <!-- <label><b>Fio:</b> {{ wire.name }}</label>
        <label><b>Kg/Porcentagem:</b> {{ wire.por }}</label> -->
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

const visible = defineModel()
const props = defineProps(['op', 'records_for_invoice'])

const op = ref(props.op)
const customer = ref('')
const article = ref('')
const porcentage_wire = ref([])

watch(() => props.op, (newValue) => {
  op.value = newValue

  console.log(op.value.porcentage_wire)
  customer.value = op.value.customer.map(item => item.name).join(', ')
  article.value = op.value.article.map(item => item.name).join(', ')
  porcentage_wire.value = op.value.porcentage_wire
})

const records_for_invoice = ref(props.records_for_invoice)
watch(() => props.records_for_invoice, (newValue) => {
  records_for_invoice.value = newValue
})

const onSaveInvoincing = () => {
  console.log('Exportando...')
}

</script>

<style module>
  .infos_of_op {
    display: flex;
    flex-direction: column;
  }
  .space_bottons {
    display: flex;
    justify-content: end;
    margin-top: 1.5rem;
  }
</style>
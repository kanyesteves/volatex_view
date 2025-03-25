<template>
  <Dialog v-model:visible="visible" modal header="Revisão do faturamento" :style="{ width: '60rem' }">

    <DataTable :value="records_for_invoice" scrollable scrollHeight="14.8rem" showGridlines tableStyle="min-width: 50rem">
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
          <InputText v-model="op.code" disabled />
        </InputGroup>

        <InputGroup :class="$style.div_info" :style="{ 'max-width': '180px' }">
          <InputGroupAddon>Volumes</InputGroupAddon>
          <InputText v-model="count_registers" disabled />
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

        <InputGroup :class="$style.div_info" :style="{ 'max-width': '200px' }">
          <InputGroupAddon>Peso adicional</InputGroupAddon>
          <InputText v-model="weight_additional" @input="formatWeight(weight_additional)"/>
          <InputGroupAddon>Kg</InputGroupAddon>
        </InputGroup>
      </div>

    </div>
    <Divider />

    <DataTable :value="weight_per_porcentage" showGridlines tableStyle="min-width: 50rem">
      <Column field="name" header="Nome"></Column>
      <Column field="value" header="Porcentagem"></Column>
      <Column field="weight" header="Peso"></Column>
    </DataTable>


    <div :class="$style.space_bottons">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
      <Button :style="{ 'margin-left': '1rem' }" type="button" label="Faturar" severity="success" @click="onSaveInvoincing"></Button>
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
import invoicingService from '@/system/services/invoicingService';
import type Form from '@/system/type/invoicingType'

const form = ref<Form>({})
const visible = defineModel()
const props = defineProps([
  'op',
  'count',
  'records_for_invoice',
  'total_weight',
  'weight_per_porcentage'
])
const op = ref(props.op)
const customer = ref('')
const article = ref('')

watch(() => props.op, (newValue) => {
  op.value = newValue

  customer.value = op.value.customer.map(item => item.name).join(', ')
  article.value = op.value.article.map(item => item.name).join(', ')
})

const records_for_invoice = ref(props.records_for_invoice)
watch(() => props.records_for_invoice, (newValue) => {
  records_for_invoice.value = newValue
})

const count_registers = ref(props.count)
watch(() => props.count, (newValue) => {
  count_registers.value = newValue
})

const weight_additional = ref(0)
const total_weight = ref(props.total_weight)
watch(() => props.total_weight, (newValue) => {
  total_weight.value = newValue.toFixed(2)
})

const weight_per_porcentage = ref(props.weight_per_porcentage)
watch(() => props.weight_per_porcentage, (newValue) => {
  weight_per_porcentage.value = newValue
})


const onSaveInvoincing = async () => {
  formatValues()
  exportPDF(form.value)

  await invoicingService.save(form.value).then(async (response) => {

    if (response.status === 201) {
      visible.value = false
      location.reload()
    }
  })
}

const exportPDF = async (data) => {
  try {
    const response = await invoicingService.generatePDF(form.value, {
      responseType: 'blob'
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'faturamento.pdf');

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Exportado');
    }
  } catch (error) {
    console.error('Erro ao exportar PDF', error);
  }
}

const formatValues = () => {
  form.value.volume = count_registers.value
  form.value.records = records_for_invoice.value
  form.value.weight_per_wire = weight_per_porcentage.value
  form.value.total_weight = parseFloat(total_weight.value) + parseInt(weight_additional.value)
  form.value.customer = customer.value
  form.value.article = article.value
  form.value.op = op.value.code
}

const formatWeight = (value) => {
  if (!value)
    value = 0

  const total = parseFloat(total_weight.value) + parseInt(value)

  weight_per_porcentage.value.forEach(element => {

    element.weight = ((element.value / 100) * total).toFixed(2)

  });
}

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
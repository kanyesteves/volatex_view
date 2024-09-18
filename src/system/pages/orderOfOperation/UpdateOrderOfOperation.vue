<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Editar Ordem de Operação" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup :style="{ 'max-width': '430px'  }">
            <InputGroupAddon>
                <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText placeholder="Código" id="code" :disabled="checkStatus()" v-model="form.code" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.div_box_2" class="flex items-center">
          <InputGroup :style="{ 'max-width': '210px'}">
            <InputGroupAddon>
                <i class="pi pi-address-book"></i>
            </InputGroupAddon>
            <Select v-model="customer_has_op" :options="props.customers" :disabled="checkStatus()" optionLabel="name" filter placeholder="Cliente" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '210px'}">
            <InputGroupAddon>
                <i class="pi pi-thumbtack"></i>
            </InputGroupAddon>
            <Select v-model="article_has_op" :options="props.articles" :disabled="checkStatus()" optionLabel="name" filter placeholder="Artigo" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '210px' }">
            <InputGroupAddon>
                <i class="pi pi-sliders-h"></i>
            </InputGroupAddon>
            <MultiSelect v-model="wires_has_op" :options="props.wires" :disabled="checkStatus()" optionLabel="name" filter placeholder="Fios"
            :maxSelectedLabels="3" class="w-full md:w-80" />
          </InputGroup>
        </div>

        <div :class="$style.div_box_3" class="flex items-center">
          <InputGroup :style="{ 'max-width': '120px'}">
              <ToggleButton v-model="form.label_item" class="w-24" :disabled="checkStatus()" onLabel="Com etiqueta" offLabel="Sem etiqueta" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '145px'}">
            <InputNumber 
              placeholder="00" 
              id="totalPieces" 
              :disabled="checkStatus()"
              v-model="form.total_pieces"
              class="flex-auto" autocomplete="off" />
              <InputGroupAddon>
                <i>Peças</i>
              </InputGroupAddon>
          </InputGroup>

          <InputGroup :style="{ 'max-width': '145px'}">
            <InputNumber 
              placeholder="0.00" 
              id="weightPerPiece" 
              :disabled="checkStatus()"
              v-model="form.weight_per_piece" 
              :minFractionDigits="2" :maxFractionDigits="5"
              class="flex-auto" autocomplete="off" />
              <InputGroupAddon>
                <i>Kg/peça</i>
              </InputGroupAddon>
          </InputGroup>

          <InputGroup :style="{ 'max-width': '170px'}">
            <InputNumber 
              placeholder="0.00" 
              id="weightTotal" 
              :disabled="checkStatus()"
              v-model="form.total_weight" 
              :minFractionDigits="2" :maxFractionDigits="5"
              class="flex-auto" autocomplete="off" />
              <InputGroupAddon>
                <i>Kg/Total</i>
              </InputGroupAddon>
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button v-if="!checkStatus()" :style="{ 'margin-left': '1rem' }" type="button" label="Salvar" @click="onUpdateOP"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, watch, ref } from 'vue'
import Knob from 'primevue/knob';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import ToggleButton from 'primevue/togglebutton';
import InputGroupAddon from 'primevue/inputgroupaddon';
import orderOfOperationService from '@/system/services/orderOfOperationService';
import type Form from '@/system/type/orderOfOperationType'

const value = ref(1822)
const visible = defineModel()
const props = defineProps([
  'customers',
  'articles',
  'wires',
  'op',
  'customer_selected',
  'article_selected',
  'wires_selected'
])

const customer_has_op = ref(props.customer_selected)
watch(() => props.customer_selected, (newValue) => {
  customer_has_op.value = newValue
})

const article_has_op = ref(props.article_selected)
watch(() => props.article_selected, (newValue) => {
  article_has_op.value = newValue
})

const wires_has_op = ref(props.wires_selected)
watch(() => props.wires_selected, (newValue) => {
  wires_has_op.value = newValue
})

const form = ref<Form>(props.op)

const onUpdateOP = async () => {
  formatValuesForSaveRelations()

  await orderOfOperationService.save(form.value).then(async (response) => {

    if (response.status === 200) {
      visible.value = false
      location.reload()
    }

  }).catch(async (response) => {
    console.log(response.data)
  })

}

const checkStatus = () => {
  if (form.value.status == 'closed' || form.value.status == 'in_progress')
    return true
}

const formatValuesForSaveRelations = () => {
  form.value.customer = customer_has_op.value.id
  form.value.article = article_has_op.value.id
  form.value.wires = wires_has_op.value.map(item => item.id)
  form.value.label_item = (!form.value.label_item) ? false : form.value.label_item
}

</script>

<style module>

 .space_bottons {
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;
 }

 .div_box {
  display: flex;
  margin-top: 1rem;

  justify-content: space-between;
 }

 .div_box_2 {
  display: flex;
  margin-top: 1rem;

  max-width: 650px;
  justify-content: space-between;
 }

 .div_box_3 {
  display: flex;
  margin-top: 1rem;

  max-width: 600px;
  justify-content: space-between;
 }


</style>
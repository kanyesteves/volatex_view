<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Nova Ordem de Operação" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup :style="{ 'max-width': '430px'  }">
            <InputGroupAddon>
                <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText placeholder="Código" id="code" v-model="form.code" :invalid="code_empty" @change="removeError('code')" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '120px' }">
            <InputGroupAddon>
                <i class="pi pi-clipboard"></i>
            </InputGroupAddon>
            <InputText placeholder="NF" id="fiscal_note" v-model="form.fiscal_note" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.div_box_2" class="flex items-center">
          <InputGroup :style="{ 'max-width': '210px'}">
            <InputGroupAddon>
                <i class="pi pi-address-book"></i>
            </InputGroupAddon>
            <Select v-model="form.customer" :options="props.customers" :invalid="customers_empty" @change="removeError('customer')" optionLabel="name" filter placeholder="Cliente" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '210px'}">
            <InputGroupAddon>
                <i class="pi pi-thumbtack"></i>
            </InputGroupAddon>
            <Select v-model="form.article" :options="props.articles" :invalid="articles_empty" @change="removeError('article')" optionLabel="name" filter placeholder="Artigo" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '210px' }">
            <InputGroupAddon>
                <i class="pi pi-sliders-h"></i>
            </InputGroupAddon>
            <MultiSelect v-model="form.wires" :options="props.wires" :invalid="wires_empty" optionLabel="name" filter placeholder="Fios"
            :maxSelectedLabels="3" @change="[updatePorcentage(form.wires), removeError('wires')]" class="w-full md:w-80" />
          </InputGroup>
        </div>

        <div :class="$style.div_box_3" class="flex items-center">
          <InputGroup :style="{ 'max-width': '120px'}">
              <ToggleButton v-model="form.label_item" class="w-24" onLabel="Com etiqueta" offLabel="Sem etiqueta" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '145px'}">
            <InputNumber 
              placeholder="00" 
              :invalid="total_pieces_empty" @change="removeError('total_pieces')"
              id="totalPieces" 
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
              :invalid="weight_per_piece_empty" @change="removeError('weight_per_piece')" 
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
              :invalid="total_weight_empty" @change="removeError('total_weight')"
              v-model="form.total_weight" 
              :minFractionDigits="1" :maxFractionDigits="5"
              class="flex-auto" autocomplete="off" />
              <InputGroupAddon>
                <i>Kg/Total</i>
              </InputGroupAddon>
          </InputGroup>
        </div>

        <Fieldset legend="Porcentagem de cada fio">
          <div :class="$style.div_box_porcentages">
            <InputGroup :style="{ 'max-width': '200px' }" v-for="porcentage of porcentages" :key="porcentage.name">
              <InputGroupAddon>{{ porcentage.name }}</InputGroupAddon>
              <InputNumber 
                id="porcentage" 
                v-model="porcentage.value"
                :minFractionDigits="2" :maxFractionDigits="5"
                class="flex-auto" autocomplete="off" />
            </InputGroup>
          </div>
        </Fieldset>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Criar" severity="success" @click="onSaveOP"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, ref } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import ToggleButton from 'primevue/togglebutton';
import InputGroupAddon from 'primevue/inputgroupaddon';
import orderOfOperationService from '@/system/services/orderOfOperationService';
import type Form from '@/system/type/orderOfOperationType'
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const visible = defineModel()
const props = defineProps(['customers', 'articles', 'wires'])
const code_empty = ref(false)
const customers_empty = ref(false)
const articles_empty = ref(false)
const wires_empty = ref(false)
const total_pieces_empty = ref(false)
const total_weight_empty = ref(false)
const weight_per_piece_empty = ref(false)
const form = ref<Form>({})
const use_refresh_table = useRefreshTable()

const onSaveOP = async () => {
  formatValuesForSaveRelations()

  await orderOfOperationService.save(form.value).then(async (response) => {

    if (response.status === 201) {
      visible.value = false
      use_refresh_table.setRefresh(true)
    }
  }).catch((error) => {
    console.log(error)
    error.response.data.detail.forEach(element => {
      formValid(element.loc)
    });
  })

}

const formatValuesForSaveRelations = () => {
  form.value.customer = form.value.customer.id
  form.value.article = form.value.article.id
  form.value.wires = form.value.wires.map(item => item.id)
  form.value.wire_porcentage = porcentages.value
}

const porcentages = ref([])

const updatePorcentage = (event) => {

  if (porcentages.value == 0) {

    event.forEach(element => {
      porcentages.value.push({
        "name": element.name,
        "value": (100 / event.length).toFixed(2)
      })
    });

  } else {

    porcentages.value = []
    event.forEach(element => {
      porcentages.value.push({
        "name": element.name,
        "value": (100 / event.length).toFixed(2)
      })
    });

  }
}

const removeError = (field) => {
  if (field == 'code')
    code_empty.value = false
  else if (field == 'customer')
    customers_empty.value = false
  else if (field == 'article')
    articles_empty.value = false
  else if (field == 'wires')
    wires_empty.value = false
  else if (field == 'total_weight')
    total_weight_empty.value = false
  else if (field == 'weight_per_piece')
    weight_per_piece_empty.value = false
  else if (field == 'total_pieces')
    total_pieces_empty.value = false
}

const formValid = (loc) => {
  let field = loc[1]
  switch (field) {
    case 'code':
      code_empty.value = true
      break
    case 'customer':
      customers_empty.value = true
      break
    case 'article':
      articles_empty.value = true
      break
    case 'wires':
      wires_empty.value = true
      break
    case 'total_weight':
      total_weight_empty.value = true
      break
    case 'weight_per_piece':
      weight_per_piece_empty.value = true
      break
    case 'total_pieces':
      total_pieces_empty.value = true
      break
    default:
      break
  }
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

  max-width: 560px;
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
 .div_box_porcentages {
  display: flex !important;
  justify-content: space-around;
  align-items: center !important;
 }
</style>
<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Nova Ordem de Operação" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup :style="{ 'max-width': '430px'  }">
            <InputGroupAddon>
                <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText placeholder="Código" id="code" v-model="form.code" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.div_box_2" class="flex items-center">
          <InputGroup :style="{ 'max-width': '210px'}">
            <InputGroupAddon>
                <i class="pi pi-address-book"></i>
            </InputGroupAddon>
            <Select v-model="form.customer" :options="props.customers" optionLabel="name" filter placeholder="Cliente" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '210px'}">
            <InputGroupAddon>
                <i class="pi pi-thumbtack"></i>
            </InputGroupAddon>
            <Select v-model="form.article" :options="props.articles" optionLabel="name" filter placeholder="Artigo" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '210px' }">
            <InputGroupAddon>
                <i class="pi pi-sliders-h"></i>
            </InputGroupAddon>
            <MultiSelect v-model="form.wires" :options="props.wires" optionLabel="name" filter placeholder="Fios"
            :maxSelectedLabels="3" @change="updatePorcentage(form.wires)" class="w-full md:w-80" />
          </InputGroup>
        </div>

        <div :class="$style.div_box_3" class="flex items-center">
          <InputGroup :style="{ 'max-width': '120px'}">
              <ToggleButton v-model="form.label_item" class="w-24" onLabel="Com etiqueta" offLabel="Sem etiqueta" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '145px'}">
            <InputNumber 
              placeholder="00" 
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

const visible = defineModel()
const props = defineProps(['customers', 'articles', 'wires'])

const form = ref<Form>({})

const onSaveOP = async () => {
  formatValuesForSaveRelations()

  await orderOfOperationService.save(form.value).then(async (response) => {

    if (response.status === 201) {
      visible.value = false
      location.reload()
    }
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
 .div_box_porcentages {
  display: flex !important;
  justify-content: space-around;
  align-items: center !important;
 }
</style>
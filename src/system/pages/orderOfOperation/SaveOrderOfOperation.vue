<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Nova Ordem de Operação" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup :style="{ 'max-width': '550px'  }">
            <InputGroupAddon>
                <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText placeholder="Código" id="code" v-model="form.code" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.div_box_2" class="flex items-center">
          <InputGroup :style="{ 'max-width': '320px'}">
            <InputGroupAddon>
                <i class="pi pi-thumbtack"></i>
            </InputGroupAddon>
            <Select v-model="form.article" :options="props.articles" optionLabel="name" filter placeholder="Artigo" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '310px' }">
            <InputGroupAddon>
                <i class="pi pi-sliders-h"></i>
            </InputGroupAddon>
            <MultiSelect v-model="form.wires" :options="props.wires" optionLabel="name" filter placeholder="Fios"
            :maxSelectedLabels="3" class="w-full md:w-80" />
          </InputGroup>
        </div>

        <div :class="$style.div_box_3" class="flex items-center">
          <InputGroup :style="{ 'max-width': '230px'}">
            <InputNumber 
              placeholder="Peso por peça" 
              id="weightPerPiece" 
              v-model="form.weight_per_piece" 
              :minFractionDigits="2" :maxFractionDigits="5"
              class="flex-auto" autocomplete="off" />
              <InputGroupAddon>
                <i>Kg/peça</i>
              </InputGroupAddon>
          </InputGroup>

          <InputGroup :style="{ 'max-width': '230px'}">
            <InputNumber 
              placeholder="Peso Total" 
              id="weightTotal" 
              v-model="form.total_weight" 
              :minFractionDigits="2" :maxFractionDigits="5"
              class="flex-auto" autocomplete="off" />
              <InputGroupAddon>
                <i>Kg/Total</i>
              </InputGroupAddon>
          </InputGroup>
        </div>

        <h3 :style="{ 'margin-top': '2rem'}">Porcetagem de cada Fio</h3>
        <Divider />

        <div :class="$style.div_box_4" v-for="wire of form.wires" :key="wire.id" @input="teste">
          <InputGroup>
            <span>{{ wire.name }}</span>
          </InputGroup>

          <InputGroup>
            <InputNumber :style="{ 'max-width': '200px'}" v-model="wire.percentage" inputId="percent" fluid />
            <InputGroupAddon>
              <i class="pi pi-percentage"></i>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Criar" @click="onSaveOP"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, ref } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import orderOfOperationService from '@/system/services/orderOfOperationService';
import type Form from '@/system/type/orderOfOperationType'

const visible = defineModel()
const props = defineProps(['articles', 'wires'])

const form = ref<Form>({})

const onSaveOP = async () => {

  console.log(form.value)
  // await orderOfOperationService.save(form.value).then(async (response) => {

  //   if (response.status === 201) {
  //     visible.value = false
  //     location.reload()
  //   }
  // })

}

const teste = () => {
  console.log('teste')
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

  max-width: 500px;
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

  max-width: 500px;
  justify-content: space-between;
 }

 .div_box_4 {
  display: flex;
  margin-top: 1rem;

  max-width: 300px;
  align-items: center;
  justify-content: space-between;
 }

</style>
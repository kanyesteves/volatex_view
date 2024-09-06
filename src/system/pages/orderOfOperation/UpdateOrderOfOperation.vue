<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Editar Ordem de Operação" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup :style="{ 'max-width': '320px'  }">
            <InputGroupAddon>
                <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText placeholder="Código" id="code" :disabled="form.status == 'closed'" v-model="form.code" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '140px'  }">
            <Message v-if="form.status == 'open'" severity="success">Aberto</Message>
            <Message v-if="form.status == 'in_progress'" severity="warn">Em Andamento</Message>
            <Message v-if="form.status == 'closed'" severity="error">Fechado</Message>
          </InputGroup>
        </div>

        <div :class="$style.div_box_2" class="flex items-center">
          <InputGroup :style="{ 'max-width': '210px'}">
            <InputGroupAddon>
                <i class="pi pi-address-book"></i>
            </InputGroupAddon>
            <Select v-model="form.customer" :options="props.customers" optionLabel="name" filter placeholder="Cliente" @change="setArticles" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '210px'}">
            <InputGroupAddon>
                <i class="pi pi-thumbtack"></i>
            </InputGroupAddon>
            <Select v-model="form.article" :options="articles" optionLabel="name" filter placeholder="Artigo" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '210px' }">
            <InputGroupAddon>
                <i class="pi pi-sliders-h"></i>
            </InputGroupAddon>
            <MultiSelect v-model="form.wires" :options="props.wires" :disabled="form.status == 'closed'" @change="calcPercentage" optionLabel="name" filter placeholder="Fios"
            :maxSelectedLabels="3" class="w-full md:w-80" />
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
              :disabled="form.status == 'closed'"
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
              :disabled="form.status == 'closed'"
              v-model="form.weight_per_piece" 
              :minFractionDigits="2" :maxFractionDigits="5"
              class="flex-auto" autocomplete="off" />
              <InputGroupAddon>
                <i>Kg/peça</i>
              </InputGroupAddon>
          </InputGroup>

          <InputGroup :style="{ 'max-width': '160px'}">
            <InputNumber 
              placeholder="0.00" 
              id="weightTotal" 
              :disabled="form.status == 'closed'"
              v-model="form.total_weight" 
              :minFractionDigits="2" :maxFractionDigits="5"
              class="flex-auto" autocomplete="off" />
              <InputGroupAddon>
                <i>Kg/Total</i>
              </InputGroupAddon>
          </InputGroup>
        </div>

        <h3 :style="{ 'margin-top': '2rem'}">Porcentagem por Fio</h3>
        <Divider />

        <div :class="$style.div_box_4" v-for="wire of form.wires" :key="wire.id">
          <InputGroup>
            <span>{{ wire.name }}</span>
          </InputGroup>

          <InputGroup>
            <InputNumber 
              :style="{ 'max-width': '200px'}"
              :disabled="form.status == 'closed'"
              v-model="wire.percentage"
              inputId="percent" fluid />
            <InputGroupAddon>
              <i class="pi pi-percentage"></i>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Salvar" @click="onUpdateOP"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, watch, ref } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import ToggleButton from 'primevue/togglebutton';
import Message from 'primevue/message';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import orderOfOperationService from '@/system/services/orderOfOperationService';
import type Form from '@/system/type/orderOfOperationType'

const visible = defineModel()
const props = defineProps(['customers', 'articles', 'wires', 'op'])

const articles = ref(props.articles)
const form = ref<Form>(props.op)

const onUpdateOP = async () => {

  await orderOfOperationService.save(form.value).then(async (response) => {

    if (response.status === 200) {
      visible.value = false
      location.reload()
    }
  })

}

watch(() => props.articles, (newValue) => {
  articles.value = newValue
})

const setArticles = (event) => {
  articles.value = event.value.article
}

const calcPercentage = (event) => {
  event.value.forEach(element => {
    element.percentage = 100 / event.value.length;
  });
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

  /* max-width: 470px; */
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

 .div_box_4 {
  display: flex;
  margin-top: 1rem;

  max-width: 300px;
  align-items: center;
  justify-content: space-between;
 }

</style>
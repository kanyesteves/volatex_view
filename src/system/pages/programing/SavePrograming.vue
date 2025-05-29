<template>
  <div class="card">
    <div class="card flex justify-center">

      <Dialog v-model:visible="visible" modal header="Nova programação" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup :style="{ 'max-width': '330px' }">
            <InputGroupAddon>
                <i class="pi pi-cog"></i>
            </InputGroupAddon>
            <Select v-model="form.tear" :options="props.teares" optionLabel="name" filter placeholder="Tear" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '330px', 'margin-left': '20px' }">
            <InputGroupAddon>
                <i class="pi pi-stopwatch"></i>
            </InputGroupAddon>
            <Select v-model="form.op" :options="props.ops" @change="updateWire(form.op)" optionLabel="code" filter placeholder="Ordens de Operação" class="w-full md:w-80" />
          </InputGroup>
        </div>

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-tags"></i>
            </InputGroupAddon>
            <InputText placeholder="Nome da programação" id="name" v-model="form.name" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <Divider />

        <div :class="$style.div_box_2">
          <InputGroup :style="{ 'max-width': '160px' }">
            <InputGroupAddon>
              <i class="pi pi-calendar"></i>
            </InputGroupAddon>
            <DatePicker
              dateFormat="dd/mm/yy"
              v-model="form.date_start"
              placeholder="Data inicial" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '120px', 'margin-left': '10px' }">
            <InputGroupAddon>
              <i class="pi pi-gauge"></i>
            </InputGroupAddon>
            <InputNumber placeholder="RPM" id="rpm" v-model="form.rpm" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '170px', 'margin-left': '10px' }">
            <InputGroupAddon>
              <i class="pi pi-history"></i>
            </InputGroupAddon>
            <InputNumber placeholder="Eficiencia" id="" v-model="form.efficiency" class="flex-auto" autocomplete="off" />
            <InputGroupAddon>%</InputGroupAddon>
          </InputGroup>

          <InputGroup :style="{ 'max-width': '160px', 'margin-left': '10px' }">
            <InputGroupAddon>
              <i class="pi pi-calendar"></i>
            </InputGroupAddon>
            <DatePicker
              dateFormat="dd/mm/yy"
              v-model="form.date_end"
              placeholder="Data final" />
          </InputGroup>
        </div>

        <Fieldset legend="Fios">
          <div :class="$style.div_box_wires" v-if="wires.length">
            <InputGroup :style="{ 'max-width': '440px', 'margin-top': '10px' }" v-for="wire of wires" :key="wire.name">
              <InputGroupAddon>{{ wire.name }}</InputGroupAddon>
              <InputNumber
                id="title" 
                v-model="wire.title"
                placeholder="Titulo"
                :minFractionDigits="2" :maxFractionDigits="5"
                class="flex-auto" autocomplete="off" />
              <InputNumber
                id="lfa"
                v-model="wire.lfa"
                placeholder="LFA"
                :minFractionDigits="2" :maxFractionDigits="5"
                class="flex-auto" autocomplete="off" />
              <InputNumber 
                id="alimen" 
                placeholder="Alimentadores"
                v-model="wire.feeders"
                :minFractionDigits="2" :maxFractionDigits="5"
                class="flex-auto" autocomplete="off" />
            </InputGroup>
          </div>
          <div v-else>
            <Message>Selecione uma Ordem de Operação</Message>
          </div>
        </Fieldset>

        <Fieldset legend="Estimativas">
          <div :class="$style.div_box_data">
            <InputGroup :style="{'max-width': '300px'}">
              <InputGroupAddon>Peso por dia</InputGroupAddon>
              <InputNumber 
                id="weight_day" 
                v-model="form.weight_daily"
                :minFractionDigits="2" :maxFractionDigits="5"
                class="flex-auto" autocomplete="off" />
              <InputGroupAddon>Kg</InputGroupAddon>
            </InputGroup>
            <InputGroup :style="{'max-width': '300px', 'margin-top': '10px'}">
              <InputGroupAddon>Concluir programação</InputGroupAddon>
              <InputNumber 
                id="days_for_done" 
                v-model="form.days_for_done"
                :minFractionDigits="2" :maxFractionDigits="5"
                class="flex-auto" autocomplete="off"/>
              <InputGroupAddon>Dias</InputGroupAddon>
            </InputGroup>
          </div>
        </Fieldset>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Calcular Produção" severity="info" @click="calcProgramming"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Salvar" severity="success" @click="onSavePrograming"></Button>
        </div>

      </Dialog>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, ref, watch } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Divider from 'primevue/divider';
import Message from 'primevue/message';
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import InputGroupAddon from 'primevue/inputgroupaddon';
import programingService from '@/system/services/programingService';
import type Form from '@/system/type/programingType'
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const use_refresh_table = useRefreshTable()
const visible = defineModel()
const props = defineProps(['teares', 'ops'])
const form = ref<Form>({})
const wires = ref([])
const op = ref()

const updateWire = (event) => {
  op.value = event

  if (wires.value == 0) {
    event.wires.forEach(element => {
      wires.value.push({
        "name": element.name,
        "title": null,
        "lfa": null,
        "feeders": null
      })
    });
  } else {
    wires.value = []
    event.wires.forEach(element => {
      wires.value.push({
        "name": element.name,
        "title": null,
        "lfa": null,
        "feeders": null
      })
    });    
  }
}

const onSavePrograming = async () => {
  formatValuesForSaveRelations()

  await programingService.save(form.value).then(async (response) => {

    if (response.status === 201) {
      visible.value = false
      use_refresh_table.setRefresh(true)
    }
  })

}

const calcProgramming = () => {
  let weight_for_daily = 0

  wires.value.forEach((ele) => {
    weight_for_daily += ((ele.lfa * ele.feeders * 0.59 * calcEfficiency(form.value.efficiency) * form.value.rpm) / ele.title)
  })
  form.value.weight_daily = parseInt(weight_for_daily.toFixed(2))
  form.value.days_for_done = parseInt((op.value.total_weight / form.value.weight_daily).toFixed(0)) + 1
  
}

const calcEfficiency = (value) => {
  return 1440 * (value / 100)
}

const formatValuesForSaveRelations = () => {
  form.value.tear = form.value.tear.id
  form.value.op = form.value.op.id
  form.value.wires = wires.value
}

</script>

<style module>
 .div_box {
  display: flex;
  margin-top: 1rem;

  max-width: 700px;
  justify-content: start;
 }

.div_box_2 {
  display: flex;
  margin-top: 1rem;

  max-width: 700px;
  justify-content: space-between;
 }

 .space_bottons {
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;
 }

.div_box_wires {
  display: flex !important;
  flex-direction: column;
  justify-content: space-around;
  align-items: start !important;
 }

 .div_box_data {
  display: flex !important;
  flex-direction: column;
  justify-content: space-around;
  align-items: start !important;
 }
</style>
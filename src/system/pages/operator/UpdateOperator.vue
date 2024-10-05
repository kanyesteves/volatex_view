<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Editar operador" :style="{ width: '45rem' }">

        <div :class="$style.div_box_" class="flex items-center">
          <InputGroup>
              <SelectButton v-model="form.turn" :options="options" optionLabel="name" aria-labelledby="multiple" />
          </InputGroup>
        </div>

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText placeholder="Name" id="name" v-model="form.name" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-briefcase"></i>
            </InputGroupAddon>
              <InputText placeholder="Cargo" id="office" v-model="form.office" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Salvar" severity="success" @click="onSaveOperator"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, ref } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import operatorService from '@/system/services/operatorService';
import type Form from '@/system/type/operatorType'

const visible = defineModel()
const options = ref([
  {name: '1º Primeiro', value: 'primeiro'},
  {name: '2º Segundo', value: 'segundo'},
  {name: '3º Terceiro', value: 'terceiro'},
])

const props = defineProps(['operator'])
const form = ref<Form>(props.operator)


const onSaveOperator = async () => {
  form.value.turn = form.value.turn.value
  await operatorService.save(form.value).then(async () => {
    visible.value = false
    location.reload()
  })

}

</script>

<style module>

 .space_bottons {
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;
 }

 .div_box_ {
  display: flex;
  margin-top: 1rem;
  margin-left: 1rem;
 }

 .div_box {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
 }

</style>
<template>
  <div class="card">
    <Dialog v-model:visible="visible" modal header="Novo registro" :style="{ width: '45rem' }">

      <div :class="$style.div_box_" class="flex items-center">
        <InputGroup>
          <SelectButton v-model="form.type_register" :options="options" optionLabel="name" aria-labelledby="multiple" />
        </InputGroup>

        <InputGroup :style="{ 'max-width': '115px' }">
          <InputGroupAddon>
              <i class="pi pi-clipboard"></i>
          </InputGroupAddon>
          <InputText placeholder="NF" id="fiscal_note" v-model="form.fiscal_note" class="flex-auto" autocomplete="off" />
        </InputGroup>
      </div>

      <div :class="$style.div_box" class="flex items-center">
        <InputGroup :style="{ 'max-width': '20rem' }">
          <InputGroupAddon>
              <i class="pi pi-sliders-h"></i>
          </InputGroupAddon>
          <MultiSelect v-model="form.name" :options="props.wires" optionLabel="name" filter placeholder="Fios"
          :maxSelectedLabels="3" @change="updateWires(form.name), removeError('name')" class="w-full md:w-80" />
        </InputGroup>
      </div>

      <Fieldset legend="Peso do fio" :style="{ 'margin-left' : '1rem' }">
        <div :class="$style.div_box_values">
          <InputGroup :style="{ 'margin-top': '1rem' }" v-for="wires of value_wires" :key="wires.name">
            <InputGroupAddon>{{ wires.name }}</InputGroupAddon>
            <InputNumber 
              id="wires" 
              v-model="wires.value"
              :minFractionDigits="2" :maxFractionDigits="5"
              class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>
      </Fieldset>

      <div :class="$style.space_bottons">
        <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
        <Button :style="{ 'margin-left': '1rem' }" type="button" label="Criar" severity="success" @click="onSaveInputOutputOfWires"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineModel, ref } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import SelectButton from 'primevue/selectbutton';
import InputGroupAddon from 'primevue/inputgroupaddon';
import inputOutputOfWiresService from '@/system/services/inputOutputOfWiresService';
import type { Form } from '@/system/type/inputOutputOfWiresType';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const visible = defineModel()
const props = defineProps(['wires'])
const name_empty = ref(false)
const weight_empty = ref(false)
const form = ref<Form>({})
const use_refresh_table = useRefreshTable()
const options = ref([
  {name: 'Entrada', value: 'input'},
  {name: 'Saída', value: 'output'}
])

const onSaveInputOutputOfWires = async () => {
  if (form.value.type_register != undefined)
    form.value.type_register = form.value.type_register.value

  formatValuesToSave()
  console.log(form.value)
  // await inputOutputOfWiresService.save(form.value).then(async (response) => {

  //   if (response.status == 201) {
  //     visible.value = false
  //     use_refresh_table.setRefresh(true)
  //   }

  // }).catch((error) => {
  //   error.response.data.detail.forEach(element => {
  //     formValid(element.loc)
  //   });
  // })

}

const removeError = (field) => {
  if (field == 'name')
    name_empty.value = false
  else if (field == 'weight')
    weight_empty.value = false
}

const formValid = (loc) => {
  let field = loc[1]
  switch (field) {
    case 'name':
      name_empty.value = true
      break
    case 'weight':
      weight_empty.value = true
      break
    default:
      break
  }
}

const formatValuesToSave = () => {
  form.value.name = value_wires.value
}

const value_wires = ref([])

const updateWires = (event) => {

if (value_wires.value == 0) {

  event.forEach(element => {
    value_wires.value.push({
      "name": element.name,
      "value": 0
    })
  });

} else {

  value_wires.value = []
  event.forEach(element => {
    value_wires.value.push({
      "name": element.name,
      "value": 0
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

 .div_box_ {
   display: flex;
   width: 20rem;
   margin-top: 1rem;
   margin-left: 1rem;
 }

 .div_box {
  display: flex;
  margin-top: 1rem;
  margin-left: 1rem;
 }

 .div_box_values {
  display: flex !important;
  flex-direction: column;
  justify-content: space-around;
  align-items: center !important;
 }

</style>
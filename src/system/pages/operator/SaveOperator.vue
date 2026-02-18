<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Novo operador" :style="{ width: '45rem' }" :breakpoints="{ '960px': '90vw', '640px': '95vw' }">

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
            <InputText placeholder="Name" id="name" v-model="form.name" :invalid="name_empty" @change="removeError('name')" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-briefcase"></i>
            </InputGroupAddon>
              <InputText placeholder="Cargo" id="office" v-model="form.office" :invalid="office_empty" @change="removeError('office')" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Criar" severity="success" @click="onSaveOperator"></Button>
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
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const visible = defineModel()
const name_empty = ref(false)
const office_empty = ref(false)
const form = ref<Form>({})
const use_refresh_table = useRefreshTable()
const options = ref([
  {name: '1º Primeiro', value: 'primeiro'},
  {name: '2º Segundo', value: 'segundo'},
  {name: '3º Terceiro', value: 'terceiro'},
])

const onSaveOperator = async () => {
  if (form.value.turn != undefined)
    form.value.turn = form.value.turn.value

  await operatorService.save(form.value).then(async (response) => {

    if (response.status === 201) {
      visible.value = false
      use_refresh_table.setRefresh(true)
      // location.reload()
    }
  }).catch((error) => {
    error.response.data.detail.forEach(element => {
      formValid(element.loc)
    });
  })

}

const removeError = (field) => {
  if (field == 'name')
    name_empty.value = false
  else if (field == 'model')
    office_empty.value = false
}

const formValid = (loc) => {
  let field = loc[1]
  switch (field) {
    case 'name':
      name_empty.value = true
      break
    case 'office':
      office_empty.value = true
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

 .div_box_ {
  display: flex;
  margin-top: 1rem;
  margin-left: 1rem;
 }

 .div_box {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-around;
  margin-top: 2rem;
 }

</style>
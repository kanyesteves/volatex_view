<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Novo tear" :style="{ width: '45rem' }">

        <div :class="$style.div_box_" class="flex items-center">
          <InputGroup >
              <ToggleButton v-model="form.status" class="w-24" onLabel="Ativo" offLabel="Inativo" />
          </InputGroup>
        </div>

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-wrench"></i>
            </InputGroupAddon>
            <InputText placeholder="Name" id="name" v-model="form.name" :invalid="name_empty" @change="removeError('name')" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-cog"></i>
            </InputGroupAddon>
              <InputText placeholder="Modelo" id="model" v-model="form.model" :invalid="model_empty" @change="removeError('model')" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Criar" severity="success" @click="onSaveTear"></Button>
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
import ToggleButton from 'primevue/togglebutton';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import tearService from '@/system/services/tearService';
import type Form from '@/system/type/tearType'

const visible = defineModel()
const name_empty = ref(false)
const model_empty = ref(false)
const form = ref<Form>({})

const onSaveTear = async () => {
  console.log(form.value)
  await tearService.save(form.value).then(async (response) => {

    if (response.status === 201) {
      visible.value = false
      location.reload()
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
    model_empty.value = false
}

const formValid = (loc) => {
  let field = loc[1]
  switch (field) {
    case 'name':
      name_empty.value = true
      break
    case 'model':
      model_empty.value = true
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
  justify-content: space-around;
  margin-top: 2rem;
 }

</style>
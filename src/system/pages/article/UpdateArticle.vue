<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Editar artigo" :style="{ width: '45rem' }" :breakpoints="{ '960px': '90vw', '640px': '95vw' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-thumbtack"></i>
            </InputGroupAddon>
              <InputText placeholder="Nome" id="articlename" v-model="form.name" :invalid="name_empty" @change="removeError('name')" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'margin-left': '1rem', 'width': '22rem' }">
            <InputGroupAddon>
                <i class="pi pi-dollar"></i>
            </InputGroupAddon>
            <InputNumber 
              placeholder="Preço"
              id="price"
              v-model="form.price"
              :invalid="price_empty"
              @change="removeError('price')"
              inputId="minmaxfraction"
              :minFractionDigits="2"
              :maxFractionDigits="5" fluid/>
          </InputGroup>
        </div>

        <InputGroup :style="{ 'margin-top': '1rem' }">
          <InputGroupAddon>
              <i class="pi pi-shopping-bag"></i>
          </InputGroupAddon>
          <InputText placeholder="Descrição" id="description" v-model="form.description" :invalid="description_empty" @change="removeError('description')"/>
        </InputGroup>


        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Salvar" severity="success" @click="onSaveArticle"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, ref, defineProps, defineEmits } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { InputNumber } from 'primevue';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import articleService from '@/system/services/articleService';
import type Form from '@/system/type/customerType'
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const visible = defineModel()
const name_empty = ref(false)
const price_empty = ref(false)
const description_empty = ref(false)
const props = defineProps(['article'])
const emit = defineEmits(['selectrestore'])
const use_refresh_table = useRefreshTable()

const form = ref<Form>(props.article)

const onSelectRestore = () => {
  emit('selectrestore', [])
}

const onSaveArticle = async () => {

  await articleService.save(form.value).then(async (response) => {
    if (response.status === 200) {
      visible.value = false
      use_refresh_table.setRefresh(true)
      onSelectRestore()
    }

  }).catch((error) => {
    console.log(error.response.data.detail)
    error.response.data.detail.forEach(element => {
      formValid(element.loc)
    });
  })

}

const removeError = (field) => {
  if (field == 'name')
    name_empty.value = false
  else if (field == 'description')
    description_empty.value = false
}

const formValid = (loc) => {
  let field = loc[1]
  switch (field) {
    case 'name':
      name_empty.value = true
      break
    case 'price':
      price_empty.value = true
      break
    case 'description':
      description_empty.value = true
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
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
 }

</style>
<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Editar artigo" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-thumbtack"></i>
            </InputGroupAddon>
              <InputText placeholder="Nome" id="articlename" v-model="form.name" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-shopping-bag"></i>
            </InputGroupAddon>
            <InputText placeholder="Descrição" id="description" v-model="form.description" />
          </InputGroup>
        </div>

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup>
            <FileUpload mode="basic" :url="'/src/uploads/ficha-'+form.name" accept="application/pdf" :maxFileSize="1000000" :auto="true" chooseLabel="Anexar ficha técnica" />
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Salvar" @click="onSaveArticle"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, ref, defineEmits, defineProps } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import FileUpload from 'primevue/fileupload';
import articleService from '@/system/services/articleService';
import type Form from '@/system/type/customerType'

const visible = defineModel()
const emit = defineEmits(['refreshTable'])
const props = defineProps(['article'])

const form = ref<Form>(props.article)

const onSaveArticle = async () => {

  await articleService.save(form.value).then(async () => {
    visible.value = false
    location.reload()
    emit('refreshTable')
  })

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
 }

</style>
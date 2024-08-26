<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Novo artigo" :style="{ width: '45rem' }">

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
            <FileUpload
              name="file"
              mode="advanced"
              url="http://localhost:8000/articles/upload/"
              accept="application/pdf"
              :maxFileSize="999999"
              @upload="uploadFile"
              chooseLabel="Selecionar ficha técnica"
              uploadLabel="Enviar"
              cancelLabel="Cancelar">
              <template #content="slotProps">
                <div v-if="slotProps.files && slotProps.files.length">
                  <div v-for="file in slotProps.files" :key="file.name" class="p-d-flex p-ai-center">
                    <i v-if="file.type === 'application/pdf'" class="pi pi-file-pdf p-mr-2" style="font-size: 2em; color: red;"></i>
                    <span>{{ file.name }}</span>
                  </div>
                </div>
              </template>
              <template #empty>
                <span>Arraste e solte os arquivos aqui para fazer upload.</span>
              </template>
            </FileUpload>
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Criar" @click="onSaveArticle"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, ref, defineEmits } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import FileUpload from 'primevue/fileupload';
import articleService from '@/system/services/articleService';
import type Form from '@/system/type/articleType';

const visible = defineModel()
const emit = defineEmits(['refreshTable'])

const form = ref<Form>({})

const uploadFile = (event) => {
  console.log(event)
}

const onSaveArticle = async () => {

  await articleService.save(form.value).then(async (response) => {
    if (response.status === 201) {
      visible.value = false
      location.reload()
      emit('refreshTable')
    }
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
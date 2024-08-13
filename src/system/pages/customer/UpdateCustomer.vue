<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Editar cliente" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-user"></i>
            </InputGroupAddon>
              <InputText placeholder="Nome" id="username" v-model="form.name" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-shopping-bag"></i>
            </InputGroupAddon>
            <InputText placeholder="Artigo" id="article" v-model="form.article" />
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Salvar" @click="onSaveCustomer"></Button>
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
import customerService from '@/system/services/customerService';
import type Form from '@/system/type/customerType'

const visible = defineModel()
const emit = defineEmits(['refreshTable'])
const props = defineProps(['customer'])

const form = ref<Form>(props.customer)

const onSaveCustomer = async () => {

  await customerService.save(form.value).then(async () => {
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
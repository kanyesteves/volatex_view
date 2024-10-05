<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Novo cliente" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-address-book"></i>
            </InputGroupAddon>
              <InputText placeholder="Nome" id="username" v-model="form.name" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-shopping-bag"></i>
            </InputGroupAddon>
            <InputText placeholder="Descrição" id="description" v-model="form.description" class="flex-auto" autocomplete="off"  />
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Criar" severity="success" @click="onSaveCustomer"></Button>
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
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import customerService from '@/system/services/customerService';
import type Form from '@/system/type/customerType'

const visible = defineModel()

const form = ref<Form>({})

const onSaveCustomer = async () => {

  await customerService.save(form.value).then(async (response) => {
    if (response.status === 201) {
      visible.value = false
      location.reload()
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
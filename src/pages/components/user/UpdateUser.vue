<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Editar usuário" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-user"></i>
            </InputGroupAddon>
              <InputText placeholder="Nome" id="username" v-model="form.name" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-key"></i>
            </InputGroupAddon>
            <Password placeholder="Senha" id="passwd" v-model="form.password" toggleMask />
          </InputGroup>
        </div>

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-envelope"></i>
            </InputGroupAddon>
              <InputText placeholder="E-mail" id="email" v-model="form.email" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-wrench"></i>
            </InputGroupAddon>
              <InputText placeholder="Cargo" id="office" v-model="form.office" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Toast />
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Salvar" @click="onSaveUser"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, ref, defineEmits } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import userService from '@/pages/services/userService';
import { useToast } from 'primevue/usetoast';
import type Form from '@/pages/type/userType'

const visible = defineModel()
const toast = useToast();
const emit = defineEmits(['refreshTable'])
const props = defineProps(['user'])

const form = ref<Form>(props.user)

const onSaveUser = async () => {

  await userService.save(form.value).then(async (response) => {

    if (response.status === 200) {
      visible.value = false
      emit('refreshTable')
    }
  }).catch((error) => {

    if (error.response.status === 422) {
      toast.add({ severity: 'error', summary: 'Erro ao atulizar', detail: 'Campos inválidos', life: 3000 });
    }

    if (error.response.status === 500) {
      toast.add({ severity: 'error', summary: 'Erro ao atulizar', detail: 'Erro no servidor', life: 3000 });
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
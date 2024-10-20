<template>
  <Dialog v-model:visible="visible" modal header="Aviso de confirmação" :style="{ width: '25rem' }">
    <span>Tem certeza que deseja remover o cliente <b>{{ props.customer.name }}</b>?</span>
    <Message :class="$style.messageWarn" severity="warn"><b>Ao remover esse cliente você estará excluíndo todos vinculos criado com ele.</b></Message>

    <div :class="$style.space_bottons">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
      <Button :style="{ 'margin-left': '1rem' }" type="button" severity="danger" label="Remover" @click="onRemoveCustomer"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineModel, defineProps } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Message from 'primevue/message';
import customerService from '@/system/services/customerService';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const visible = defineModel()
const props = defineProps(['customer'])


const onRemoveCustomer = () => {
  customerService.remove(props.customer.id).then((response) => {
    toast.add({ severity: 'success', summary: 'Sucesso',  detail: response.data, life: 2000 })
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

  .messageWarn {
    margin-top: 1rem;
  }
</style>
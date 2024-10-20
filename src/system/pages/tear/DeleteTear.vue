<template>
  <Dialog v-model:visible="visible" modal header="Aviso de confirmação" :style="{ width: '25rem' }">
    <Message :class="$style.messageWarn" severity="warn"><b>Verique <Button v-ripple  severity="warn" as="router-link" to="/programing">aqui</Button> se o tear {{ props.tear.name }} está em alguma programação antes de remover !!</b></Message>
    <span>Tem certeza que deseja remover o tear <b>{{ props.tear.name }}</b>?</span>

    <div :class="$style.space_bottons">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
      <Button :style="{ 'margin-left': '1rem' }" type="button" severity="danger" label="Remover" @click="onRemoveTear"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineModel, defineProps } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Message from 'primevue/message';
import tearService from '@/system/services/tearService';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const visible = defineModel()
const props = defineProps(['tear'])


const onRemoveTear = () => {
  tearService.remove(props.tear.id).then((response) => {
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
    margin-bottom: 1rem;
  }
</style>
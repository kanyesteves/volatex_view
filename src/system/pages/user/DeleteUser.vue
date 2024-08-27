<template>
  <Dialog v-model:visible="visible" modal header="Aviso de confirmação" :style="{ width: '25rem' }">
    <span>Tem certeza que deseja remover o usuário <b>{{ props.user.name }}</b>?</span>

    <div :class="$style.space_bottons">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
      <Button :style="{ 'margin-left': '1rem' }" type="button" severity="danger" label="Remover" @click="onRemoveUser"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineModel, defineProps } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import userService from '@/system/services/userService';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const visible = defineModel()
const props = defineProps(['user'])


const onRemoveUser = () => {
  userService.remove(props.user.id).then((response) => {
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
</style>
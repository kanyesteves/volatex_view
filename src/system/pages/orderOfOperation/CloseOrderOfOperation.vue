<template>
  <Dialog v-model:visible="visible" modal header="Aviso de confirmação" :style="{ width: '30rem' }">
    <span v-if="props.op.status != 'closed'">Tem certeza que deseja fechar essa ordem de operação <b>{{ props.op.code }}</b>?</span>
    <span v-else>A ordem de operação <b>{{ props.op.code }}</b> já foi fechada na data {{ props.op.date_closed }}</span>

    <div :class="$style.space_bottons">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
      <Button :style="{ 'margin-left': '1rem' }" type="button" severity="danger" label="Fechar" @click="onCloseOp"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineModel, defineProps } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import orderOfOperationService from '@/system/services/orderOfOperationService';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const visible = defineModel()
const props = defineProps(['op'])


const onCloseOp = () => {
  orderOfOperationService.close(props.op.id).then((response) => {
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
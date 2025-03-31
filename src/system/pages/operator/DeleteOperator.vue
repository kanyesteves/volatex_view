<template>
  <Dialog v-model:visible="visible" modal header="Aviso de confirmação" :style="{ width: '25rem' }">
    <span>Tem certeza que deseja remover o operador <b>{{ props.operator.name }}</b>?</span>

    <div :class="$style.space_bottons">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
      <Button :style="{ 'margin-left': '1rem' }" type="button" severity="danger" label="Remover" @click="onRemoveOperator"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineEmits, defineModel, defineProps } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import operatorService from '@/system/services/operatorService';
import { useToast } from 'primevue/usetoast';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const toast = useToast();
const visible = defineModel()
const props = defineProps(['operator'])
const emit = defineEmits(['selectrestore'])
const use_refresh_table = useRefreshTable()

const onSelectRestore = () => {
  emit('selectrestore', [])
}

const onRemoveOperator = () => {
  operatorService.remove(props.operator.id).then((response) => {
    toast.add({ severity: 'success', summary: 'Sucesso',  detail: response.data, life: 2000 })
    visible.value = false
    use_refresh_table.setRefresh(true)
    onSelectRestore()
    // location.reload()
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
<template>
  <Dialog v-model:visible="visible" modal header="Aviso de confirmação" :style="{ width: '25rem' }" :breakpoints="{ '640px': '90vw' }">
    <span>Tem certeza que deseja remover a programação <b>{{ props.programing.name }}</b>?</span>

    <div :class="$style.space_bottons">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
      <Button :style="{ 'margin-left': '1rem' }" type="button" severity="danger" label="Remover" @click="onRemovePrograming"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, defineEmits } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import programingService from '@/system/services/programingService';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const visible = defineModel()
const emit = defineEmits(['removePrograming'])
const props = defineProps(['programing'])
const use_refresh_table = useRefreshTable()


const onRemovePrograming = () => {
  programingService.remove(props.programing.id).then((response) => {
    visible.value = false
    use_refresh_table.setRefresh(true)
    emit('removePrograming');
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
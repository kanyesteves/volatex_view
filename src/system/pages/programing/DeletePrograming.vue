<template>
  <Dialog v-model:visible="visible" modal header="Aviso de confirmação" :style="{ width: '25rem' }">
    <span>Tem certeza que deseja remover a programação <b>{{ props.programing.name }}</b>?</span>

    <div :class="$style.space_bottons">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
      <Button :style="{ 'margin-left': '1rem' }" type="button" severity="danger" label="Remover" @click="onRemovePrograming"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineModel, defineProps } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import programingService from '@/system/services/programingService';
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const visible = defineModel()
const props = defineProps(['programing'])
const emit = defineEmits(['selectrestore'])
const use_refresh_table = useRefreshTable()

const onSelectRestore = () => {
  emit('selectrestore', [])
}


const onRemovePrograming = () => {
  programingService.remove(props.programing.id).then((response) => {
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
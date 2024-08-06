<template>
  <Dialog v-model:visible="visible" modal header="Aviso de confirmação" :style="{ width: '20rem' }">
    <span>Tem certeza que deseja remover?</span>

    <div :class="$style.space_bottons">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
      <Button :style="{ 'margin-left': '1rem' }" type="button" severity="danger" label="Remover" @click="visible = false"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineModel } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';


const visible = defineModel()

</script>

<style module>

  .space_bottons {
    display: flex;
    justify-content: end;
    margin-top: 1.5rem;
  }
</style>
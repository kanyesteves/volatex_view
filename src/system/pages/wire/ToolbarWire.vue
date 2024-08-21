<template>
  <div class=" card">
    <Toolbar :class="$style.tolbarbox">
      <template #start>
        <Button size="small" label="Novo" raised @click="emit('onNewWire')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Editar" severity="info" raised @click="emit('onEditWire')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Remover" severity="danger" raised @click="emit('onRemoveWire')" />
      </template>

      <template #end>
        <Button label="Exportar" icon="pi pi-download" size="small" />
      </template>
    </Toolbar>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, defineEmits } from 'vue';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';

const setVisibleToolbar = defineModel()
const emit = defineEmits(['onNewWire', 'onEditWire', 'onRemoveWire'])

</script>

<style module>
  .tolbarbox {
    margin-top: 1rem;
  }

  .buttons {
    margin-left: 1rem;
  }

</style>
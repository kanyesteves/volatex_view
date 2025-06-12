<template>
  <div class="card">
    <Toolbar :class="$style['p-toolbar']">
      <template #start>
        <Button size="small" label="Novo" severity="success" raised @click="emit('onNewOperator')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Editar" severity="success" raised @click="emit('onEditOperator')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Remover" severity="success" raised @click="emit('onRemoveOperator')" />
      </template>

      <template #center>
        <b>Operadores</b>
      </template>

      <template #end>
        <Button disabled v-tooltip.bottom="'Disponivel na próxima versão'" label="Exportar" severity="success" icon="pi pi-download" size="small" />
      </template>
    </Toolbar>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, defineEmits } from 'vue';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';

const setVisibleToolbar = defineModel()
const emit = defineEmits(['onNewOperator', 'onEditOperator', 'onRemoveOperator'])

</script>

<style module>
  .buttons {
    margin-left: 1rem;
  }

  .p-toolbar {
    border-radius: 0;
    overflow-y: auto;
    z-index: 999;
    top: 4.6rem;
    position: fixed;
    width: calc(100% - 260px);
  }
</style>
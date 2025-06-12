<template>
  <div class=" card">
    <Toolbar :class="$style['p-toolbar']">
      <template #start>
        <Button size="small" label="Novo" severity="success" raised @click="emit('onNewOp')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Editar" severity="success" raised @click="emit('onEditOp')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Fechar Ordem de Operação" severity="success" raised @click="emit('onDoneOp')" />
      </template>

      <template #center>
        <b>Ordens de Operação</b>
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
const emit = defineEmits(['onNewOp', 'onEditOp', 'onDoneOp'])

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
    margin-left: 0.8rem;
    position: fixed;
    width: calc(100% - 260px);
  }

  @media (min-width: 1583px) {
    .p-toolbar {
      margin-left: 0;
    }
  }

  @media (max-width: 1583px) {
    .p-toolbar {
      margin-left: 1.8rem;
    }
  }

  @media (min-width: 1483px) {
    .p-toolbar {
      margin-left: 0;
    }
  }
</style>
<template>
  <div class=" card">
    <Toolbar :class="$style['p-toolbar']">
      <template #start>
        <Button size="small" label="Novo" severity="success" raised @click="emit('onNewGroup')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Editar" severity="success" raised @click="emit('onEditGroup')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Remover" severity="success" raised @click="emit('onRemoveGroup')" />
      </template>

      <template #center>
        <b>Grupos</b>
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
const emit = defineEmits(['onNewGroup', 'onEditGroup', 'onRemoveGroup'])

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
    margin-left: 0.8rem;
    width: calc(100% - 260px);
  }

  @media (min-width: 1583px) {
    .p-toolbar {
      margin-left: 0;
    }
  }

  @media (max-width: 1583px) {
    .p-toolbar {
      margin-left: 1.4rem;
    }
  }
</style>
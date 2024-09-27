<template>
  <div class="card">
    <Toolbar>
      <template #start>
        <Button size="small" label="Novo" raised @click="emit('onNewOperator')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Editar" severity="info" raised @click="emit('onEditOperator')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Remover" severity="danger" raised @click="emit('onRemoveOperator')" />
      </template>

      <template #end>
        <Button disabled v-tooltip.bottom="'Disponivel na próxima versão'" label="Exportar" icon="pi pi-download" size="small" />
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

</style>
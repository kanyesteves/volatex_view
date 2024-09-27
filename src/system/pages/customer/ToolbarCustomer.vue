<template>
  <div class=" card">
    <Toolbar>
      <template #start>
        <Button size="small" label="Novo" raised @click="emit('onNewCustomer')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Editar" severity="info" raised @click="emit('onEditCustomer')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Remover" severity="danger" raised @click="emit('onRemoveCustomer')" />
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
const emit = defineEmits(['onNewCustomer', 'onEditCustomer', 'onRemoveCustomer'])

</script>

<style module>
  .buttons {
    margin-left: 1rem;
  }

</style>
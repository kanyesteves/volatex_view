<template>
  <div class=" card">
    <Toolbar>
      <template #start>
        <Button size="small" label="Novo" severity="success" raised @click="emit('onNewUser')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Editar" severity="success" raised @click="emit('onEditUser')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Remover" severity="success" raised @click="emit('onRemoveUser')" />
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
const emit = defineEmits(['onNewUser', 'onEditUser', 'onRemoveUser'])

</script>

<style module>
  .buttons {
    margin-left: 1rem;
  }

</style>
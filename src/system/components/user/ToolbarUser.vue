<template>
  <div class=" card">
    <Toolbar :class="$style.tolbarbox">
      <template #start>
        <Button size="small" label="Novo" raised @click="$emit('onNewUser')" />
        <Button :disabled="!setVisibleToolbar" :class="$style.buttons" size="small" label="Editar" severity="info" raised @click="$emit('onUpdateUser')" />
        <Button :disabled="!setVisibleToolbar" :class="$style.buttons" size="small" label="Remover" severity="danger" raised @click="$emit('onRemoveUser')" />
      </template>

      <template #end>
        <Button v-tooltip.bottom="'Exportar'" icon="pi pi-file-export" class="flex-auto ml-2" severity="info" text></Button>
      </template>
    </Toolbar>
  </div>
</template>

<script lang="ts" setup>
import { defineModel } from 'vue';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';

const setVisibleToolbar = defineModel()

</script>

<style module>
  .tolbarbox {
    margin-top: 1rem;
  }

  .buttons {
    margin-left: 1rem;
  }

</style>
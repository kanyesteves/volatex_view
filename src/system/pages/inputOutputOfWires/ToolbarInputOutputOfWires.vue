<template>
  <div class="card">
    <Toolbar>
      <template #start>
        <Button size="small" label="Novo" severity="success" raised @click="emit('onNewInputOutputOfWires')" />
        <Button :disabled="setVisibleToolbar.length != 1" :class="$style.buttons" size="small" label="Editar" severity="success" raised @click="emit('onEditInputOutputOfWires')" />
      </template>
    </Toolbar>

  </div>

</template>

<script lang="ts" setup>
import { defineModel, defineEmits } from 'vue';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';

const setVisibleToolbar = defineModel()
const emit = defineEmits(['onNewInputOutputOfWires', 'onEditInputOutputOfWires'])

</script>

<style module>

  .buttons {
    margin-left: 1rem;
  }

</style>
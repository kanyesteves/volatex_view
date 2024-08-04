<template>
  <div class="card">
    <GlobalMenu :is-visible="visible" />
    <Toolbar>
      <template #start>
        <Button icon="pi pi-bars" @click="onMenuClick" />
      </template>

      <template #end>
        {{ 'perfil' }}
      </template>
    </Toolbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import GlobalMenu from './GlobalMenu.vue';
import Toolbar from 'primevue/toolbar';

const visible = ref(false)

const onMenuClick = () => {
  visible.value = true
}

</script>
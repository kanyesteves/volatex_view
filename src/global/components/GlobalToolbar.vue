<template>
  <div class="card">
    <GlobalMenu v-model="visible" />
    <Toolbar>
      <template #start>
        <Button icon="pi pi-bars" @click="onMenuClick" />
      </template>

      <template #center>
        <h1>AuraTêxtil</h1>
      </template>

      <template #end>
        <Button v-tooltip.bottom="'Logout'" icon="pi pi-sign-out" class="flex-auto ml-2" severity="danger" text></Button>
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

<style module>

  h1 {
    font-size: 1.2rem;
  }

</style>
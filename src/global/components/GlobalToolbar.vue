<template>
  <div class="card">
    <GlobalMenu v-model="visible" />
    <Toolbar>
      <template #start>
        <!-- <Button icon="pi pi-bars" severity="success" @click="onMenuClick" /> -->
        <div :class="$style.logo">
          <img src="../../assets/auratextil.png" width="30px" height="43px" alt="AuraTêxtil">
        </div>
      </template>

      <template #center>
        <h2><span>AuraTêxtil</span></h2>
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

.logo {
  padding: 5px;
  margin-left: 0.1rem;
}

</style>
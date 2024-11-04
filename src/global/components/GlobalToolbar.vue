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
        <h2><span>Aura Têxtil</span></h2>
      </template>

      <template #end>
        <!-- <Button v-tooltip.left="'Configurações do sistema'" icon="pi pi-warehouse" class="flex-auto ml-2" text as="router-link" to="/configurations" ></Button> -->
        <Button v-tooltip.bottom="'Logout'" @click="removeSession" icon="pi pi-sign-out" as="router-link" to="/login" severity="danger" :style="{'text-decoration': 'none'}" text></Button>
      </template>
    </Toolbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import GlobalMenu from './GlobalMenu.vue';
import Toolbar from 'primevue/toolbar';
import { useMenuStore } from '@/global/storages/authStorage';

const menuStore = useMenuStore()
const visible = ref(false)

const onMenuClick = () => {
  visible.value = true
}

const removeSession = () => {
  localStorage.removeItem('token')
  menuStore.clearItemsConfig()
}


</script>

<style module>

.logo {
  padding: 5px;
  margin-left: 0.1rem;
}

</style>
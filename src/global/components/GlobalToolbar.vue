<template>
  <div class="card">
    <GlobalMenu v-model="visible" />
    <Toolbar :class="$style['p-toolbar']">
      <template #start>
        <!-- <Button icon="pi pi-bars" severity="success" @click="onMenuClick" /> -->
        <div :class="$style.logo">
          <img src="../../assets/logo_horizontal.png" width="150px" height="37px" alt="AuraTêxtil">
        </div>
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
  padding: 3px 2px 2px 10px;
  margin-left: 0.1rem;
}

.p-toolbar {
  border-radius: 0 !important;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 1000;
}

</style>
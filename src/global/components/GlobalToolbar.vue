<template>
  <div class="card">
    <GlobalMenu v-model="visible" />
    <Toolbar :class="$style['p-toolbar']">
      <template #start>
        <Button :class="$style.hamburger" icon="pi pi-bars" severity="secondary" text @click="sidebarStore.toggle()" />
        <div :class="$style.logo">
          <img src="../../assets/logo_horizontal.png" :class="$style.logoImg" alt="AuraTêxtil">
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
import { ref, onMounted, onUnmounted } from 'vue';
import Button from 'primevue/button';
import GlobalMenu from './GlobalMenu.vue';
import Toolbar from 'primevue/toolbar';
import { useMenuStore } from '@/global/storages/authStorage';
import { useSidebarStore } from '@/global/storages/sidebarStore';

const menuStore = useMenuStore()
const sidebarStore = useSidebarStore()
const visible = ref(false)

onMounted(() => {
  sidebarStore.updateCSSVariable();
  window.addEventListener('resize', sidebarStore.handleResize);
})

onUnmounted(() => {
  window.removeEventListener('resize', sidebarStore.handleResize);
})

const removeSession = () => {
  localStorage.removeItem('token')
  menuStore.clearItemsConfig()
}


</script>

<style module>

.hamburger {
  display: none;
}

@media (max-width: 767px) {
  .hamburger {
    display: inline-flex;
  }
}

.logo {
  padding: 3px 2px 2px 10px;
  margin-left: 0.1rem;
}

.logoImg {
  max-width: 150px;
  width: auto;
  height: auto;
}

.p-toolbar {
  border-radius: 0 !important;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 1000;
}

</style>
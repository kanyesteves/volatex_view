<template>
  <div v-show="sidebarStore.isOpen" class="menu">
    <Card :class="$style.card">
      <template #content>
        <Menu :model="menuItems" :class="$style.menu">
          <template #item="{ item, props }">
            <router-link v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
          </template>
        </Menu>
      </template>
    </Card>
  </div>
</template>


<script lang="ts" setup>
import { watch, computed } from 'vue';
import Card from 'primevue/card';
import Menu from 'primevue/menu';
import { useMenuStore } from '@/global/storages/authStorage';
import { useSidebarStore } from '@/global/storages/sidebarStore';

const menuStore = useMenuStore();
const sidebarStore = useSidebarStore();
const menuItems = computed(() => menuStore.items_config);

watch(menuItems, (newVal) => {
  menuItems.value = newVal;
}, { immediate: true });

</script>

<style module>

.card {
  border-radius: 0;
  height: calc(100vh - 4rem);
  position: fixed;
  top: 4rem;
  left: 0;
  width: var(--sidebar-width);
  overflow-y: auto;
  z-index: 999;
}

.menu {
  border: 0;
  display: flex;
}

</style>

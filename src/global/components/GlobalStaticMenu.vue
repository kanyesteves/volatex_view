<template>
  <div class="menu">
    <Card>
      <template #content>
        <Menu :model="menuItems">
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

const menuStore = useMenuStore();
const menuItems = computed(() => menuStore.items_config);

watch(menuItems, (newVal) => {
  menuItems.value = newVal;
}, { immediate: true });

</script>

<style module>

 .p-menu-submenu-label {
  color: black;
 }

</style>

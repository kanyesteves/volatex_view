<template>
  <div class="menu">
    <Card>
      <template #content>
        <Menu :model="items_config">
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
import Card from 'primevue/card';
import Menu from 'primevue/menu';
import { getItemsConfig } from '@/global/storages/authStorage';

const items_config = getItemsConfig()

</script>

<style module>

 .p-menu-submenu-label {
  color: black;
 }

</style>

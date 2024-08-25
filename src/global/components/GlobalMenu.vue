<template>
  <div class="menu">
    <Drawer v-model:visible="visible" header="Menu">
      <Menu :model="items">
        <template #item="{ item, props }">
          <router-link v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
        </template>
      </Menu>
    </Drawer>
  </div>
</template>


<script lang="ts" setup>
import { ref, defineModel } from 'vue';
import Drawer from 'primevue/drawer';
import Menu from 'primevue/menu';

const visible = defineModel()

const items = ref([
    {
      label: 'Usuários',
      icon: 'pi pi-user',
      route: '/user'
    },
    {
      label: 'Clientes',
      icon: 'pi pi-address-book',
      route: '/customer'
    },
    {
      label: 'Teares',
      icon: 'pi pi-cog',
      route: '/tear'
    },
    {
      label: 'Operadores',
      icon: 'pi pi-wrench',
      route: '/operator'
    },
    {
      label: 'Fios',
      icon: 'pi pi-sliders-h',
      route: '/wire'
    },
    {
      label: 'Artigos',
      icon: 'pi pi-thumbtack',
      route: '/article'
    },
    {
      label: 'Orderns de Operação',
      icon: 'pi pi-stopwatch',
      route: '/orderOfOperation'
    },
]);

</script>

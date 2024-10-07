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
import { ref } from 'vue';
import Card from 'primevue/card';
import Menu from 'primevue/menu';

const items_config = ref([
  { 
    label: 'Operações',
    items: [
      {
        label: 'Faturamento',
        icon: 'pi pi-dollar',
        route: '/invoicing'
      },
      {
        label: 'Produção',
        icon: 'pi pi-clipboard',
        route: '/production'
      },
      {
        label: 'Programações do Tear',
        icon: 'pi pi-tags',
        route: '/programing'
      },
      {
        label: 'Orderns de Operação',
        icon: 'pi pi-stopwatch',
        route: '/orderOfOperation'
      }
    ]
  },
  { 
    label: 'Configurações',
    items: [
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
      }
    ]
  }, 
  {
    label: 'Sistema',
    items: [
      {
        label: 'Grupos de usuários',
        icon: 'pi pi-id-card',
        route: '/group'
      },
      {
        label: 'Usuários',
        icon: 'pi pi-users',
        route: '/user'
      }
    ]
  }
]);

</script>

<style module>

 .p-menu-submenu-label {
  color: black;
 }

</style>

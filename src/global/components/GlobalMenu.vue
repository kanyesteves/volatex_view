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
import { ref, watch, defineProps } from 'vue';
import Drawer from 'primevue/drawer';
import Menu from 'primevue/menu';

const props = defineProps({
  isVisible: Boolean
})

const visible = ref(false);

watch(() => props.isVisible, (newVal) => {
  visible.value = newVal;
});

const items = ref([
    {
      label: 'Usuários',
      icon: 'pi pi-user',
      route: '/user'
    },
    {
      label: 'Clientes',
      icon: 'pi pi-building',
      route: '/customer'
    },
    {
      label: 'Tear',
      icon: 'pi pi-cog',
      route: '/tear'
    },
    {
      label: 'Operador',
      icon: 'pi pi-wrench',
      route: '/operator'
    },
    {
      label: 'Fio',
      icon: 'pi pi-sliders-h',
      route: '/wire'
    },
    {
      label: 'Orderm de Operação',
      icon: 'pi pi-stopwatch',
      route: '/orderOfOperation'
    },
]);

</script>

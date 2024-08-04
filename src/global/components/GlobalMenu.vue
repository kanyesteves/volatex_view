<template>
  <div class="menu">
    <Drawer v-model:visible="visible" header="Menu">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/user">User</router-link></li>
        <li><router-link to="/customer">Customer</router-link></li>
        <li><router-link to="/tear">Tear</router-link></li>
        <li><router-link to="/operator">Operator</router-link></li>
        <li><router-link to="/wire">Wire</router-link></li>
        <li><router-link to="/orderOfOperation">OP</router-link></li>
      </ul>
    </Drawer>
  </div>
</template>


<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import Drawer from 'primevue/drawer';

const props = defineProps({
  isVisible: Boolean
})

const visible = computed(() => {
  return props.isVisible
})

</script>

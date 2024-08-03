<template>
  <div class="home">
    <h1>HOME</h1>
    <Drawer v-model:visible="visible" header="Drawer">
      <template class="card flex justify-center">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/user">User</router-link></li>
          <li><router-link to="/customer">Customer</router-link></li>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/">Home</router-link></li>
          
        </ul>
          
          
           |
          <router-link to="/tear">Tear</router-link> |
          <router-link to="/operator">Operator</router-link> |
          <router-link to="/wire">Wire</router-link> |
          <router-link to="/orderOfOperation">OP</router-link> 
      </template>
    </Drawer>
    <Button icon="pi pi-bars" @click="visible = true" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';

export default defineComponent({
  name: 'HomeView',
  components: {
    Drawer,
    Button,
  },
  data() {
    return {
      visible: true
    }
  },

  methods: {

  }
});
</script>

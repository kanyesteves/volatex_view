<template>
  <div class="customer">
    <h1>Tela de Clientes</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';

export default defineComponent({
  name: 'CustomerView',
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

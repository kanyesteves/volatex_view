<template>
  <div class="card">
    <GlobalMenu :is-visible="visible" />
    <Toolbar>
      <template #start>
        <Button icon="pi pi-bars" @click="onMenuClick" />
      </template>

      <template #end>
        <Avatar icon="pi pi-user" class="mr-2" size="small" style="background-color: #ece9fc; color: #2a1261" />
      </template>
    </Toolbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import GlobalMenu from './GlobalMenu.vue';
import Toolbar from 'primevue/toolbar';
import Avatar from 'primevue/avatar';

const visible = ref(false)

const onMenuClick = () => {
  visible.value = true
}

</script>
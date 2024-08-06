<template>
  <div class="user">
    <GlobalToolbar />

    <div class="card">
      <ToolbarUser @onNewUser="onNewUser" />
    </div>

    <SaveUser v-model="new_user" />
    
    <h1>Tela de usuários</h1>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarUser from '../system/components/user/ToolbarUser.vue';
import SaveUser from '@/system/components/user/SaveUser.vue';


const new_user = ref(false)
const onNewUser = () => {
  new_user.value = true
}

</script>
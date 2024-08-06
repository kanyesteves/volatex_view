<template>
  <div class="user">
    <GlobalToolbar />

    <div class="card">
      <ToolbarUser 
        @onNewUser="onNewUser" 
        @onRemoveUser="onRemoveUser"/>

      <ListUser />
    </div>

    <SaveUser v-model="new_user" />
    
    <DeleteUser v-model="remove_user" />

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarUser from '../system/components/user/ToolbarUser.vue';
import SaveUser from '@/system/components/user/SaveUser.vue';
import DeleteUser from '@/system/components/user/DeleteUser.vue';
import ListUser from '@/system/components/user/ListUser.vue';


const new_user = ref(false)
const onNewUser = () => {
  new_user.value = true
}

const remove_user = ref(false)
const onRemoveUser = () => {
  remove_user.value = true
}

</script>
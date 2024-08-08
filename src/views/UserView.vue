<template>
  <div class="user">
    <GlobalToolbar />

    <div class="card">
      <ToolbarUser
        v-model="setVisibleToolbar"
        @onNewUser="onNewUser" 
        @onRemoveUser="onRemoveUser"/>

      <ListUser v-model="refresh" @selected="rowSelected" @unselected="rowUnSelected" />
    </div>

    <SaveUser v-model="new_user" />

    <!-- <UpdateUser v-model="new_user" /> -->
    
    <DeleteUser @refreshTable="refreshTable" v-model="remove_user" :user="user_selected" />

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarUser from '../system/components/user/ToolbarUser.vue';
import SaveUser from '@/system/components/user/SaveUser.vue';
import DeleteUser from '@/system/components/user/DeleteUser.vue';
import ListUser from '@/system/components/user/ListUser.vue';

const user_selected = ref({
  id: '',
  name: '',
})
const setVisibleToolbar = ref(false)

const rowSelected = (event) => {
  user_selected.value.id = event.data.id
  user_selected.value.name = event.data.name
  setVisibleToolbar.value = true
}

const rowUnSelected = () => {
  setVisibleToolbar.value = false
}

const new_user = ref(false)
const onNewUser = () => {
  new_user.value = true
}

const remove_user = ref(false)
const onRemoveUser = () => {
  remove_user.value = true
}

const refresh = ref(false)
const refreshTable = () => {
  refresh.value = true
}

</script>
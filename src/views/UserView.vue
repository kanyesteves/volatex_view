<template>
  <div class="user">
    <GlobalToolbar />

    <div class="card">
      <ToolbarUser
        v-model="setVisibleToolbar"
        @onNewUser="onNewUser" 
        @onEditUser="onEditUser" 
        @onRemoveUser="onRemoveUser" />

      <ListUser 
        :refresh="refresh" 
        @selected="rowSelected" 
        @unselected="rowUnSelected" />
    </div>

    <SaveUser 
      @refreshTable="refreshTable" 
      v-model="new_user" />

    <UpdateUser 
      @refreshTable="refreshTable" 
      v-model="edit_user"
      :user="user_selected" />
    
    <DeleteUser 
      @refreshTable="refreshTable" 
      v-model="remove_user" 
      :user="user_selected" />

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarUser from '../pages/components/user/ToolbarUser.vue';
import SaveUser from '@/pages/components/user/SaveUser.vue';
import DeleteUser from '@/pages/components/user/DeleteUser.vue';
import ListUser from '@/pages/components/user/ListUser.vue';
import UpdateUser from '@/pages/components/user/UpdateUser.vue'

const user_selected = ref({
  id: '',
  name: '',
  email: '',
  office: ''
})
const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  user_selected.value.id = event.data.id
  user_selected.value.name = event.data.name
  user_selected.value.email = event.data.email
  user_selected.value.office = event.data.office
  setVisibleToolbar.value.push(event.data.id)
}

const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const new_user = ref(false)
const onNewUser = () => {
  new_user.value = true
}

const edit_user = ref(false)
const onEditUser = () => {
  edit_user.value = true
}

const remove_user = ref(false)
const onRemoveUser = () => {
  remove_user.value = true
}

const refresh = ref(false)
const refreshTable = () => {
  refresh.value = true
  setVisibleToolbar.value = []
}

</script>
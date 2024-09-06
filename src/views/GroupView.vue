<template>
  <div class="group">
    <GlobalToolbar />

    <div class="card">
      <ToolbarGroup
        v-model="setVisibleToolbar"
        @onNewGroup="onNewGroup" 
        @onEditGroup="onEditGroup" 
        @onRemoveGroup="onRemoveGroup" />

      <ListGroup
        @selected="rowSelected" 
        @unselected="rowUnSelected" />
    </div>

    <SaveGroup
      v-model="new_group" 
      :users="users" />

    <UpdateGroup
      v-model="edit_group" 
      :users="users" 
      :group="group_selected"/>

    <DeleteGroup
      v-model="remove_group"
      :group="group_selected"/>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { debounce } from 'lodash'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ListGroup from '@/system/pages/group/ListGroup.vue';
import ToolbarGroup from '@/system/pages/group/ToolbarGroup.vue';
import SaveGroup from '@/system/pages/group/SaveGroup.vue';
import UpdateGroup from '@/system/pages/group/UpdateGroup.vue';
import DeleteGroup from '@/system/pages/group/DeleteGroup.vue';
import groupService from '@/system/services/groupService';
import userService from '@/system/services/userService';

const group_selected = ref({
  id: '',
  name: '',
  users: {},
  permissions: ''
})
const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  group_selected.value.id = event.data.id
  group_selected.value.name = event.data.name
  setVisibleToolbar.value.push(event.data.id)
}

const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const new_group = ref(false)
const onNewGroup = () => {
  getAllUsers()
  new_group.value = true
}

const edit_group = ref(false)
const onEditGroup = () => {
  getGroupById()
  getAllUsers()
  edit_group.value = true
}

const remove_group = ref(false)
const onRemoveGroup = () => {
  remove_group.value = true
}

const getGroupById = debounce(async () => {
  await groupService.get(group_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      group_selected.value.id = response.data.id
      group_selected.value.name = response.data.name
      group_selected.value.users = response.data.users
      group_selected.value.permissions = response.data.permissions
    }
  });
});

const users = ref([])
const getAllUsers = debounce(async () => {
  await userService.getAll().then((response) => {
    if (response.status == 200) {
      users.value = response.data
    }
  })
})

</script>
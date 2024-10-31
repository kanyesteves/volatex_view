<template>
  <div class="group">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <Card :class="$style.mainContent" class="card">
        <template #content>
          <ToolbarGroup
            v-model="setVisibleToolbar"
            @onNewGroup="onNewGroup" 
            @onEditGroup="onEditGroup" 
            @onRemoveGroup="onRemoveGroup" />
    
          <ListGroup
            @selected="rowSelected" 
            @unselected="rowUnSelected" />
        </template>
      </Card>
    </div>

    <SaveGroup
      v-model="new_group" 
      :users="all_users" />

    <UpdateGroup
      v-model="edit_group" 
      :users="all_users" 
      :users_selected="users_selected" 
      :group="group_selected" />

    <DeleteGroup
      v-model="remove_group"
      :group="group_selected"/>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card';
import { debounce } from 'lodash'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import ListGroup from '@/system/pages/group/ListGroup.vue';
import ToolbarGroup from '@/system/pages/group/ToolbarGroup.vue';
import SaveGroup from '@/system/pages/group/SaveGroup.vue';
import UpdateGroup from '@/system/pages/group/UpdateGroup.vue';
import DeleteGroup from '@/system/pages/group/DeleteGroup.vue';
import groupService from '@/system/services/groupService';
import userService from '@/system/services/userService';
import { getItemsConfig } from '@/global/storages/authStorage';
import router from '@/router';

const items_config = getItemsConfig()
onMounted(() => {
  validMenu()
})

const validMenu = () => {
  items_config.forEach((section) => {
    if (section.items.length == 1) {

      section.items.forEach(element => {
        if (element.label == "Produção") {

          router.push('/production')

        }
      });

    }
  })
}

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
      group_selected.value.permissions = response.data.permissions
      getUsersHasGroup(group_selected.value.id)
    }
  });
});

const users_selected = ref([])
const getUsersHasGroup = debounce(async (group_id) => {
  await groupService.getUsersHasGroup(group_id).then((response) => {
    if (response.status == 200) {
      users_selected.value = response.data
    }
  })
})

const all_users = ref([])
const getAllUsers = debounce(async () => {
  await userService.getAll().then((response) => {
    if (response.status == 200) {
      all_users.value = response.data
    }
  })
})

</script>

<style module>
.container {
  display: flex;
  /* height: 100vh; */
}

.sidebar {
  margin-top: 1rem;
  width: 300px;
  background-color: #f5f5f5;
}

.mainContent {
  margin-top: 1rem;
  flex-grow: 1;
  margin-left: 10px;
}

</style>
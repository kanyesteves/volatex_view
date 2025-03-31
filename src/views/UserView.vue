<template>
  <div class="user">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <Card :class="$style.mainContent" class="card">
        <template #content>
          <ToolbarUser
            v-model="setVisibleToolbar"
            @onNewUser="onNewUser" 
            @onEditUser="onEditUser" 
            @onRemoveUser="onRemoveUser" />
    
          <ListUser 
            @selected="rowSelected" 
            @unselected="rowUnSelected" />
        </template>
      </Card>
    </div>

    <SaveUser 
      v-model="new_user" />

    <UpdateUser 
      v-model="edit_user"
      :user="user_selected" 
      @selectrestore="selectRestore" />
    
    <DeleteUser 
      v-model="remove_user" 
      :user="user_selected" 
      @selectrestore="selectRestore" />

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card';
import { debounce } from 'lodash';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarUser from '../system/pages/user/ToolbarUser.vue';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import SaveUser from '@/system/pages/user/SaveUser.vue';
import DeleteUser from '@/system/pages/user/DeleteUser.vue';
import ListUser from '@/system/pages/user/ListUser.vue';
import UpdateUser from '@/system/pages/user/UpdateUser.vue'
import userService from '@/system/services/userService';
import { useMenuStore } from '@/global/storages/authStorage';
import router from '@/router';

const menuStore = useMenuStore();
const items_config = menuStore.items_config
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

const user_selected = ref({
  id: '',
  name: '',
  office: '',
  email: ''
})
const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  user_selected.value.id = event.data.id
  user_selected.value.name = event.data.name
  setVisibleToolbar.value.push(event.data.id)
}

const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const selectRestore = (event) => {
  setVisibleToolbar.value = event
}

const new_user = ref(false)
const onNewUser = () => {
  new_user.value = true
}

const edit_user = ref(false)
const onEditUser = () => {
  getUserById()
  edit_user.value = true
}

const remove_user = ref(false)
const onRemoveUser = () => {
  remove_user.value = true
}

const getUserById = debounce(async () => {
  await userService.get(user_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      user_selected.value.id = response.data.id
      user_selected.value.name = response.data.name
      user_selected.value.office = response.data.office
      user_selected.value.email = response.data.email
    }
  });
});

</script>

<style module>
.container {
  display: flex;
  /* height: 100vh; */
}

.sidebar {
  margin-top: 1rem;
  width: 260px;
  background-color: #f5f5f5;
}

.mainContent {
  margin-top: 1rem;
  flex-grow: 1;
  margin-left: 10px;
}

</style>
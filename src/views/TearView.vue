<template>
  <div class="tear">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <Card :class="$style.mainContent" class="card">
        <template #content>
          <ToolbarTear
            v-model="setVisibleToolbar"
            @onNewTear="onNewTear" 
            @onEditTear="onEditTear" 
            @onRemoveTear="onRemoveTear" />
      
          <ListTear 
            @selected="rowSelected" 
            @unselected="rowUnSelected" />
        </template>
      </Card>
    </div>

    <SaveTear
      v-model="new_tear" />
  
    <UpdateTear 
      v-model="edit_tear"
      :tear="tear_selected" />
  
    <DeleteTear
      v-model="remove_tear" 
      :tear="tear_selected" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card';
import { debounce } from 'lodash';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import ToolbarTear from '@/system/pages/tear/ToolbarTear.vue';
import ListTear from '@/system/pages/tear/ListTear.vue';
import SaveTear from '@/system/pages/tear/SaveTear.vue';
import UpdateTear from '@/system/pages/tear/UpdateTear.vue';
import DeleteTear from '@/system/pages/tear/DeleteTear.vue';
import tearService from '@/system/services/tearService';
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

const tear_selected = ref({
  id: 0,
  name: '',
  model: '',
  status: false
})

const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  tear_selected.value.id = event.data.id
  tear_selected.value.name = event.data.name
  setVisibleToolbar.value.push(event.data.id)
}


const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const new_tear = ref(false)
const onNewTear = () => {
  new_tear.value = true
}

const edit_tear = ref(false)
const onEditTear = () => {
  getTearById()
  edit_tear.value = true
}

const remove_tear = ref(false)
const onRemoveTear = () => {
  remove_tear.value = true
}

const getTearById = debounce(async () => {
  await tearService.get(tear_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      tear_selected.value.id = response.data.id
      tear_selected.value.name = response.data.name
      tear_selected.value.model = response.data.model
      tear_selected.value.status = response.data.status
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
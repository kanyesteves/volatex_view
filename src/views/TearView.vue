<template>
  <div class="tear">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <ToolbarTear
        :class="$style.toolbar_tear"
        v-model="setVisibleToolbar"
        @onNewTear="onNewTear" 
        @onEditTear="onEditTear" 
        @onRemoveTear="onRemoveTear" />

      <Card :class="$style.mainContent" class="card">
        <template #content>      
          <ListTear
            :class="$style.list_tear"
            @selected="rowSelected" 
            @unselected="rowUnSelected" />
        </template>
      </Card>
    </div>

    <SaveTear
      v-model="new_tear" />
  
    <UpdateTear 
      v-model="edit_tear"
      :tear="tear_selected" 
      @selectrestore="selectRestore" />
  
    <DeleteTear
      v-model="remove_tear" 
      :tear="tear_selected" 
      @selectrestore="selectRestore" />
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

const selectRestore = (event) => {
  setVisibleToolbar.value = event
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
  margin-top: 7rem;
  height: calc(100% - 3rem);
}

.toolbar_tear {
  height: auto;
  flex-shrink: 0;
}

.list_tear {
  flex-grow: 1;
  overflow-y: auto;
}

.sidebar {
  width: var(--sidebar-width);
  transition: width 0.2s ease;
  background-color: #f5f5f5;
}

.mainContent {
  border-radius: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

</style>
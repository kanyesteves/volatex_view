<template>
  <div class="wire">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />


      <ToolbarWire
        :class="$style.toolbar_wire"
        v-model="setVisibleToolbar"
        @onNewWire="onNewWire" 
        @onEditWire="onEditWire" 
        @onRemoveWire="onRemoveWire" />
  
      <Card :class="$style.mainContent" class="card">
        <template #content>
          <ListWire
            :class="$style.list_wire"
            @selected="rowSelected" 
            @unselected="rowUnSelected" />
        </template>
      </Card>
    </div>

    <SaveWire
      v-model="new_wire" />
  
    <UpdateWire 
      v-model="edit_wire" 
      :wire="wire_selected" 
      @selectrestore="selectRestore" />
  
    <DeleteWire
      v-model="remove_wire"
      :wire="wire_selected" 
      @selectrestore="selectRestore" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card';
import { debounce } from 'lodash'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import ToolbarWire from '@/system/pages/wire/ToolbarWire.vue';
import ListWire from '@/system/pages/wire/ListWire.vue';
import SaveWire from '@/system/pages/wire/SaveWire.vue';
import UpdateWire from '@/system/pages/wire/UpdateWire.vue';
import DeleteWire from '@/system/pages/wire/DeleteWire.vue';
import wireService from '@/system/services/wireService';
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

const wire_selected = ref({
  id: '',
  name: '',
  description: '',
  weight: 0.0
})

const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  wire_selected.value.id = event.data.id
  wire_selected.value.name = event.data.name
  setVisibleToolbar.value.push(event.data.id)
}

const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const selectRestore = (event) => {
  setVisibleToolbar.value = event
}

const new_wire = ref(false)
const onNewWire = () => {
  new_wire.value = true
}

const edit_wire = ref(false)
const onEditWire = () => {
  getWireById()
  edit_wire.value = true
}

const remove_wire = ref(false)
const onRemoveWire = () => {
  remove_wire.value = true
}

const getWireById = debounce(async () => {
  await wireService.get(wire_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      wire_selected.value.id = response.data.id
      wire_selected.value.name = response.data.name
      wire_selected.value.description = response.data.description
      wire_selected.value.weight = response.data.weight
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

.toolbar_wire {
  height: auto;
  flex-shrink: 0;
}

.list_wire {
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
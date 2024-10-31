<template>
  <div class="wire">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <Card :class="$style.mainContent" class="card">
        <template #content>
          <ToolbarWire
            v-model="setVisibleToolbar"
            @onNewWire="onNewWire" 
            @onEditWire="onEditWire" 
            @onRemoveWire="onRemoveWire" />
      
          <ListWire
            @selected="rowSelected" 
            @unselected="rowUnSelected" />
        </template>
      </Card>
    </div>

    <SaveWire
      v-model="new_wire" />
  
    <UpdateWire 
      v-model="edit_wire" 
      :wire="wire_selected" />
  
    <DeleteWire
      v-model="remove_wire"
      :wire="wire_selected" />
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

const wire_selected = ref({
  id: '',
  name: '',
  description: ''
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
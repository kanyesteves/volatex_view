<template>
  <GlobalToolbar />
  <div class="wire">
    <ToolbarWire
      v-model="setVisibleToolbar"
      @onNewWire="onNewWire" 
      @onEditWire="onEditWire" 
      @onRemoveWire="onRemoveWire" />

    <ListWire
      :refresh="refresh" 
      @selected="rowSelected" 
      @unselected="rowUnSelected" />
  </div>

  <SaveWire
    @refreshTable="refreshTable" 
    v-model="new_wire" />

  <UpdateWire 
    @refreshTable="refreshTable" 
    v-model="edit_wire" 
    :wire="wire_selected" />

  <DeleteWire
    @refreshTable="refreshTable" 
    v-model="remove_wire"
    :wire="wire_selected" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { debounce } from 'lodash'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarWire from '@/system/pages/wire/ToolbarWire.vue';
import ListWire from '@/system/pages/wire/ListWire.vue';
import SaveWire from '@/system/pages/wire/SaveWire.vue';
import UpdateWire from '@/system/pages/wire/UpdateWire.vue';
import DeleteWire from '@/system/pages/wire/DeleteWire.vue';
import wireService from '@/system/services/wireService';

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

const refresh = ref(false)
const refreshTable = () => {
  refresh.value = true
  setVisibleToolbar.value = []
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
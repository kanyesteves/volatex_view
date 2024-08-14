<template>
  <div class="tear">
    <GlobalToolbar />
    <ToolbarTear
      v-model="setVisibleToolbar"
      @onNewTear="onNewTear" 
      @onEditTear="onEditTear" 
      @onRemoveTear="onRemoveTear" />

    <ListTear 
      :refresh="refresh" 
      @selected="rowSelected" 
      @unselected="rowUnSelected" />

  </div>
  <h1>Tela de Teares</h1>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarTear from '@/system/pages/tear/ToolbarTear.vue';
import ListTear from '@/system/pages/tear/ListTear.vue';

const tear_selected = ref({
  id: '',
  name: '',
  model: '',
  status: ''
})
const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  tear_selected.value.id = event.data.id
  tear_selected.value.name = event.data.name
  tear_selected.value.model = event.data.model
  tear_selected.value.status = event.data.status
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
  edit_tear.value = true
}

const remove_tear = ref(false)
const onRemoveTear = () => {
  remove_tear.value = true
}

const refresh = ref(false)
const refreshTable = () => {
  refresh.value = true
  setVisibleToolbar.value = []
}

</script>
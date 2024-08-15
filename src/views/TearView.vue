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

  <SaveTear
    @refreshTable="refreshTable" 
    v-model="new_tear" />

  <UpdateTear 
    @refreshTable="refreshTable" 
    v-model="edit_tear"
    :tear="tear_selected" />

  <DeleteTear
    @refreshTable="refreshTable" 
    v-model="remove_tear" 
    :tear="tear_selected" />

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarTear from '@/system/pages/tear/ToolbarTear.vue';
import ListTear from '@/system/pages/tear/ListTear.vue';
import SaveTear from '@/system/pages/tear/SaveTear.vue';
import UpdateTear from '@/system/pages/tear/UpdateTear.vue';
import DeleteTear from '@/system/pages/tear/DeleteTear.vue';
import tearService from '@/system/services/tearService';

const tear_selected_id = ref()
const tear_selected = ref({})

const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  tear_selected_id.value = event.data.id
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
  tearService.get(tear_selected_id.value).then(async (response) => {
    if (response.status == 200) {
      tear_selected.value = response.data
    }
  });
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
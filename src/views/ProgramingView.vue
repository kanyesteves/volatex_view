<template>
  <GlobalToolbar />
  <div class="programing">
    <ToolbarPrograming
      v-model="setVisibleToolbar"
      @onNewPrograming="onNewPrograming" 
      @onEditPrograming="onEditPrograming" 
      @onRemovePrograming="onRemovePrograming" />

    <ListPrograming
      @selected="rowSelected" 
      @unselected="rowUnSelected" />
  </div>



</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { debounce } from 'lodash'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarPrograming from '@/system/pages/programing/ToolbarPrograming.vue'
import ListPrograming from '@/system/pages/programing/ListPrograming.vue'

const setVisibleToolbar = ref([])

const programing_selected = ref({
  id: 0,
  name: ''
});

const rowSelected = (event) => {
  programing_selected.value.id = event.data.id
  programing_selected.value.name = event.data.name
  setVisibleToolbar.value.push(event.data.id)
}

const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const new_op = ref(false)
const onNewPrograming = () => {
  new_op.value = true
}

const edit_op = ref(false)
const onEditPrograming = () => {
  // getOpById()
  edit_op.value = true
}

const done_op = ref(false)
const onRemovePrograming = () => {
  // getOpById()
  done_op.value = true
}

</script>
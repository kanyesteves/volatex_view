<template>
  <GlobalToolbar />
  <div class="programing">
    <ToolbarPrograming
      v-model="setVisibleToolbar"
      @onNewPrograming="onNewPrograming" 
      @onRemovePrograming="onRemovePrograming" />

    <ListPrograming
      @selected="rowSelected" 
      @unselected="rowUnSelected" />
  </div>

  <SavePrograming
    v-model="new_programing"
    :teares="teares"
    :ops="ops" />

  <DeletePrograming
    v-model="remove_programing" 
    :programing="programing_selected" />

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { debounce } from 'lodash'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarPrograming from '@/system/pages/programing/ToolbarPrograming.vue'
import ListPrograming from '@/system/pages/programing/ListPrograming.vue'
import SavePrograming from '@/system/pages/programing/SavePrograming.vue'
import orderOfOperationService from '@/system/services/orderOfOperationService';
import DeletePrograming from '@/system/pages/programing/DeletePrograming.vue'
import tearService from '@/system/services/tearService';

const setVisibleToolbar = ref([])

onMounted(() => {
  getAllTeares()
  getAllOps()
})

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

const new_programing = ref(false)
const onNewPrograming = () => {
  new_programing.value = true
}

const remove_programing = ref(false)
const onRemovePrograming = () => {
  remove_programing.value = true
}

const teares = ref([])
const getAllTeares = debounce(async () => {
  await tearService.getAllTearesActiveAndNotUse().then((response) => {
    if (response.status == 200) {
      teares.value = response.data
    }
  })
})

const ops = ref([])
const getAllOps = debounce(async () => {
  await orderOfOperationService.getAllOpenAndInProgress().then((response) => {
    if (response.status == 200) {
      ops.value = response.data
    }
  })
})

</script>
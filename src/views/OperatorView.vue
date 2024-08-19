<template>
  <div class="operator">
    <GlobalToolbar />
    <ToolbarOperator
      v-model="setVisibleToolbar"
      @onNewOperator="onNewOperator" 
      @onEditOperator="onEditOperator" 
      @onRemoveOperator="onRemoveOperator" />

    <ListOperator
      :refresh="refresh" 
      @selected="rowSelected" 
      @unselected="rowUnSelected" />

    </div>
    <h1>Tela de Operadores</h1>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { debounce } from 'lodash';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarOperator from '@/system/pages/operator/ToolbarOperator.vue';
import ListOperator from '@/system/pages/operator/ListOperator.vue';
import operatorService from '@/system/services/operatorService';


const operator_selected = ref({
  id: 0,
  name: '',
  office: '',
  turn: ''
})

const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  operator_selected.value.id = event.data.id
  operator_selected.value.name = event.data.name
  setVisibleToolbar.value.push(event.data.id)
}


const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const new_tear = ref(false)
const onNewOperator = () => {
  new_tear.value = true
}

const edit_tear = ref(false)
const onEditOperator = () => {
  getTearById()
  edit_tear.value = true
}

const remove_tear = ref(false)
const onRemoveOperator = () => {
  remove_tear.value = true
}

const refresh = ref(false)
const refreshTable = () => {
  refresh.value = true
  setVisibleToolbar.value = []
}

const getTearById = debounce(async () => {
  await operatorService.get(operator_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      operator_selected.value.id = response.data.id
      operator_selected.value.name = response.data.name
      operator_selected.value.office = response.data.office
      operator_selected.value.turn = response.data.turn
    }
  });
});

</script>
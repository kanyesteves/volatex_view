<template>
  <GlobalToolbar />
  <div class="orderOfOperatios">
    <ToolbarOrderOfOperation
      v-model="setVisibleToolbar"
      @onNewOp="onNewOp" 
      @onEditOp="onEditOp" 
      @onRemoveOp="onRemoveOp" 
      @onDoneOp="onDoneOp" />

  </div>
  <h1>Tela de Ordem de Operação</h1>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { debounce } from 'lodash'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarOrderOfOperation from '@/system/pages/orderOfOperation/ToolbarOrderOfOperation.vue';
import orderOfOperationService from '@/system/services/orderOfOperationService';

const setVisibleToolbar = ref([])

const op_selected = ref({
  id: 0,
  code: '',
  weight_per_piece: 0,
  customer_id: '',
  wire_id: '',
  total_weight: 0,
  status: ''
});

const rowSelected = (event) => {
  op_selected.value.id = event.data.id
  op_selected.value.code = event.data.code
  setVisibleToolbar.value.push(event.data.id)
}

const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const new_op = ref(false)
const onNewOp = () => {
  new_op.value = true
}

const edit_op = ref(false)
const onEditOp = () => {
  getOpById()
  edit_op.value = true
}

const remove_op = ref(false)
const onRemoveOp = () => {
  remove_op.value = true
}

const done_op = ref(false)
const onDoneOp = () => {
  done_op.value = true
}

const refresh = ref(false)
const refreshTable = () => {
  refresh.value = true
  setVisibleToolbar.value = []
}

const getOpById = debounce(async () => {
  await orderOfOperationService.get(op_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      op_selected.value.id = response.data.id
      op_selected.value.code = response.data.code
      op_selected.value.weight_per_piece = response.data.weight_per_piece
      op_selected.value.customer_id = response.data.customer_id
      op_selected.value.wire_id = response.data.wire_id
      op_selected.value.total_weight = response.data.total_weight
      op_selected.value.status = response.data.status
    }
  });
});

</script>
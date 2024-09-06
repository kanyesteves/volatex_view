<template>
  <GlobalToolbar />
  <div class="orderOfOperatios">
    <ToolbarOrderOfOperation
      v-model="setVisibleToolbar"
      @onNewOp="onNewOp" 
      @onEditOp="onEditOp" 
      @onDoneOp="onDoneOp" />

    <ListOrderOfOperation
      @selected="rowSelected" 
      @unselected="rowUnSelected" />
  </div>

  <SaveOrderOfOperation
    v-model="new_op" 
    :customers="customers"
    :wires="wires" />

  <UpdateOrderOfOperation
    v-model="edit_op"
    :customers="customers"
    :articles="articles"
    :wires="wires"
    :op="op_selected" />

  <CloseOrderOfOperation
    v-model="done_op" 
    :op="op_selected"/>
  
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { debounce } from 'lodash'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarOrderOfOperation from '@/system/pages/orderOfOperation/ToolbarOrderOfOperation.vue';
import ListOrderOfOperation from '@/system/pages/orderOfOperation/ListOrderOfOperation.vue';
import SaveOrderOfOperation from '@/system/pages/orderOfOperation/SaveOrderOfOperation.vue';
import UpdateOrderOfOperation from '@/system/pages/orderOfOperation/UpdateOrderOfOperation.vue';
import CloseOrderOfOperation from '@/system/pages/orderOfOperation/CloseOrderOfOperation.vue';
import orderOfOperationService from '@/system/services/orderOfOperationService';
import customerService from '@/system/services/customerService';
import wireService from '@/system/services/wireService';

const setVisibleToolbar = ref([])

onMounted(() => {
  getAllCustomers()
  getAllWires()
})

const op_selected = ref({
  id: 0,
  code: '',
  weight_per_piece: 0,
  customer: {},
  article: {},
  wires: [],
  total_weight: 0,
  total_pieces: 0,
  status: '',
  date_closed: ''
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

const done_op = ref(false)
const onDoneOp = () => {
  getOpById()
  done_op.value = true
}

const articles = ref([])
const getOpById = debounce(async () => {
  await orderOfOperationService.get(op_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      op_selected.value.id = response.data.id
      op_selected.value.code = response.data.code
      op_selected.value.weight_per_piece = response.data.weight_per_piece
      op_selected.value.customer = response.data.customer
      articles.value = op_selected.value.customer.article
      op_selected.value.article = response.data.article
      op_selected.value.wires = response.data.wires
      op_selected.value.total_weight = response.data.total_weight
      op_selected.value.total_pieces = response.data.total_pieces
      op_selected.value.status = response.data.status
      op_selected.value.date_closed = formatDateClosed(response.data.date_closed)
      formatWires(op_selected.value)
    }
  });
});

const customers = ref([])
const getAllCustomers = debounce(async () => {
  await customerService.getAll().then((response) => {
    if (response.status == 200) {
      customers.value = response.data
    }
  })
})

const wires = ref([])
const getAllWires = debounce(async () => {
  await wireService.getAll().then((response) => {
    if (response.status == 200) {
      wires.value = response.data
    }
  })
})

const formatWires = (op) => {
  op.wires.forEach((element) => {
    wires.value.forEach((wire) => {
      if (wire.id == element.id) {
        wire.percentage = element.percentage
      }
    })
  })
}

const formatDateClosed = (date_closed: any) => {
  var date_ = new Date(date_closed)
  var day = date_.getDay() + 1
  day = (day < 10) ? '0'+ day : day
  var month = date_.getMonth() + 1
  month = (month < 10) ? '0'+ month : month

  return op_selected.value.date_closed = day + '/' + month + '/' + date_.getFullYear()
}

</script>
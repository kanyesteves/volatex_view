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
    :articles="articles"
    :wires="wires" />

  <UpdateOrderOfOperation
    v-model="edit_op"
    :customer_selected="customer_selected"
    :article_selected="article_selected"
    :wires_selected="wires_selected"
    :customers="customers"
    :articles="articles"
    :wires="wires"
    :op="op_selected"
    :graphs="graphs" />

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
import productionService from '@/system/services/productionService';
import customerService from '@/system/services/customerService';
import articleService from '@/system/services/articleService';
import wireService from '@/system/services/wireService';

const setVisibleToolbar = ref([])

onMounted(() => {
  getAllCustomers()
  getAllArticles()
  getAllWires()
})

const op_selected = ref({
  id: 0,
  code: '',
  weight_per_piece: 0,
  total_weight: 0,
  total_pieces: 0,
  status: '',
  label_item: false,
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
  getOpGraphs()
  edit_op.value = true
}

const done_op = ref(false)
const onDoneOp = () => {
  getOpById()
  done_op.value = true
}

const customer_selected = ref()
const article_selected = ref()
const wires_selected = ref()

const graphs = ref({})
const getOpGraphs = async () => {
  await productionService.getOpOptions(op_selected.value.code).then(async (response) => {
    if (response.status == 200) {
      graphs.value = response.data
    }
  })
}

const getOpById = debounce(async () => {
  await orderOfOperationService.get(op_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      op_selected.value.id = response.data.id
      op_selected.value.code = response.data.code
      op_selected.value.weight_per_piece = response.data.weight_per_piece
      op_selected.value.total_weight = response.data.total_weight
      op_selected.value.total_pieces = response.data.total_pieces
      op_selected.value.status = response.data.status
      op_selected.value.label_item = response.data.label_item
      op_selected.value.date_closed = formatDateClosed(response.data.date_closed)
      customer_selected.value = response.data.customer[0]
      article_selected.value = response.data.article[0]
      wires_selected.value = response.data.wires
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

const articles = ref([])
const getAllArticles = debounce(async () => {
  await articleService.getAll().then((response) => {
    if (response.status == 200) {
      articles.value = response.data
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

const formatDateClosed = (date_closed: any) => {
  var date_ = new Date(date_closed)
  var day = date_.getDay() + 1
  day = (day < 10) ? '0'+ day : day
  var month = date_.getMonth() + 1
  month = (month < 10) ? '0'+ month : month

  return op_selected.value.date_closed = day + '/' + month + '/' + date_.getFullYear()
}

</script>
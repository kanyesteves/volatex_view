<template>
  <div class="customer">
    <GlobalToolbar />

    <div class="card">
      <ToolbarCustomer
        v-model="setVisibleToolbar"
        @onNewCustomer="onNewCustomer" 
        @onEditCustomer="onEditCustomer" 
        @onRemoveCustomer="onRemoveCustomer" />

      <ListCustomer
        :refresh="refresh" 
        @selected="rowSelected" 
        @unselected="rowUnSelected" />
    </div>

    <SaveCustomer
      @refreshTable="refreshTable" 
      v-model="new_customer" />

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarCustomer from '@/pages/components/customer/ToolbarCustomer.vue';
import ListCustomer from '@/pages/components/customer/ListCustomer.vue';
import SaveCustomer from '@/pages/components/customer/SaveCustomer.vue';

const user_selected = ref({
  id: '',
  name: '',
  article: ''
})
const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  user_selected.value.id = event.data.id
  user_selected.value.name = event.data.name
  user_selected.value.article = event.data.article
  setVisibleToolbar.value.push(event.data.id)
}

const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const new_customer = ref(false)
const onNewCustomer = () => {
  new_customer.value = true
}

const edit_customer = ref(false)
const onEditCustomer = () => {
  edit_customer.value = true
}

const remove_customer = ref(false)
const onRemoveCustomer = () => {
  remove_customer.value = true
}

const refresh = ref(false)
const refreshTable = () => {
  refresh.value = true
  setVisibleToolbar.value = []
}

</script>

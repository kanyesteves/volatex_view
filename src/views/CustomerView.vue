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

    <UpdateCustomer 
      @refreshTable="refreshTable" 
      v-model="edit_customer" 
      :customer="customer_selected" />

    <DeleteCustomer
      @refreshTable="refreshTable" 
      v-model="remove_customer"
      :customer="customer_selected" />

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarCustomer from '@/system/pages/customer/ToolbarCustomer.vue';
import ListCustomer from '@/system/pages/customer/ListCustomer.vue';
import SaveCustomer from '@/system/pages/customer/SaveCustomer.vue';
import UpdateCustomer from '@/system/pages/customer/UpdateCustomer.vue';
import DeleteCustomer from '@/system/pages/customer/DeleteCustomer.vue';

const customer_selected = ref({
  id: ''
})
const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  customer_selected.value.id = event.data.id
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

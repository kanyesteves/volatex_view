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
        @selected="rowSelected" 
        @unselected="rowUnSelected" />
    </div>

    <SaveCustomer
      v-model="new_customer" 
      :articles="articles" />

    <UpdateCustomer 
      v-model="edit_customer"
      :articles="articles"
      :customer="customer_selected" />

    <DeleteCustomer
      v-model="remove_customer"
      :customer="customer_selected" />

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { debounce } from 'lodash';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarCustomer from '@/system/pages/customer/ToolbarCustomer.vue';
import ListCustomer from '@/system/pages/customer/ListCustomer.vue';
import SaveCustomer from '@/system/pages/customer/SaveCustomer.vue';
import UpdateCustomer from '@/system/pages/customer/UpdateCustomer.vue';
import DeleteCustomer from '@/system/pages/customer/DeleteCustomer.vue';
import customerService from '@/system/services/customerService';
import articleService from '@/system/services/articleService';

const customer_selected = ref({
  id: '',
  name: '',
  article: {}
})
const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  customer_selected.value.id = event.data.id
  customer_selected.value.name = event.data.name
  setVisibleToolbar.value.push(event.data.id)
}

const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const new_customer = ref(false)
const onNewCustomer = () => {
  getAllArticles()
  new_customer.value = true
}

const edit_customer = ref(false)
const onEditCustomer = () => {
  getCustomerById()
  getAllArticles()
  edit_customer.value = true
}

const remove_customer = ref(false)
const onRemoveCustomer = () => {
  remove_customer.value = true
}

const getCustomerById = debounce(async () => {
  await customerService.get(customer_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      customer_selected.value.id = response.data.id
      customer_selected.value.name = response.data.name
      customer_selected.value.article = response.data.article
    }
  });
});

const articles = ref([])
const getAllArticles = debounce(async () => {
  await articleService.getAll().then((response) => {
    if (response.status == 200) {
      articles.value = response.data
    }
  })
})

</script>

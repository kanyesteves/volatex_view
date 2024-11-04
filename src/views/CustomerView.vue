<template>
  <div class="customer">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <Card :class="$style.mainContent" class="card">
        <template #content>
          <ToolbarCustomer
            v-model="setVisibleToolbar"
            @onNewCustomer="onNewCustomer" 
            @onEditCustomer="onEditCustomer" 
            @onRemoveCustomer="onRemoveCustomer" />
    
          <ListCustomer
            @selected="rowSelected" 
            @unselected="rowUnSelected" />
        </template>
      </Card>
    </div>

    <SaveCustomer
      v-model="new_customer" />

    <UpdateCustomer 
      v-model="edit_customer"
      :customer="customer_selected" />

    <DeleteCustomer
      v-model="remove_customer"
      :customer="customer_selected" />

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card';
import { debounce } from 'lodash';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import ToolbarCustomer from '@/system/pages/customer/ToolbarCustomer.vue';
import ListCustomer from '@/system/pages/customer/ListCustomer.vue';
import SaveCustomer from '@/system/pages/customer/SaveCustomer.vue';
import UpdateCustomer from '@/system/pages/customer/UpdateCustomer.vue';
import DeleteCustomer from '@/system/pages/customer/DeleteCustomer.vue';
import customerService from '@/system/services/customerService';

import { useMenuStore } from '@/global/storages/authStorage';
import router from '@/router';

const menuStore = useMenuStore();
const items_config = menuStore.items_config
onMounted(() => {
  validMenu()
})

const validMenu = () => {
  items_config.forEach((section) => {
    if (section.items.length == 1) {

      section.items.forEach(element => {
        if (element.label == "Produção") {

          router.push('/production')

        }
      });

    }
  })
}

const customer_selected = ref({
  id: '',
  name: '',
  description: ''
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
  new_customer.value = true
}

const edit_customer = ref(false)
const onEditCustomer = () => {
  getCustomerById()
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
      customer_selected.value.description = response.data.description
    }
  });
});

</script>

<style module>
.container {
  display: flex;
  /* height: 100vh; */
}

.sidebar {
  margin-top: 1rem;
  width: 260px;
  background-color: #f5f5f5;
}

.mainContent {
  margin-top: 1rem;
  flex-grow: 1;
  margin-left: 10px;
}

</style>
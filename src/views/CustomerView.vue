<template>
  <div class="customer">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <ToolbarCustomer
        :class="$style.toolbar_customer"
        v-model="setVisibleToolbar"
        @onNewCustomer="onNewCustomer" 
        @onEditCustomer="onEditCustomer" 
        @onRemoveCustomer="onRemoveCustomer" />
      <Card :class="$style.mainContent" class="card">
        <template #content>
          <ListCustomer
            :class="$style.list_customer"
            @selected="rowSelected" 
            @unselected="rowUnSelected" />
        </template>
      </Card>
    </div>

    <SaveCustomer
      v-model="new_customer" />

    <UpdateCustomer 
      v-model="edit_customer"
      :customer="customer_selected"
      @selectrestore="selectRestore" />

    <DeleteCustomer
      v-model="remove_customer"
      :customer="customer_selected"
      @selectrestore="selectRestore" />

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

const selectRestore = (event) => {
  setVisibleToolbar.value = event
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
  margin-top: 7rem;
  height: calc(100% - 3rem);
}

.toolbar_customer {
  height: auto;
  flex-shrink: 0;
}

.list_customer {
  flex-grow: 1;
  overflow-y: auto;
}

.sidebar {
  width: var(--sidebar-width);
  transition: width 0.2s ease;
  background-color: #f5f5f5;
}

.mainContent {
  border-radius: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

</style>
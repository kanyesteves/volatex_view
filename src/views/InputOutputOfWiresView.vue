<template>
    <div class="input_output_of_wires_selected">
      <GlobalToolbar />
  
      <div :class="$style.container">
        <GlobalStaticMenu
          :class="$style.sidebar" />
  
        <Card :class="$style.mainContent" class="card">
          <template #content>
            <ToolbarInputOutputOfWires
              v-model="setVisibleToolbar"
              @onNewInputOutputOfWires="onNewInputOutputOfWires" 
              @onEditInputOutputOfWires="onEditInputOutputOfWires" />
      
            <ListInputOutputOfWires
              @selected="rowSelected" 
              @unselected="rowUnSelected" />
          </template>
        </Card>
      </div>
  
      <SaveInputOutputOfWires
        :wires="wires"
        v-model="new_input_output_of_wires" />
  
      <!-- <UpdateInputOutputOfWires 
        v-model="edit_input_output_of_wires"
        :input_output_of_wires="input_output_of_wires_selected" /> -->

    </div>
  </template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card';
import { debounce } from 'lodash';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import ToolbarInputOutputOfWires from '@/system/pages/inputOutputOfWires/ToolbarInputOutputOfWires.vue';
import ListInputOutputOfWires from '@/system/pages/inputOutputOfWires/ListInputOutputOfWires.vue';
import SaveInputOutputOfWires from '@/system/pages/inputOutputOfWires/SaveInputOutputOfWires.vue';
import UpdateInputOutputOfWires from '@/system/pages/inputOutputOfWires/UpdateInputOutputOfWires.vue';
import inputOutputOfWiresService from '@/system/services/inputOutputOfWiresService';
import wireService from '@/system/services/wireService';


import { useMenuStore } from '@/global/storages/authStorage';
import router from '@/router';

const menuStore = useMenuStore();
const items_config = menuStore.items_config
onMounted(() => {
  validMenu()
  getAllWires()
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

const input_output_of_wires_selected = ref({
  id: '',
  name: '',
  weight: 0,
  type_register: '',
  date_open: '',
  fiscal_note: ''
})
const setVisibleToolbar = ref([])

const rowSelected = (event) => {
  input_output_of_wires_selected.value.id = event.data.id
  input_output_of_wires_selected.value.name = event.data.name
  setVisibleToolbar.value.push(event.data.id)
}

const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const new_input_output_of_wires = ref(false)
const onNewInputOutputOfWires = () => {
  new_input_output_of_wires.value = true
}

const edit_input_output_of_wires = ref(false)
const onEditInputOutputOfWires = () => {
  getInputOutputOfWiresById()
  edit_input_output_of_wires.value = true
}

const wires = ref([])
const getAllWires = debounce(async () => {
  await wireService.getAll().then((response) => {
    if (response.status == 200) {
      wires.value = response.data
    }
  })
})

const getInputOutputOfWiresById = debounce(async () => {
  await inputOutputOfWiresService.get(input_output_of_wires_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      input_output_of_wires_selected.value.id = response.data.id
      input_output_of_wires_selected.value.name = response.data.name
      input_output_of_wires_selected.value.weight = response.data.weight
      input_output_of_wires_selected.value.type_register = response.data.type_register
      input_output_of_wires_selected.value.date_open = response.data.date_open
      input_output_of_wires_selected.value.fiscal_note = response.data.fiscal_note
    }
  });
});
</script>
  
<style module>
  .container {
    display: flex;
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
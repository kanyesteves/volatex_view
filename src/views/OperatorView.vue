<template>
  <div class="operator">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <ToolbarOperator
        :class="$style.toolbar_operator"
        v-model="setVisibleToolbar"
        @onNewOperator="onNewOperator"
        @onEditOperator="onEditOperator"
        @onRemoveOperator="onRemoveOperator" />

      <Card :class="$style.mainContent" class="card">
        <template #content>
          <ListOperator
            :class="$style.list_operator"
            @selected="rowSelected" 
            @unselected="rowUnSelected" />
        </template>
      </Card>
    </div>

    </div>

    <SaveOperator
      v-model="new_operator" />

    <UpdateOperator
      v-model="edit_operator" 
      :operator="operator_selected" 
      @selectrestore="selectRestore"/>

    <DeleteOperator
      v-model="remove_operator" 
      :operator="operator_selected"
      @selectrestore="selectRestore"/>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card';
import { debounce } from 'lodash';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarOperator from '@/system/pages/operator/ToolbarOperator.vue';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import ListOperator from '@/system/pages/operator/ListOperator.vue';
import SaveOperator from '@/system/pages/operator/SaveOperator.vue';
import UpdateOperator from '@/system/pages/operator/UpdateOperator.vue';
import operatorService from '@/system/services/operatorService';
import DeleteOperator from '@/system/pages/operator/DeleteOperator.vue';
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

const operator_selected = ref({
  id: 0,
  name: '',
  office: '',
  turn: {
    name: '',
    value: ''
  }
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

const selectRestore = (event) => {
  setVisibleToolbar.value = event
}

const new_operator = ref(false)
const onNewOperator = () => {
  new_operator.value = true
}

const edit_operator = ref(false)
const onEditOperator = () => {
  getOperatorById()
  edit_operator.value = true
}

const remove_operator = ref(false)
const onRemoveOperator = () => {
  remove_operator.value = true
}

const getOperatorById = debounce(async () => {
  await operatorService.get(operator_selected.value.id).then(async (response) => {
    if (response.status == 200) {
      operator_selected.value.id = response.data.id
      operator_selected.value.name = response.data.name
      operator_selected.value.office = response.data.office
      operator_selected.value.turn = formatDataTurn(response.data.turn)
    }
  });
  console.log(operator_selected)
});

const formatDataTurn = (turn) => {
  if (turn == 'primeiro') {
    return {name: '1º Primeiro', value: 'primeiro'}
  } else if (turn == 'segundo') {
    return {name: '2º Segundo', value: 'segundo'}
  } else if (turn == 'terceiro') {
    return {name: '3º Terceiro', value: 'terceiro'}
  }
}

</script>

<style module>
.container {
  display: flex;
  margin-top: 7rem;
  height: calc(100% - 3rem);
}

.toolbar_operator {
  height: auto;
  flex-shrink: 0;
}

.list_operator {
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
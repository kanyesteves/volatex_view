<template>
  <div class="programing">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        :class="$style.sidebar" />

      <ToolbarPrograming
        :class="$style.toolbar_programming"
        v-model="setVisibleToolbar"
        @onNewPrograming="onNewPrograming" 
        @onRemovePrograming="onRemovePrograming" />

      <Card :class="$style.mainContent" class="card">
        <template #content>
          <ListPrograming
            :class="$style.list_programing"
            @selected="rowSelected" 
            @unselected="rowUnSelected" />
        </template>
      </Card>
    </div>
  
    <SavePrograming
      v-model="new_programing"
      :teares="teares"
      :ops="ops" />
  
    <DeletePrograming
      v-model="remove_programing" 
      :programing="programing_selected" 
      @selectrestore="selectRestore" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { debounce } from 'lodash'
import Card from 'primevue/card';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import ToolbarPrograming from '@/system/pages/programing/ToolbarPrograming.vue'
import ListPrograming from '@/system/pages/programing/ListPrograming.vue'
import SavePrograming from '@/system/pages/programing/SavePrograming.vue'
import orderOfOperationService from '@/system/services/orderOfOperationService';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import DeletePrograming from '@/system/pages/programing/DeletePrograming.vue'
import tearService from '@/system/services/tearService';
import { useMenuStore } from '@/global/storages/authStorage';
import router from '@/router';

const setVisibleToolbar = ref([])

onMounted(() => {
  getAllTeares()
  getAllOps()
  validMenu()
})

const menuStore = useMenuStore();
const items_config = menuStore.items_config
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

const programing_selected = ref({
  id: 0,
  name: ''
});

const rowSelected = (event) => {
  programing_selected.value.id = event.data.id
  programing_selected.value.name = event.data.name
  setVisibleToolbar.value.push(event.data.id)
}

const rowUnSelected = (event) => {
  const index = setVisibleToolbar.value.indexOf(event.data.id);
  setVisibleToolbar.value.splice(index, 1)
}

const selectRestore = (event) => {
  setVisibleToolbar.value = event
}

const new_programing = ref(false)
const onNewPrograming = () => {
  new_programing.value = true
}

const remove_programing = ref(false)
const onRemovePrograming = () => {
  remove_programing.value = true
}

const teares = ref([])
const getAllTeares = debounce(async () => {
  await tearService.getAllTearesActiveAndNotUse().then((response) => {
    if (response.status == 200) {
      teares.value = response.data
    }
  })
})

const ops = ref([])
const getAllOps = debounce(async () => {
  await orderOfOperationService.getAllOpenAndInProgress().then((response) => {
    if (response.status == 200) {
      ops.value = response.data
    }
  })
})

</script>

<style module>
.container {
  display: flex;
  margin-left: 2rem;
  margin-top: 7rem;
  height: calc(100% - 3rem);
}

@media (min-width: 1583px) {
  .container {
    margin-left: 0;
  }
}

.toolbar_programming {
  height: auto;
  flex-shrink: 0;
}

.list_programing {
  flex-grow: 1;
  overflow-y: auto;
}

.sidebar {
  width: 260px;
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
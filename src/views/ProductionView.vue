<template>
  <div class="production">
    <GlobalToolbar />

    <div :class="$style.container">
      <GlobalStaticMenu
        v-if="!only_production"
        :class="$style.sidebar" />

      <Card :class="$style.mainContent" class="card">
        <template #title>Produção</template>
        <template #content>

          <div class="card flex justify-center">
            <Stepper value="1" linear class="basis-[50rem]">
              <StepList>
                <Step value="1">Programação do Tear</Step>
                <Step value="2">Peso</Step>
                <Step value="3">Revisão</Step>
              </StepList>
              <StepPanels>
                <StepPanel v-slot="{ activateCallback }" value="1">

                  <div v-if="has_programings" :class="$style.step">
                    <div :class="$style.customborder">
                      <div v-for="programing of programings" :key="programing.id">
                        <Button
                          :class="$style.btn"
                          :label="programing.tear.map(ele => ele.name).join(', ')"
                          severity="info" size="large"
                          @click="getTearAndOp(programing)"
                          v-on:click="activateCallback('2')" />
                      </div>
                    </div>
                    <div :class="$style.buttonNext">
                      <Button label="Avançar" severity="success" icon="pi pi-arrow-right" @click="activateCallback('2')" />
                    </div>
                  </div>

                  <Message v-else>Clique <b><Button v-ripple  severity="info" as="router-link" to="/programing">Aqui</Button></b> para criar uma programação</Message>

                </StepPanel>

                <StepPanel v-slot="{ activateCallback }" value="2">
                  <div :class="$style.step">
                    <div :class="$style.customborder">
                      <InputGroup :style="{ 'max-width': '170px'}">
                        <InputNumber
                          placeholder="0.00"
                          id="weight"
                          v-model="form.weight"
                          @input="getWeight"
                          :minFractionDigits="2" :maxFractionDigits="5"
                          class="flex-auto" autocomplete="off" />
                          <InputGroupAddon>
                            <i>Kg/peça</i>
                          </InputGroupAddon>
                      </InputGroup>
                    </div>
                    <div :class="$style.buttons">
                      <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                      <Button label="Avançar" severity="success" icon="pi pi-arrow-right" @click="activateCallback('3')" />
                    </div>
                  </div>
                </StepPanel>

                <StepPanel v-slot="{ activateCallback }" value="3">
                  <div :class="$style.step">
                    <div>
                      <span :style="{'margin-right': '10px'}"><b>Código do rolo:</b></span>
                      <span :style="{'font-size': '18px'}">{{ form.code_per_piece }}</span>
                    </div>
                    <div :class="$style.customborderStep4">
                      <InputGroup :style="{'width': '5rem'}">
                        <SelectButton v-model="form.second_quality" :options="options" size="small"/>
                      </InputGroup>

                      <InputGroup :style="{ 'max-width': '360px', 'margin-left': '10px'}">
                        <InputText placeholder="Revisão" id="review" v-model="form.review" />
                      </InputGroup>

                      <InputGroup :style="{ 'max-width': '200px', 'margin-left': '10px'}">
                        <InputGroupAddon>
                          <i class="pi pi-user"></i>
                        </InputGroupAddon>
                        <Select v-model="form.operator" :options="operators" optionLabel="name" filter placeholder="Operador" />
                      </InputGroup>
                    </div>
                    <div>
                      <span><b>{{ programing_name }}</b> - <b>{{ form.weight }}</b></span>
                    </div>
                    <Toast />
                    <div :class="$style.buttons">
                      <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                      <Button label="Registrar" severity="success" v-on:click="onSaveRecord" @click="activateCallback('1')" />
                    </div>
                  </div>
                </StepPanel>
              </StepPanels>
            </Stepper>
          </div>

        </template>
        <template #footer>
          <h3>Últimos registros</h3>
          <DataTable :value="last3_records" resizableColumns columnResizeMode="expand" showGridlines tableStyle="min-width: 50rem">
            <Column field="tear" header="Tear"></Column>
            <Column field="second_quality" header="Qualidade"></Column>
            <Column field="op" header="Ordem de Operação"></Column>
            <Column field="weight" header="Peso"></Column>
            <Column field="operator" header="Tecelão"></Column>
            <Column field="date" header="Data"></Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash'
import { ref, onMounted } from 'vue'
import Step from 'primevue/step';
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import Column from 'primevue/column';
import Select from 'primevue/select';
import Button from 'primevue/button';
import Stepper from 'primevue/stepper';
import Message from 'primevue/message';
import StepList from 'primevue/steplist';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import StepPanel from 'primevue/steppanel';
import { useToast } from 'primevue/usetoast';
import StepPanels from 'primevue/steppanels';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import InputGroupAddon from 'primevue/inputgroupaddon';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import programingService from '@/system/services/programingService';
import GlobalStaticMenu from '@/global/components/GlobalStaticMenu.vue';
import operatorService from '@/system/services/operatorService';
import productionService from '@/system/services/productionService'
import type Form from '@/system/type/productionType'
import { useMenuStore } from '@/global/storages/authStorage';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import router from '@/router';

const menuStore = useMenuStore();
const toast = useToast();
const items_config = menuStore.items_config
const options = ref(['1º', '2º'])

const only_production = ref(false)
const form = ref<Form>({})

const onSaveRecord = debounce(async () => {
  form.value.operator = form.value.operator.name
  
  await productionService.save(form.value).then((response) => {
    if (response.status == 201) {
      toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Peça registrada no sistema !!', life: 3500 });
      getLast3Records()

    }
  })

  clearForm()
})

const clearForm = () => {
  form.value = {}
}

onMounted(() => {
  getAllProgramings()
  getAllOperators()
  getLast3Records()
  validMenu()
  form.value.second_quality = '1º'
  checkExpToken()
})

const checkExpToken = () => {
  const interval = setInterval(() => {
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)
    const expTime = decoded.exp * 1000

    if (Date.now() >= expTime) {
      clearInterval(interval)
      localStorage.removeItem('token');
      router.push('/login')
    }
  }, 30000)
}

const validMenu = () => {
  items_config.forEach((section) => {
    if (section.items.length == 1) {

       section.items.forEach(element => {
        if (element.label == "Produção") {
          only_production.value = true

        }
      });

    }
  })
}

const programings = ref([])
const has_programings = ref(false)
const getAllProgramings = async () => {
  await programingService.getAll().then((response) => {
    if (response.status == 200) {
      programings.value = response.data

      if (programings.value.length > 0)
        has_programings.value = true
    }
  })
}

const operators = ref([])
const getAllOperators = async () => {
  await operatorService.getAll().then((response) => {
    if (response.status == 200) {
      operators.value = response.data
    }
  })
}

const programing_name = ref()
const getTearAndOp = (programing) => {
  programing_name.value = programing.name
  form.value.tear = programing.tear.map(ele => ele.name).join(', ')
  form.value.op = programing.op.map(ele => ele.code).join(', ')
  form.value.code_per_piece = 1

  getCodePerPieceOfOp(programing.op.map(ele => ele.code).join(', '))
}

const getWeight = (event) => {
  form.value.weight = event.value
}

const getCodePerPieceOfOp = async (op_name) => {
  await productionService.getLastRecordByOp(op_name).then((response) => {
    if (response.status == 200) {
      let data = response.data.code_per_piece 

      if (data) {
        form.value.code_per_piece = data
        form.value.code_per_piece++
      } else {
        form.value.code_per_piece = 1
      }

    }
  })
}

const last3_records = ref([])
const getLast3Records = async () => {
  await productionService.getLast3Records().then((response) => {
    last3_records.value = response.data
    form.value.second_quality = '1º'
  })
}

</script>

<style module>
  .btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin: 10px;
  }

  .container {
    display: flex;
    margin-top: 4.5rem;
    height: 100vh;
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

  .customborder {
    display: flex;
    flex-direction: row;
    height: 100%;
    border-radius: 7px;
    justify-content: center;
    padding: 5%
  }
  .customborderStep4 {
    display: flex;
    flex-direction: row;
    height: 100%;
    border-radius: 7px;
    justify-content: center;
    padding: 2%
  }
  .labeleditemclass {
    display: flex;
    align-items: center;
  }
  .step {
    display: flex;
    flex-direction: column;
  }
  .buttonNext {
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

</style>
<template>
  <div class="production">
    <GlobalToolbar />
  </div>

  <Card :class="$style.cardbox">
    <template #title>Registro de peças</template>
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

              <div :class="$style.step">
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
                  <Button label="Avançar" icon="pi pi-arrow-right" @click="activateCallback('2')" />
                </div>
              </div>

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
                  <Button label="Avançar" icon="pi pi-arrow-right" @click="activateCallback('3')" />
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
                  <span><b>{{ programing_name }}</b> - <b>{{ date_format }}</b></span>
                </div>
                <div :class="$style.buttons">
                  <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                  <Button label="Registrar" v-on:click="onSaveRecord" @click="activateCallback('1')" />
                </div>
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>

    </template>
  </Card>

</template>

<script lang="ts" setup>
import { debounce } from 'lodash'
import { ref, onMounted } from 'vue'
import Step from 'primevue/step';
import Card from 'primevue/card';
import Select from 'primevue/select';
import Button from 'primevue/button';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import InputText from 'primevue/inputtext';
import StepPanel from 'primevue/steppanel';
import StepPanels from 'primevue/steppanels';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';
import InputGroupAddon from 'primevue/inputgroupaddon';
import GlobalToolbar from '../global/components/GlobalToolbar.vue';
import programingService from '@/system/services/programingService';
import operatorService from '@/system/services/operatorService';
import productionService from '@/system/services/productionService'
import orderOfOperationService from '@/system/services/orderOfOperationService';
import type Form from '@/system/type/productionType'

const form = ref<Form>({})

const onSaveRecord = debounce(async () => {
  form.value.operator = form.value.operator.name
  
  await productionService.save(form.value).then((response) => {
    if (response.status == 201) {
      console.log(response.data)
    }
  })

  clearForm()
})

const clearForm = () => {
  form.value = {}
}

const date_format = ref()

onMounted(() => {
  var date_ = new Date()
  var day = date_.getDay() + 1
  var month = date_.getMonth() + 1
  var year = date_.getFullYear()

  date_format.value = day + '/' + month + '/' + year

  getAllProgramings()
  getAllOperators()
})

const programings = ref([])
const getAllProgramings = debounce(async () => {
  await programingService.getAll().then((response) => {
    if (response.status == 200) {
      programings.value = response.data
    }
  })
})

const operators = ref([])
const getAllOperators = debounce(async () => {
  await operatorService.getAll().then((response) => {
    if (response.status == 200) {
      operators.value = response.data
    }
  })
})

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
  await productionService.getAllRecordsByOp(op_name).then((response) => {
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

</script>

<style module>
  .btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin: 10px;
  }
  .cardbox {
    margin-top: 1rem;
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
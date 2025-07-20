<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Editar Ordem de Operação" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup :style="{ 'max-width': '430px'  }">
            <InputGroupAddon>
                <i class="pi pi-key"></i>
            </InputGroupAddon>
            <InputText placeholder="Código" id="code" :disabled="checkStatus()" v-model="form.code" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '120px'  }">
            <InputGroupAddon>
                <i class="pi pi-clipboard"></i>
            </InputGroupAddon>
            <InputText placeholder="NF" id="code" :disabled="checkStatus()" v-model="form.fiscal_note" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.div_box_2" class="flex items-center">
          <InputGroup :style="{ 'max-width': '210px'}">
            <InputGroupAddon>
                <i class="pi pi-address-book"></i>
            </InputGroupAddon>
            <Select v-model="customer_has_op" :options="props.customers" :disabled="checkStatus()" optionLabel="name" filter placeholder="Cliente" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '210px'}">
            <InputGroupAddon>
                <i class="pi pi-thumbtack"></i>
            </InputGroupAddon>
            <Select v-model="article_has_op" :options="props.articles" :disabled="checkStatus()" optionLabel="name" filter placeholder="Artigo" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '210px' }">
            <InputGroupAddon>
                <i class="pi pi-sliders-h"></i>
            </InputGroupAddon>
            <MultiSelect v-model="wires_has_op" :options="props.wires" :disabled="checkStatus()" optionLabel="name" filter placeholder="Fios"
            :maxSelectedLabels="3" @change="updatePorcentage(wires_has_op)" class="w-full md:w-80" />
          </InputGroup>
        </div>

        <div :class="$style.div_box_3" class="flex items-center">
          <InputGroup :style="{ 'max-width': '120px'}">
              <ToggleButton v-model="form.label_item" class="w-24" :disabled="checkStatus()" onLabel="Com etiqueta" offLabel="Sem etiqueta" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '145px'}">
            <InputNumber 
              placeholder="00" 
              id="totalPieces" 
              :disabled="checkStatusKg()"
              v-model="form.total_pieces"
              class="flex-auto" autocomplete="off" />
              <InputGroupAddon>
                <i>Peças</i>
              </InputGroupAddon>
          </InputGroup>

          <InputGroup :style="{ 'max-width': '145px'}">
            <InputNumber 
              placeholder="0.00" 
              id="weightPerPiece" 
              :disabled="checkStatusKg()"
              v-model="form.weight_per_piece" 
              :minFractionDigits="2" :maxFractionDigits="5"
              class="flex-auto" autocomplete="off" />
              <InputGroupAddon>
                <i>Kg/peça</i>
              </InputGroupAddon>
          </InputGroup>

          <InputGroup :style="{ 'max-width': '170px'}">
            <InputNumber 
              placeholder="0.00" 
              id="weightTotal" 
              :disabled="checkStatusKg()"
              v-model="form.total_weight" 
              :minFractionDigits="2" :maxFractionDigits="5"
              class="flex-auto" autocomplete="off" />
              <InputGroupAddon>
                <i>Kg/Total</i>
              </InputGroupAddon>
          </InputGroup>
        </div>

        <Fieldset legend="Porcentagem de cada fio">
          <div :class="$style.div_box_porcentages">
            <InputGroup :style="{ 'max-width': '200px' }" v-for="porcentage of porcentages" :key="porcentage.name">
              <InputGroupAddon>{{ porcentage.name }}</InputGroupAddon>
              <InputNumber 
                id="porcentage" 
                :disabled="checkStatus()"
                v-model="porcentage.value"
                :minFractionDigits="2" :maxFractionDigits="5"
                class="flex-auto" autocomplete="off" />
            </InputGroup>
          </div>
        </Fieldset>

        <Fieldset :legend="statusFormat(form.status)">
          <div :class="$style.div_box_4">
            <div :class="$style.div_box_graphs">
              <Knob v-model="graphs.total_pieces" :max="form.total_pieces" :size="120" readonly />
              <label for="total_pieces">Total de rolos</label>
            </div>
  
            <div :class="$style.div_box_graphs">
              <Knob v-model="graphs.total_weight" :max="form.total_weight" :size="120" readonly />
              <label for="total_weight">1º Qualidade</label>
            </div>
  
            <div :class="$style.div_box_graphs">
              <Knob v-model="graphs.total_second_quality" :size="120" :max="form.total_weight" readonly />
              <label for="invoicing">2º Qualidade</label>
            </div>

            <div :class="$style.div_box_graphs">
              <Knob v-model="graphs.total_invoiced" valueTemplate="{value}%" :size="120" :max="100" readonly />
              <label for="invoicing">Faturamento</label>
            </div>
          </div>
        </Fieldset>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button v-if="!checkStatusKg()" :style="{ 'margin-left': '1rem' }" type="button" label="Salvar" severity="success" @click="onUpdateOP"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, defineEmits, watch, ref } from 'vue'
import Knob from 'primevue/knob';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import ToggleButton from 'primevue/togglebutton';
import InputGroupAddon from 'primevue/inputgroupaddon';
import orderOfOperationService from '@/system/services/orderOfOperationService';
import type Form from '@/system/type/orderOfOperationType'
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const use_refresh_table = useRefreshTable()
const visible = defineModel()
const props = defineProps([
  'customers',
  'articles',
  'wires',
  'op',
  'graphs',
  'customer_selected',
  'article_selected',
  'wires_selected'
])
const emit = defineEmits(['selectrestore'])

const customer_has_op = ref(props.customer_selected)
watch(() => props.customer_selected, (newValue) => {
  customer_has_op.value = newValue
})

const article_has_op = ref(props.article_selected)
watch(() => props.article_selected, (newValue) => {
  article_has_op.value = newValue
})

const wires_has_op = ref(props.wires_selected)
watch(() => props.wires_selected, (newValue) => {
  wires_has_op.value = newValue
})

const graphs = ref({})
watch(() => props.graphs, (newValue) => {
  graphs.value = newValue
  graphs.value.total_weight = graphs.value.total_weight.toFixed(1)
  graphs.value.total_invoiced = (graphs.value.total_invoiced > 0) ? ((graphs.value.total_invoiced / graphs.value.total_pieces) * 100).toFixed(0) : 0
  graphs.value.total_second_quality = graphs.value.total_second_quality.toFixed(2)
})

const form = ref<Form>(props.op)

const porcentages = ref([])
watch(() => form.value.wire_porcentage, (newValue) => {
  porcentages.value = newValue
})

const onSelectRestore = () => {
  emit('selectrestore', [])
}

const onUpdateOP = async () => {
  formatValuesForSaveRelations()

  await orderOfOperationService.save(form.value).then(async (response) => {

    if (response.status === 200) {
      visible.value = false
      use_refresh_table.setRefresh(true)
      onSelectRestore()
    }

  }).catch(async (response) => {
    console.log(response.data)
  })

}

const checkStatus = () => {
  if (form.value.status == 'closed' || form.value.status == 'in_progress')
    return true
}

const checkStatusKg = () => {
  if (form.value.status == 'closed')
    return true
}

const formatValuesForSaveRelations = () => {
  form.value.customer = customer_has_op.value.id
  form.value.article = article_has_op.value.id
  form.value.wires = wires_has_op.value.map(item => item.id)
  form.value.label_item = (!form.value.label_item) ? false : form.value.label_item
  form.value.wire_porcentage = porcentages.value
}

const statusFormat = (status) => {
  let status_aux = status

  if (status_aux == "open")
    status = "Aberto"
  else if (status_aux == "in_progress")
    status = "Em andamento"
  else
    status = "Fechado"

  return status
}

const updatePorcentage = (event) => {

  if (porcentages.value == 0) {

    event.forEach(element => {
      porcentages.value.push({
        "name": element.name,
        "value": (100 / event.length).toFixed(2)
      })
    });

  } else {

    porcentages.value = []
    event.forEach(element => {
      porcentages.value.push({
        "name": element.name,
        "value": (100 / event.length).toFixed(2)
      })
    });

  }
}

</script>

<style module>
 .space_bottons {
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;
 }
 .div_box {
  display: flex;
  margin-top: 1rem;

  max-width: 560px;
  justify-content: space-between;
 }
 .div_box_2 {
  display: flex;
  margin-top: 1rem;

  max-width: 650px;
  justify-content: space-between;
 }
 .div_box_3 {
  display: flex;
  margin-top: 1rem;

  max-width: 600px;
  justify-content: space-between;
 }
 .div_box_4 {
  display: flex;
  margin-top: 1rem;

  max-width: 640px;
  justify-content: space-around;
 }

 .div_box_graphs {
  display: flex;
  flex-direction: column;
  align-items: center;
 }
 .div_box_porcentages {
  display: flex !important;
  justify-content: space-around;
  align-items: center !important;
 }
</style>
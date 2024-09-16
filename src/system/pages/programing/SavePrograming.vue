<template>
  <div class="card">
    <div class="card flex justify-center">

      <Dialog v-model:visible="visible" modal header="Nova programação" :style="{ width: '45rem' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-tags"></i>
            </InputGroupAddon>
            <InputText placeholder="Nome da programação" id="name" v-model="form.name" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup :style="{ 'max-width': '330px' }">
            <InputGroupAddon>
                <i class="pi pi-cog"></i>
            </InputGroupAddon>
            <Select v-model="form.tear" :options="props.teares" optionLabel="name" filter placeholder="Tear" class="w-full md:w-80" />
          </InputGroup>

          <InputGroup :style="{ 'max-width': '330px' }">
            <InputGroupAddon>
                <i class="pi pi-stopwatch"></i>
            </InputGroupAddon>
            <Select v-model="form.op" :options="props.ops" optionLabel="code" filter placeholder="Ordens de Operação" class="w-full md:w-80" />
          </InputGroup>
        </div>
  
        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Salvar" @click="onSavePrograming"></Button>
        </div>

      </Dialog>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, ref } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import programingService from '@/system/services/programingService';
import type Form from '@/system/type/programingType'

const visible = defineModel()
const props = defineProps(['teares', 'ops'])
const form = ref<Form>({})


const onSavePrograming = async () => {
  formatValuesForSaveRelations()

  await programingService.save(form.value).then(async (response) => {

    if (response.status === 201) {
      visible.value = false
      location.reload()
    }
  })

}

const formatValuesForSaveRelations = () => {
  form.value.tear = form.value.tear.id
  form.value.op = form.value.op.id
}

</script>

<style module>
 .div_box {
  display: flex;
  margin-top: 1rem;

  max-width: 700px;
  justify-content: space-between;
 }

 .space_bottons {
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;
 }
</style>
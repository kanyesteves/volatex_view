<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Editar tear" :style="{ width: '45rem' }">

        <div :class="$style.div_box_" class="flex items-center">
          <InputGroup >
            <ToggleButton v-model="form.status" class="w-24" onLabel="Ativo" offLabel="Inativo" />
          </InputGroup>
        </div>

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-wrench"></i>
            </InputGroupAddon>
            <InputText placeholder="Name" id="name" v-model="form.name" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-cog"></i>
            </InputGroupAddon>
              <InputText placeholder="Modelo" id="model" v-model="form.model" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Salvar" severity="success" @click="onSaveTear"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, ref, defineEmits } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import tearService from '@/system/services/tearService';
import type Form from '@/system/type/tearType'
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const use_refresh_table = useRefreshTable()
const visible = defineModel()
const props = defineProps(['tear'])
const emit = defineEmits(['selectrestore'])

const form = ref<Form>(props.tear)

const onSelectRestore = () => {
  emit('selectrestore', [])
}

const onSaveTear = async () => {
  await tearService.save(form.value).then(async () => {
    visible.value = false
    use_refresh_table.setRefresh(true)
    onSelectRestore()
    // location.reload()
  })

}

</script>

<style module>

 .space_bottons {
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;
 }

 .div_box_ {
  display: flex;
  margin-top: 1rem;
  margin-left: 1rem;
 }

 .div_box {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
 }

</style>
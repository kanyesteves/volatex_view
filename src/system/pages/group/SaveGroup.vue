<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Novo grupo" :style="{ width: '45rem' }" :breakpoints="{ '960px': '90vw', '640px': '95vw' }">

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-users"></i>
            </InputGroupAddon>
              <InputText placeholder="Nome" id="groupname" v-model="form.name" class="flex-auto" autocomplete="off" />
          </InputGroup>

          <InputGroup :style="{ 'margin-left': '1rem' }">
            <InputGroupAddon>
                <i class="pi pi-user"></i>
            </InputGroupAddon>
            <MultiSelect v-model="form.users" :options="props.users" optionLabel="name" filter placeholder="Usuários"
            :maxSelectedLabels="3" class="w-full md:w-80" />
          </InputGroup>
        </div>

        <div :class="$style.div_box" class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-unlock"></i>
            </InputGroupAddon>
            <MultiSelect v-model="form.permissions" :options="listPermissions" optionLabel="name" filter placeholder="Permissões de acesso"
            :maxSelectedLabels="3" class="w-full md:w-80" />
          </InputGroup>
        </div>

        <div :class="$style.space_bottons">
          <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
          <Button :style="{ 'margin-left': '1rem' }" type="button" label="Criar" severity="success" @click="onSaveGroup"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, ref, defineProps } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import groupService from '@/system/services/groupService';
import type Form from '@/system/type/groupType'
import { useRefreshTable } from '@/global/storages/refreshTableStore';

const visible = defineModel()
const props = defineProps(['users'])
const use_refresh_table = useRefreshTable()

const form = ref<Form>({})

const listPermissions = [
  {name: 'Faturamento',        component: 'Invoicing'},
  {name: 'Relatórios',         component: 'Reports'},
  {name: 'Produção',           component: 'Production'},
  {name: 'Clientes',           component: 'Customer'},
  {name: 'Teares',             component: 'Tear'},
  {name: 'Operadores',         component: 'Operator'},
  {name: 'Fios',               component: 'Wire'},
  {name: 'Artigos',            component: 'Article'},
  {name: 'Ordens de Operação', component: 'OrderOfOperation'},
  {name: 'Programações',       component: 'Programing'},
  {name: 'Grupos',             component: 'Group'},
  {name: 'Usuários',           component: 'User'}
]

const onSaveGroup = async () => {
  form.value.users = form.value.users.map(item => item.id)
  await groupService.save(form.value).then(async (response) => {
    if (response.status === 201) {
      visible.value = false
      use_refresh_table.setRefresh(true)
      // location.reload()
    }
  })

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
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
 }

</style>
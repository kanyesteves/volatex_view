<template>
  <div class=" card">
    <div class="card flex justify-center">
      <Dialog v-model:visible="visible" modal header="Novo usuário" :style="{ width: '45rem' }">

        <div class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-user"></i>
            </InputGroupAddon>
              <InputText placeholder="Nome" id="username" v-model="user" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-key"></i>
            </InputGroupAddon>
            <Password placeholder="Senha" id="passwd" v-model="password" toggleMask />
          </InputGroup>
        </div>

        <div class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-envelope"></i>
            </InputGroupAddon>
              <InputText placeholder="E-mail" id="email" v-model="email" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div class="flex items-center">
          <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-wrench"></i>
            </InputGroupAddon>
              <InputText placeholder="Cargo" id="office" v-model="office" class="flex-auto" autocomplete="off" />
          </InputGroup>
        </div>

        <div :class="$style.space_bottons" class="flex justify-end gap-2">
          <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
          <Button type="button" label="Save" @click="visible = false"></Button>
        </div>

      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, ref } from 'vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';


const visible = defineModel()

const password = ref(null)
const user = ref(null)
const office = ref(null)
const email = ref(null)

</script>

<style module>

 .space_bottons {
  margin-top: 1.5rem;
 }

</style>
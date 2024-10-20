<template>
  <div :class="$style.card">
    <div :class="$style.centered_image">
      <img src="../assets/auratextil.png" alt="Logo auratextil" width="120" />
      <h3>Bem Vindo</h3>
    </div>

    <div v-focustrap :class="$style.box_login">
      <IconField>
          <InputIcon>
              <i class="pi pi-user" />
          </InputIcon>
          <InputText id="name" v-model="form.name" placeholder="Name" autofocus fluid />
      </IconField>

      <IconField :style="{ 'margin-top': '0.4rem'}">
        <InputIcon>
            <i class="pi pi-key" />
        </InputIcon>
        <InputText id="passwd" v-model="form.password" placeholder="Senha" type="password" fluid />
      </IconField>

      <Button :style="{ 'margin-top': '1.8rem'}" type="submit" label="Entrar" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import type { Form } from '@/system/type/loginType';

const form = ref<Form>({})

// const checkAuth = async () => {

// }

</script>

<style module>

  .box_login {
    display: flex;
    width: 20rem;
    margin-top: 5rem;
    flex-direction: column;
    justify-content: center;
  }

  .card {
    display: flex;
    justify-content: center;
    top: -1rem;
    left: -1rem;

    height: 100vh;
    width: 100vw;
    background-color: #a4a4a41f;
    position: relative;
  }

  .centered_image {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    max-width: 150px;
  }

</style>

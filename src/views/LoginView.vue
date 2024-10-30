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
          <InputText id="name" v-model="form.name" placeholder="Login" autofocus fluid />
      </IconField>

      <IconField :style="{ 'margin-top': '0.4rem'}">
        <InputIcon>
            <i class="pi pi-key" />
        </InputIcon>
        <InputText id="password" v-model="form.password" @keydown.enter="checkAuth" placeholder="Senha" type="password" fluid />
      </IconField>

      <Button :style="{ 'margin-top': '1.8rem'}" type="submit" label="Entrar" @click="checkAuth" />
      <Message v-if="unprocessable_entity" :class="$style.messageError" severity="error">
        <b>
          Campos obrigatórios:
          <ul v-for="field of fields_error" :key="field">
            <li>{{ (field.loc[1] == 'username') ? 'Login' : 'Senha' }}</li>
          </ul>
        </b>
      </Message>

      <Message v-if="unautothorized" :class="$style.messageError" severity="error">
        <b>Usuário inválido</b>
      </Message>

      <Message v-if="server_error" :class="$style.messageError" severity="error">
        Servidor parou. Entre em contato com o nosso time de suporte clicando 
        <a href="https://wa.me/5547996288611" target="_blank">
          Aqui.
        </a>
      </Message>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Message from 'primevue/message';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import type { Form } from '@/system/type/loginType';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import loginService from '@/system/services/loginService'
import groupService from '@/system/services/groupService';
import { setItemsConfig } from '@/global/storages/authStorage';
import router from '@/router';

const form = ref<Form>({})
const unautothorized = ref(false)
const unprocessable_entity = ref(false)
const server_error = ref(false)
const fields_error = ref([])

const checkAuth = async () => {
  server_error.value = false
  unautothorized.value = false
  unprocessable_entity.value = false

  await loginService.check(form.value).then((response) => {
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token)
      router.push('/production')
      fetchUserPermissions()
    }
  }).catch((error) => {
    if (error.code == "ERR_NETWORK") {
      server_error.value = true
    } else if (error.response.status == 401) {
      fields_error.value = error.response.data.detail
      unautothorized.value = true
    } else if (error.response.status == 422) {
      fields_error.value = error.response.data.detail
      unprocessable_entity.value = true
    }
  })
}

const userPermissions = ref([])
const items_config = ref([])

const fetchUserPermissions = async () => {
  const decodedToken = decodeToken();
  if (decodedToken) {
    await groupService.getPermissions(decodedToken).then((response) => {
      userPermissions.value = response.data.permissions;
      generateMenuItems();
    })
  }
};

const decodeToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwt_decode(token);
    return decoded;
  }
  return null;
};

const generateMenuItems = () => {
  items_config.value = [
    {
      label: 'Operações',
      items: filterItems(['Faturamento', 'Produção', 'Programações do Tear', 'Ordens de Operação'])
    },
    {
      label: 'Configurações',
      items: filterItems(['Clientes', 'Teares', 'Operadores', 'Fios', 'Artigos'])
    },
    {
      label: 'Sistema',
      items: filterItems(['Grupos', 'Usuários'])
    }
  ];

  setItemsConfig(items_config.value)
}

const filterItems = (itemLabels) => {

  return itemLabels
    .filter(label => userPermissions.value.some(perm => perm.name === label))
    .map(label => {
      const permission = userPermissions.value.find(perm => perm.name === label);
      return {
        label: permission.name,
        icon: 'pi pi-' + getIcon(permission.name),
        route: `/${permission.component.toLowerCase()}`
      };
    });
};

const getIcon = (name) => {
  const icons = {
    'Faturamento': 'dollar',
    'Produção': 'clipboard',
    'Programações do Tear': 'tags',
    'Ordens de Operação': 'stopwatch',
    'Clientes': 'address-book',
    'Teares': 'cog',
    'Operadores': 'wrench',
    'Fios': 'sliders-h',
    'Artigos': 'thumbtack',
    'Grupos': 'id-card',
    'Usuários': 'users'
  };
  return icons[name] || 'pi-folder';
};

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

  .messageError {
    margin-top: 1rem;
  }
</style>

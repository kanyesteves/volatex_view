import axios from "axios"
import type { AxiosInstance } from "axios"
// import Toast from 'primevue/toast';


const api: AxiosInstance = axios.create({
  baseURL: import.meta.url,
  headers: {
    'Content-Type': 'application/json'
  },
})

// Configuração global do Axios para CORS
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

//Intercepta a resposta.
//https://axios-http.com/ptbr/docs/interceptors
api.interceptors.response.use( function(response) {

  return response
},
function (error) {
  // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
  // Faz alguma coisa com o erro da resposta

  //Se não retornar nada, erro 500 - Servidor desligado.
  // if(error.code == "ERR_NETWORK"){
  //   Toast.emit('add', { severity: 'error', group: '500', life: 5000 })
  // }


  //Se erro 403 abre o modal de permissão inválida
  // else if(error?.response.status == 403){
  //   Toast.emit('add', { severity: 'warn', group: '403', life: 5000 })
  // }

  //Se erro 403 abre o modal de permissão inválida
  // else if(error?.response.status == 405){
  //   Toast.emit('add', { severity: 'warn', group: '405', life: 5000 })
  // }

  //Se erro 422 Campos inválidos
  // else if(error?.response.status == 422){
  //   Toast.emit('add', { severity: 'warn', group: '422', life: 5000 })
  // }

  //Se erro 500 erro geral do servidor
  // else if(error?.response.status == 500){
  //   Toast.emit('add', { severity: 'error', group: '500', life: 5000 })
  // }

  return Promise.reject(error)
})

export default api
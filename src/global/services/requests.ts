import axios from "axios"
import type { AxiosInstance } from "axios"
// import Toast from 'primevue/toast';


const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  },
})

// Configuração global do Axios para CORS
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

api.interceptors.response.use( function(response) {
  return response
},
function (error) {
  if(error.code == "ERR_NETWORK"){
    // Toast.emit('add', { severity: 'error', group: '500', life: 5000 })
    console.log('ERROR: ', 500)
  }

  else if(error?.response.status == 403){
    // Toast.emit('add', { severity: 'warn', group: '403', life: 5000 })
    console.log('FORBIDDEN: ', 403)
  }

  else if(error?.response.status == 405){
    // Toast.emit('add', { severity: 'warn', group: '405', life: 5000 })
    console.log('METHOD NOT ALLOWED: ', 405)
  }

  else if(error?.response.status == 422){
    // Toast.emit('add', { severity: 'warn', group: '422', life: 5000 })
    console.log('UNPROCESSABLE_ENTITY: ', 422)
  }

  else if(error?.response.status == 500){
    // Toast.emit('add', { severity: 'error', group: '500', life: 5000 })
    console.log('ERROR: ', 500)
  }

  return Promise.reject(error)
})

export default api
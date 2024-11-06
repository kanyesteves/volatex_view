import getEnvironment from "./getEnvironment"
import router from "@/router"
import axios from "axios"
import type { AxiosInstance } from "axios"

const apiUrl = getEnvironment('VITE_API_URL')
const api: AxiosInstance = axios.create({
  baseURL: apiUrl || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  },
})

// Configuração global do Axios para CORS
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

// Interceptor para adicionar o token no cabeçalho de requisições
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

api.interceptors.response.use( 
  function(response) {
    return response
  },
  function (error) {
    if (error.code === "ERR_NETWORK" ||  error?.response.status === 500) {
      console.log('ERROR: ', 500)
      localStorage.removeItem('token')
      localStorage.removeItem('items_config')
      router.push('/login')
    } else if (error?.response.status === 401) {
      console.log('UNAUTHORIZED: ', 401)
      localStorage.removeItem('token')
      localStorage.removeItem('items_config')
      router.push('/login')
    } else if (error?.response.status === 403) {
      console.log('FORBIDDEN: ', 403)
    } else if (error?.response.status === 405) {
      console.log('METHOD NOT ALLOWED: ', 405)
    } else if (error?.response.status === 422) {
      console.log('UNPROCESSABLE_ENTITY: ', 422)
    }

    return Promise.reject(error)
  }
)

export default api
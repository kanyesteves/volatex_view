import api from '../../global/services/requests'
import type { Form } from '../type/loginType'

class loginService {

  /**
   * Busca um usuário conforme o nome validando a permissão
   * @param {Form} Form: Credenciais do usuário para buscar as informações
   * @return {Array} Data: Informações do usuário e código de sucesso ou erro
   */
  async check(data: Form): Promise<any>{
    return await api.post(`/login/`, data)
  }

}

export default new loginService()
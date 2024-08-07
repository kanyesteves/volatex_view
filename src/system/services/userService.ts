import api from '../../global/services/requests'
import type { Form } from '../type/userType'

class userServices {

  /**
   * Busca de todos os usuários
   * @return {Array} Data: Lista com todos os usuários
   */
  getAll(): Promise<any>{
    return api.get('/users/getAll')
  }

  /**
   * Busca um usuário conforme o ID validando a permissão
   * @param {number} id: Id do usuário para buscar as informações
   * @return {Array} Data: Informações do usuário e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/users/${id}`)
  }

  /**
   * Envia os campos para salvar no banco de dados
   * Utilizado na Edição e também no cadastro de novo usuário
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return (data.id === undefined || data.id === null)
      // Novo
      ? await api.post("/users/register/", data)
      // Atualização
      : await api.put(`/users/update/${data.id}`, data)
  }

  /**
   * Remove um usuário em específico
   * @param {number} id: campo com Id do usuário para ser removido
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async remove(id: number): Promise<any>{
    return await api.delete(`/users/remove/${id}`)
  }

}

export default new userServices()
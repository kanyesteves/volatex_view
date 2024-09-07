import api from '../../global/services/requests'
import type { Form } from '../type/groupType'

class groupService {

  /**
   * Busca de todos os groups
   * @return {Array} Data: Lista com todos os groups
   */
  getAll(): Promise<any>{
    return api.get('/groups/getAll')
  }

  /**
   * Busca um grupo conforme o ID validando a permissão
   * @param {number} id: Id do grupo para buscar as informações
   * @return {Array} Data: Informações do grupo e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/groups/${id}`)
  }

  /**
   * Busca uma lista de usuários conforme o ID validando a permissão
   * @param {number} id: Id do grupo para buscar as informações
   * @return {Array} Data: Informações do grupo e código de sucesso ou erro
   */
    async getUsersHasGroup(id: number): Promise<any>{
      return await api.get(`/groups/getUsersHasGroup/${id}`)
    }

  /**
   * Envia os campos para salvar no banco de dados
   * Utilizado na Edição e também no cadastro de novo grupo
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return (data.id === undefined || data.id === null)
      // Novo
      ? await api.post("/groups/register/", data)
      // Atualização
      : await api.put(`/groups/update/${data.id}`, data)
  }

  /**
   * Remove um grupo em específico
   * @param {number} id: campo com Id do grupo para ser removido
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async remove(id: number): Promise<any>{
    return await api.delete(`/groups/remove/${id}`)
  }

}

export default new groupService()
import api from '../../global/services/requests'
import type { Form } from '../type/customerType'

class customerService {

  /**
   * Busca de todos os clientes
   * @return {Array} Data: Lista com todos os clientes
   */
  getAll(): Promise<any>{
    return api.get('/customers/getAll')
  }

  /**
   * Busca um cliente conforme o ID validando a permissão
   * @param {number} id: Id do cliente para buscar as informações
   * @return {Array} Data: Informações do cliente e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/customers/${id}`)
  }

  /**
   * Envia os campos para salvar no banco de dados
   * Utilizado na Edição e também no cadastro de novo cliente
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return (data.id === undefined || data.id === null)
      // Novo
      ? await api.post("/customers/register/", data)
      // Atualização
      : await api.put(`/customers/update/${data.id}`, data)
  }

  /**
   * Remove um cliente em específico
   * @param {number} id: campo com Id do cliente para ser removido
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async remove(id: number): Promise<any>{
    return await api.delete(`/customers/remove/${id}`)
  }

}

export default new customerService()
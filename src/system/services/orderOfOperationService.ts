import api from '../../global/services/requests'
import type { Form } from '../type/orderOfOperationType'

class orderOfOperationService {

  /**
   * Busca de todos as OPs
   * @return {Array} Data: Lista com todos as OPs
   */
  getAll(): Promise<any>{
    return api.get('/orderOfOperatios/getAll')
  }

  /**
   * Busca uma ordem de produção conforme o ID validando a permissão
   * @param {number} id: Id da ordem de produção para buscar as informações
   * @return {Array} Data: Informações da ordem de produção e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/orderOfOperatios/${id}`)
  }

  /**
   * Envia os campos para salvar no banco de dados
   * Utilizado na Edição e também no cadastro de nova ordem de produção
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return (data.id === undefined || data.id === null)
      // Novo
      ? await api.post("/orderOfOperatios/register/", data)
      // Atualização
      : await api.put(`/orderOfOperatios/update/${data.id}`, data)
  }

  /**
   * Remove uma ordem de produção em específico
   * @param {number} id: campo com Id da ordem de produção para ser removido
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async remove(id: number): Promise<any>{
    return await api.delete(`/orderOfOperatios/remove/${id}`)
  }

}

export default new orderOfOperationService()
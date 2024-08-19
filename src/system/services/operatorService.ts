import api from '../../global/services/requests'
import type { Form } from '../type/operatorType'

class operatorService {

  /**
   * Busca de todos os operadores
   * @return {Array} Data: Lista com todos os operadores
   */
  getAll(): Promise<any>{
    return api.get('/operators/getAll')
  }

  /**
   * Busca um operador conforme o ID validando a permissão
   * @param {number} id: Id do operador para buscar as informações
   * @return {Array} Data: Informações do operador e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/operators/${id}`)
  }

  /**
   * Envia os campos para salvar no banco de dados
   * Utilizado na Edição e também no cadastro de novo operador
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return (data.id === undefined || data.id === null)
      // Novo
      ? await api.post("/operators/register/", data)
      // Atualização
      : await api.put(`/operators/update/${data.id}`, data)
  }

  /**
   * Remove um operador em específico
   * @param {number} id: campo com Id do operador para ser removido
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async remove(id: number): Promise<any>{
    return await api.delete(`/operators/remove/${id}`)
  }

}

export default new operatorService()
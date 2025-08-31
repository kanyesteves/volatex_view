import api from '../../global/services/requests'
import type { Form } from '../type/programingType'

class programingService {

  /**
   * Busca de todos as programações
   * @return {Array} Data: Lista com todos as programações
   */
  getAll(): Promise<any>{
    return api.get('/programings/getAll')
  }

  /**
   * Busca uma programação conforme o ID validando a permissão
   * @param {number} id: Id da programação para buscar as informações
   * @return {Array} Data: Informações do teaer e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/programings/${id}`)
  }

  /**
   * Envia os campos para salvar no banco de dados
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return await api.post("/programings/register/", data)
  }

  /**
   * Remove uma programação em específico
   * @param {number} id: campo com Id do programação para ser removido
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async remove(id: number): Promise<any>{
    return await api.delete(`/programings/remove/${id}`)
  }

}

export default new programingService()
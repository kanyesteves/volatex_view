import api from '../../global/services/requests'
import type { Form } from '../type/tearType'

class tearService {

  /**
   * Busca de todos os teares
   * @return {Array} Data: Lista com todos os teares
   */
  getAll(): Promise<any>{
    return api.get('/teares/getAll')
  }

  /**
   * Busca um tear conforme o ID validando a permissão
   * @param {number} id: Id do tear para buscar as informações
   * @return {Array} Data: Informações do teaer e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/teares/${id}`)
  }

  /**
   * Envia os campos para salvar no banco de dados
   * Utilizado na Edição e também no cadastro de novo tear
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return (data.id === undefined || data.id === null)
      // Novo
      ? await api.post("/teares/register/", data)
      // Atualização
      : await api.put(`/teares/update/${data.id}`, data)
  }

  /**
   * Remove um usuário em específico
   * @param {number} id: campo com Id do usuário para ser removido
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async remove(id: number): Promise<any>{
    return await api.delete(`/teares/remove/${id}`)
  }

}

export default new tearService()
import api from '../../global/services/requests'
import type { Form } from '../type/wireType'

class wireService {

  /**
   * Busca de todos os fios
   * @return {Array} Data: Lista com todos os fios
   */
  getAll(): Promise<any>{
    return api.get('/wires/getAll')
  }

  /**
   * Busca um fio conforme o ID validando a permissão
   * @param {number} id: Id do fio para buscar as informações
   * @return {Array} Data: Informações do fio e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/wires/${id}`)
  }

  /**
   * Envia os campos para salvar no banco de dados
   * Utilizado na Edição e também no cadastro de novo fio
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return (data.id === undefined || data.id === null)
      // Novo
      ? await api.post("/wires/register/", data)
      // Atualização
      : await api.put(`/wires/update/${data.id}`, data)
  }

  /**
   * Remove um fio em específico
   * @param {number} id: campo com Id do fio para ser removido
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async remove(id: number): Promise<any>{
    return await api.delete(`/wires/remove/${id}`)
  }

}

export default new wireService()
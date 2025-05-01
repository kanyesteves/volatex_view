import api from '../../global/services/requests'
import type { Form } from '../type/inputOutputOfWiresType'

class inputOutputOfWiresService {

  /**
   * Busca de todos registros de entradas e saída de fios
   * @return {Array} Data: Lista com todos registros de entradas e saída de fios
   */
  getAll(): Promise<any>{
    return api.get('/inputOutputOfWires/getAll')
  }

  /**
   * Busca um registro conforme o ID validando a permissão
   * @param {number} id: Id do registro para buscar as informações
   * @return {Array} Data: Informações do do registro e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/inputOutputOfWires/${id}`)
  }

  /**
   * Envia os campos para salvar no banco de dados
   * Utilizado na Edição e também no cadastro de recebimento ou saída de fio.
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return (data.id === undefined || data.id === null)
      // Novo
      ? await api.post("/inputOutputOfWires/register/", data)
      // Atualização
      : await api.put(`/inputOutputOfWires/update/${data.id}`, data)
  }

  /**
   * Remove um registro de entrada ou saída em específico
   * @param {number} id: campo com Id do registro para ser removido
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async remove(id: number): Promise<any>{
    return await api.delete(`/inputOutputOfWires/remove/${id}`)
  }

}

export default new inputOutputOfWiresService()
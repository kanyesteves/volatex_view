import api from '../../global/services/requests'
import type { Form } from '../type/productionType'

class productionService {

  /**
   * Busca de todos as produtos
   * @return {Array} Data: Lista com todos as produtos
   */
  getAll(): Promise<any>{
    return api.get('/productions/getAll')
  }

  /**
   * Busca um registro conforme o ID validando a permissão
   * @param {number} id: Id do registro para buscar as informações
   * @return {Array} Data: Informações do registro e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/productions/${id}`)
  }

  /**
   * Envia os campos para salvar no banco de dados
   * Utilizado na Edição e também no cadastro de um novo registro
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return (data.id === undefined || data.id === null)
      // Novo
      ? await api.post("/productions/register/", data)
      // Atualização
      : await api.put(`/productions/update/${data.id}`, data)
  }

}

export default new productionService()
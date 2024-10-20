import api from '../../global/services/requests'
import type { Form } from '../type/invoicingType'

class invoicingService {

  /**
   * Busca de todos os faturamentos
   * @return {Array} Data: Lista com todos os faturamentos
   */
  getAll(): Promise<any>{
    return api.get('/invoicings/getAll')
  }

  /**
   * Busca um faturamento conforme o ID validando a permissão
   * @param {number} id: Id do faturamento para buscar as informações
   * @return {Array} Data: Informações do faturamento e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/invoicings/${id}`)
  }

  /**
   * Envia os campos para salvar no banco de dados
   * Utilizado na Edição e também no cadastro de novo faturamento
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return await api.post("/invoicings/register/", data)
  }

  /**
   * Envia os campos para exportar PDF
   * @param {Object} form: campos com os dados para serem exportados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
    async generatePDF(data: Form): Promise<any>{
      return await api.post("/invoicings/generatePDF/", data)
    }

}

export default new invoicingService()
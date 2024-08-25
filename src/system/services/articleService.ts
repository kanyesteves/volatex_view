import api from '../../global/services/requests'
import type { Form } from '../type/articleType'

class articleService {

  /**
   * Busca de todos os artigos
   * @return {Array} Data: Lista com todos os artigos
   */
  getAll(): Promise<any>{
    return api.get('/articles/getAll')
  }

  /**
   * Busca um artigo conforme o ID validando a permissão
   * @param {number} id: Id do artigo para buscar as informações
   * @return {Array} Data: Informações do artigo e código de sucesso ou erro
   */
  async get(id: number): Promise<any>{
    return await api.get(`/articles/${id}`)
  }

  /**
   * Envia os campos para salvar no banco de dados
   * Utilizado na Edição e também no cadastro de novo artigo
   * @param {Object} form: campos com os dados para serem salvo no banco de dados
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async save(data: Form): Promise<any>{
    return (data.id === undefined || data.id === null)
      // Novo
      ? await api.post("/articles/register/", data)
      // Atualização
      : await api.put(`/articles/update/${data.id}`, data)
  }

  /**
   * Remove um artigo em específico
   * @param {number} id: campo com Id do artigo para ser removido
   * @return {Array} Data: informações complementares e código de sucesso ou erro
   */
  async remove(id: number): Promise<any>{
    return await api.delete(`/articles/remove/${id}`)
  }

}

export default new articleService()
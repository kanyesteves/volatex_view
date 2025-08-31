import api from '../../global/services/requests'

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

}

export default new inputOutputOfWiresService()
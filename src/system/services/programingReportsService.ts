import api from '../../global/services/requests'

class programingReportsService {

  /**
   * Busca de todos os relatórios de programações
   * @return {Array} Data: Lista com todos as programações
   */
  getAll(): Promise<any>{
    return api.get('/programingReport/getAll')
  }

}

export default new programingReportsService()
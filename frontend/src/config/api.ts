import axios from 'axios'

const api = axios.create({
  baseURL: 'http://supcif-excel.codin.gov:8800',
})

export default api

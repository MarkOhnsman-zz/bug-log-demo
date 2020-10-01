import { AppState } from '../AppState'
import Bug from '../models/Bug'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    try {
      const res = await api.get('/bugs')
      AppState.bugs = res.data.map(b => new Bug(b))
      console.log(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  async create(data) {
    try {
      const res = await api.post('/bugs', data)
      AppState.bugs.push(new Bug(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const bugsService = new BugsService()

import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfileService {
  async getProfile() {
    try {
      const res = await api.get('/profile')
      AppState.profile = res.data
      console.log(res.data)
    } catch (err) {
      console.error(err)
    }
  }
}

export const profileService = new ProfileService()

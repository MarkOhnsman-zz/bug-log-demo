import { Auth0Provider } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState'
import { audience, clientId, domain } from '../AuthConfig'
import router from '../router'
import { api } from './AxiosService'
import { bugsService } from './BugService'
import { profileService } from './ProfileService'

export const AuthService = Auth0Provider.initialize({
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async function() {
  api.defaults.headers.authorization = AuthService.bearer
  AppState.user = AuthService.user
  await profileService.getProfile()
  await bugsService.getAll()
})

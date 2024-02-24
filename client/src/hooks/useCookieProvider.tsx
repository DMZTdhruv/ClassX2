import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
interface UseCookieProviderResult {
  cookie: string
  userID: string
  userProfileId: string
}

const useCookieProvider = (): UseCookieProviderResult | null => {
  const cookie = Cookies.get('classX_user_token') || ''
  if (!cookie) {
    return null
  }
  const decodedCookie: UseCookieProviderResult = jwtDecode(cookie)

  return {
    cookie: cookie,
    userProfileId: decodedCookie.userProfileId,
    userID: decodedCookie.userID,
  }
}

export default useCookieProvider

import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

interface UseCookieProviderResult {
  userID: string
  userProfileId: string
}

export default function useCookieProvider() {
  const cookie = cookies();
  const token = cookie.get("classX_user_token");
  const decodedToken: UseCookieProviderResult = jwtDecode(token?.value || '');
  if(!decodedToken) return;

  const user = {
    userProfileId: decodedToken.userProfileId,
    userId: decodedToken.userID,
    cookie: token?.value
  }

  return user;
}

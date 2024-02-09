'use client'

import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'

interface UserDetails {
  userID: string
}

function useCoookieProvider() {
  const router = useRouter()
  const cookie = Cookies.get('classX_user_token') || ''
  if (!cookie) {
    router.push('/auth/sign-up')
  }
  const { userID }: UserDetails = jwtDecode(cookie)
  return { cookie, userID }
}

export default useCoookieProvider

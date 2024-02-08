'use client'

import Cookies from 'js-cookie'

function useCoookieProvider() {
  const cookie = Cookies.get('classX_user_token');
  return cookie
}

export default useCoookieProvider

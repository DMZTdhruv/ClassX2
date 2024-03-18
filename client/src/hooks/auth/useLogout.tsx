import { useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { Api } from '@/Constants'
import { useRouter } from 'next/navigation'

const useLogOut = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  // @ts-ignore
  const { setAuthUser } = useAuthContext()
  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${Api}/auth/logout`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
      })
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setAuthUser(null)
      localStorage.removeItem('classX_user')
      router.push('/auth/sign-in')
    } catch (error: any) {
      console.log('Failed to log out')
    } finally {
      setLoading(false)
    }
  }

  return { loading, logout }
}

export default useLogOut

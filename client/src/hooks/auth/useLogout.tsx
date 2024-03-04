import { useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'

const useLogOut = () => {
  const [loading, setLoading] = useState(false)
  // @ts-ignore
  const { setAuthUser } = useAuthContext()
  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/auth/logout`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      })
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setAuthUser(null)
      localStorage.removeItem('chat-user')
    } catch (error: any) {
      console.log('Failed to log out')
    } finally {
      setLoading(false)
    }
  }

  return { loading, logout }
}

export default useLogOut

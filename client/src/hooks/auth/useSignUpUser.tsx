'use client'

import { Api } from '@/Constants'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useSignUpUser = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const router = useRouter()

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${Api}/auth/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setMessage(data.message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      router.push('/user/create-user-profile')
      localStorage.setItem('classX_user', JSON.stringify(data.userProfile))

    } catch (error: any) {
      console.error(error.message)
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  return { loading, errorMessage, message, signUp }
}

export default useSignUpUser

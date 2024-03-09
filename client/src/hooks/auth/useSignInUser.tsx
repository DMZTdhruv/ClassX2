'use client'

import { useState } from 'react'
import { Api } from '@/Constants'
import { useRouter } from 'next/navigation'

const useSignInUser = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const signInUser = async (email: string, password: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${Api}/auth/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
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
      console.log(data.userProfile)
      localStorage.setItem('classX_user', JSON.stringify(data.userProfile))
      // router.push('/')
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

  return { loading, errorMessage, message, signInUser }
}

export default useSignInUser

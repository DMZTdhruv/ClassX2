'use client'

import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthContext {
  userId: string
  userProfileId: string
  userProfileImage: string
}

// @ts-expect-error
export const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [authUser, setAuthUser] = useState<AuthContext | null>(null)
  useEffect(() => {
    const storedUser = localStorage.getItem('classX_user')

    if (!storedUser) {
      router.push('/auth/sign-in')
      return
    }

    try {
      const value = JSON.parse(storedUser)

      if (!value.userID && !value.userProfileId) {
        router.push('/auth/sign-up')
        return
      }

      if (value.userID && !value.userProfileId) {
        router.push('/user/create-user-profile')
      }

      setAuthUser(value)
    } catch (error) {
      console.error("Error parsing 'classX_user' from localStorage:", error)
      router.push('/auth/sign-in')
    }
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// context/AuthContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthUser {
  userId: string
  userProfileId: string
  userProfileImage: string
  username: string
}

interface AuthContextType {
  authUser: AuthUser | null
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider')
  }
  return context
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
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

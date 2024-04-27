// context/AuthContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Api } from '@/Constants'

interface AuthUser {
  userId: string
  userProfileId: string
  userProfileImage: string
  username: string
}

interface AuthContextType {
  authUser: AuthUser | null
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
  isDataSynced: boolean
  setIsDataSynced: React.Dispatch<React.SetStateAction<boolean>>
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
  const [isDataSynced, setIsDataSynced] = useState<boolean>(true)

  const checkDataIsSynced = (serverValue: AuthUser) => {
    // @ts-ignore
    const localStorageValue: AuthUser = JSON.parse(localStorage.getItem('classX_user'))
    try {
      if (
        localStorageValue.userId === serverValue.userId &&
        localStorageValue.userProfileId === serverValue.userProfileId &&
        localStorageValue.userProfileImage === serverValue.userProfileImage &&
        localStorageValue.username === serverValue.username
      ) {
        console.log('Welcome to the ClassX')
      } else {
        localStorage.setItem('classX_user', JSON.stringify(serverValue))
        window.location.reload()
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const getUserProfileData = async () => {
    try {
      const res = await fetch(`${Api}/auth/authenticatedUserData`, {
        method: 'GET',
        credentials: 'include',
      })

      const { data } = await res.json()
      checkDataIsSynced(data)
    } catch (error: any) {
      console.log(error.message)
    }
  }

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

      setAuthUser(prev => value)
      getUserProfileData()
    } catch (error) {
      console.error("Error parsing 'classX_user' from localStorage:", error)
      router.push('/auth/sign-in')
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, setIsDataSynced, isDataSynced }}
    >
      {children}
    </AuthContext.Provider>
  )
}

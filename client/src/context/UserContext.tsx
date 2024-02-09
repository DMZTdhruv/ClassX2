'use client'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export const UserContext = React.createContext({})

export function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const cookie = Cookies.get('classX_user_token') || ''
  const [userDetails, setUserDetails] = useState({})
  useEffect(() => {
    const getUserDetails = async (cookie: string) => {
      const api = process.env.NEXT_PUBLIC_API
      const response = await fetch(`${api}/users/get-user-profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
      const { message } = await response.json()
      console.log(message)
      setUserDetails(message)
    }
    getUserDetails(cookie)
  }, [])

  return (
    <UserContext.Provider value={userDetails}>{children}</UserContext.Provider>
  )
}

'use client'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export function useUserProvider() {
  const cookie = Cookies.get('classX_user_token') || ''
  const [userDetails, setUserDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    try {
      const getUser = async () => {
        const user = await getUserDetails(cookie)
        setUserDetails(user)
        console.log(user)
      }
      getUser()
    } catch (err: any) {
      console.log(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { userDetails, isLoading }
}

const getUserDetails = async (cookie: string) => {
  try {
    const api = process.env.NEXT_PUBLIC_API
    const response = await fetch(`${api}/users/get-user-profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })

    if (!response.ok) throw new Error('Failed to fetch the details')
    const result = await response.json()
    return result
  } catch (err: any) {
    console.log(err.message)
  }
}

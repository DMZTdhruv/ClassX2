import { Api } from '@/Constants'
import { useState } from 'react'

const useGetUserFollowers = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const getUserFollowers = async (userProfileId: string, page: number, limit: number) => {
    setLoading(true)
    const userProfileApi = `${Api}/users/${userProfileId}/followers?page=${page}&limit=10`
    try {
      const response = await fetch(userProfileApi, {
        method: 'GET',
        credentials: 'include',
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      return data.data;
    } catch (err: any) {
      console.error(err.message)
      setErrorMessage(err.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  return { getUserFollowers, loading, errorMessage }
}

export default useGetUserFollowers

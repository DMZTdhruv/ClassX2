import { Api } from '@/Constants'
import { useState } from 'react'

const useGetUser = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const getUserProfile = async () => {
    setLoading(true)
    const userProfileApi = `${Api}/users/get-user-profile`
    try {
      const response = await fetch(userProfileApi, {
        method: 'GET',
        credentials: 'include',
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      return data.data
    } catch (err: any) {
      console.log(err.message)
      setErrorMessage(err.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  return { getUserProfile, loading, errorMessage }
}

export default useGetUser

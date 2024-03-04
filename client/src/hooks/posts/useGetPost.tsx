import { Api, IPost } from '@/Constants'
import { useState } from 'react'

const useGetPost = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const getPost = async (id: string, setPostData: (data: IPost) => void) => {
    setLoading(true)
    try {
      const res = await fetch(`${Api}/post?postId=${id}`, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setPostData(data?.data)
    } catch (error: any) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, errorMessage, getPost }
}

export default useGetPost

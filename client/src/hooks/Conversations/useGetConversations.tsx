'use client'

import { Api } from '@/Constants'
import { useEffect, useState } from 'react'

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [conversation, setConversations] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${Api}/message/chat`, {
          method: 'GET',
          credentials: 'include',
        })

        const data = await res.json()
        if (data.error) {
          throw new Error(data.error)
        }

        const users = data.data
        setConversations(data.data)
      } catch (error: any) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    getUsers()
  }, [])
  return { loading, conversation }
}

export default useGetConversations

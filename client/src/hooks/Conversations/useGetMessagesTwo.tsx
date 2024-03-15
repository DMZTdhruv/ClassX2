'use client'

import { Api } from '@/Constants'
import { useMessageContext } from '@/context/MessageContext'
import { useEffect, useState } from 'react'

const useGetMessagesTwo = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { conversation, setConversation } = useMessageContext()

  const getTotalMessages = async () => {
    try {
      const res = await fetch(`${Api}/message/chat/total-chat/${conversation._id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      return data.data
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const getMessages = async (page: number) => {
    try {
      const res = await fetch(
        `${Api}/message/chat/${conversation?._id}?page=${page}&limit=50`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      )

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      return data.data
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return { getTotalMessages, getMessages }
}

export default useGetMessagesTwo

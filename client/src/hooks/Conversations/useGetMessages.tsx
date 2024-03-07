'use client'

import { Api } from '@/Constants'
import { useMessageContext } from '@/context/MessageContext'
import useConversation from '@/zustand/useConversation'
import { useEffect, useState } from 'react'

const useGetMessages = () => {
  const [loading, setLoading] = useState<boolean>(false)
  // @ts-ignore
  const { messages, setMessages, conversation, setConversation } = useMessageContext()

  useEffect(() => {
    getMessages()
    console.log(`the information related to the conversation data`)
    console.log(conversation)
  }, [conversation])

  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${Api}/message/chat/${conversation?._id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      console.log(data.message)
      setMessages(data.data)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, messages }
}

export default useGetMessages

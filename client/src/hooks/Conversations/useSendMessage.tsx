import { Api, MessageContextProps } from '@/Constants'
import { useMessageContext } from '@/context/MessageContext'
import React, { useEffect, useState } from 'react'

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  // @ts-ignore
  const { messages, setMessages, conversation } = useMessageContext()
  const sendMessage = async (message: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${Api}/message/chat/send/${conversation._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setMessages(prev => [...prev, data.data])
      console.log(data)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}

export default useSendMessage

import { Api, MessageContextProps } from '@/Constants'
import { useAuthContext } from '@/context/AuthContext'
import { useMessageContext } from '@/context/MessageContext'
import { useState } from 'react'

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { authUser } = useAuthContext()

  // @ts-ignore
  const { messages, setMessages, conversation, replyMessage, setReplyMessage } =
    useMessageContext()
  const sendMessage = async (message: string) => {
    setLoading(true)

    try {
      const messageBody = {
        message: message,
        repliedUser: replyMessage.repliedUser,
        repliedMessage: replyMessage.repliedUserMessage,
      }

      const res = await fetch(`${Api}/message/chat/send/${conversation._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageBody }),
        credentials: 'include',
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setMessages(prev => [...prev, data.data])
      setReplyMessage({
        repliedUser: '',
        repliedUserMessage: '',
      })
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}

export default useSendMessage

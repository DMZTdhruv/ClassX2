'use client'

import { useMessageContext } from '@/context/MessageContext'
import { useSocketContext } from '@/context/SocketContext'
import { useEffect } from 'react'
const useListenNewMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages } = useMessageContext()

  useEffect(() => {
    console.log(`can you`)
    socket?.on('newMessage', newMessage => {
      console.log(newMessage)
      setMessages([...messages, newMessage])
    })
    return () => socket?.off('newMessage')
  }, [messages, socket, setMessages])
}

export default useListenNewMessages

'use client'

import { useMessageContext } from '@/context/MessageContext'
import { useSocketContext } from '@/context/SocketContext'
import { useEffect, useState } from 'react'
const useListenNewMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages } = useMessageContext()

  useEffect(() => {
    // @ts-ignore
    socket?.on('newMessage', newMessage => {
      setMessages(prev => [...prev, newMessage])
    })

    return () => {
      socket?.off('newMessage')
    }
  }, [messages, socket, setMessages])
}

export default useListenNewMessages

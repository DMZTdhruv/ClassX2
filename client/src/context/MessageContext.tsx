'use client'

import { createContext, useContext, useState } from 'react'

interface MessageContextProps {
  conversation: any
  setConversation: React.Dispatch<React.SetStateAction<any>>
  messages: any[]
  setMessages: React.Dispatch<React.SetStateAction<any[]>>
}

export const MessageContext = createContext<MessageContextProps | undefined>(undefined)

export const useMessageContext = () => {
  const context = useContext(MessageContext)

  if (!context) {
    throw new Error('useMessageContext must be used within a MessageContextProvider')
  }

  return context
}

const MessageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversation, setConversation] = useState(null)
  const [messages, setMessages] = useState<any[]>([])

  const value = {
    conversation,
    setConversation,
    messages,
    setMessages,
  }

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
}

export default MessageContextProvider

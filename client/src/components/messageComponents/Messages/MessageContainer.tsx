'use client'

import React from 'react'
import { useMessageContext } from '@/context/MessageContext'
import { MessageContextProps } from '@/Constants'
import MessageHeader from './MessageHeader'
import MessageInput from './MessageInput'
import MessagesTwo from './MessagesTwo'

const MessageContainer = () => {
  const { conversation }: MessageContextProps = useMessageContext()
  return (
    <div
      className={`flex-1 sm:pl-[100px] lg:pl-[0]  ${
        conversation ? 'scale-100' : 'scale-75 sm:scale-100'
      } messageConversation h-screen transition-all`}
    >
      {!conversation ? (
        <div className='h-screen flexCenter '>
          Send a message to start a conversation
        </div>
      ) : (
        <>
          <div className='flex flex-col h-screen max-h-screen overflow-y-hidden w-full'>
            <MessageHeader userDetails={conversation} />
            <MessagesTwo />
            <MessageInput />
          </div>
        </>
      )}
    </div>
  )
}

export default MessageContainer

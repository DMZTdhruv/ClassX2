import React, { useEffect, useRef } from 'react'
import Message from './Message'

import useGetMessages from '@/hooks/Conversations/useGetMessages'
import useListenNewMessages from '@/hooks/Conversations/useListenNewMessages'
import { useMessageContext } from '@/context/MessageContext'

interface MessageProps {
  _id: string
  senderId: string
  receiverId: string
  message: string
  createdAt: string
}

const Messages = () => {
  const lastMessageRef = useRef(null)
  const { messages, loading } = useGetMessages()
  const {conversation} = useMessageContext();
  useListenNewMessages()
  useEffect(() => {
    console.log(messages)
    // @ts-ignore
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [messages])
  // `}
  return (
    <div className={` p-2 flex-1 border overflow-y-auto`}>
      {!messages || loading ? (
        <p className='flexCenter'>Loading..</p>
      ) : (
        <div className=' flex gap-3 flex-col  overflow-y-auto'>
          {messages?.map((message: MessageProps) => {
            return (
              <div key={message._id} ref={lastMessageRef}>
                <Message message={message} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Messages

'use client'

import CustomTextArea from '@/components/shared/ChatComponents/CustomTextArea'
import { useMessageContext } from '@/context/MessageContext'
import useSendMessage from '@/hooks/Conversations/useSendMessage'
import { RxCross2 } from 'react-icons/rx'
import React, { FormEvent, useEffect, useRef, useState } from 'react'

const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage()
  const [message, setMessage] = useState<string>('')
  const { replyMessage, setReplyMessage } = useMessageContext()

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()
    if (message.trim() === '') {
      return
    }
    await sendMessage(message)
    setMessage('')
  }

  return (
    <form className='h-auto p-3 transition-all' onSubmit={handleSendMessage}>
      {replyMessage.repliedUserMessage.length !== 0 ? (
        <div className='text-[12px] mb-3 relative'>
          <span>Replying to: </span> <strong>{replyMessage.repliedUser}</strong>
          <br />
          <span className='opacity-70'>
            {' '}
            {replyMessage.repliedUserMessage.slice(0, 100)}
          </span>
          {replyMessage.repliedUserMessage.length > 100 ? '...' : ''}
          <button
            className='absolute right-0 top-0 active:scale-[0.9]'
            onClick={() => {
              setReplyMessage({
                repliedUser: '',
                repliedUserMessage: '',
              })
            }}
          >
            <RxCross2 size={20} />
          </button>
        </div>
      ) : null}
      <div className='relative'>
        <CustomTextArea
          placeholder='Write something...'
          className='bg-[#171717] max-h-[150px] w-full pl-5 outline-none focus-visible:ring-0 resize-none md:font-semibold border-none rounded-lg  py-[20px] pr-[60px] caret-violet-300'
          value={message}
          // ref={}
          onChange={e => {
            setMessage(e.target.value)
          }}
        />
        <button
          className={`absolute
          ${
            loading && 'animate-pulse opacity-25'
          } w-[30px] top-[45%] translate-y-[-50%] right-6 text-primary font-semibold`}
          type='submit'
          disabled={loading}
        >
          Send
        </button>
      </div>
    </form>
  )
}

export default MessageInput

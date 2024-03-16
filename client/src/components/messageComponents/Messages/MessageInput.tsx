'use client'

import CustomTextArea from '@/components/shared/ChatComponents/CustomTextArea'
import useSendMessage from '@/hooks/Conversations/useSendMessage'
import React, { FormEvent, useEffect, useState } from 'react'

const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage()
  const [message, setMessage] = useState<string>('')

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()
    if (message.trim() === '') {
      return
    }
    await sendMessage(message)
    setMessage('')
  }

  return (
    <form className='h-auto p-3 relative' onSubmit={handleSendMessage}>
      <CustomTextArea
        placeholder='Write something...'
        className='bg-[#171717] max-h-[150px] w-full pl-5 outline-none focus-visible:ring-0 resize-none md:font-semibold border-none rounded-lg  py-[20px] pr-[60px] caret-violet-300'
        value={message}
        onChange={e => {
          setMessage(e.target.value)
        }}
      />
      <button
        className={`absolute rotate-[-6deg] 
          ${
            loading && 'animate-pulse opacity-25'
          } w-[30px] top-[45%] translate-y-[-50%] right-6 text-primary font-semibold`}
        type='submit'
        disabled={loading}
      >
        <img src='/submit.svg' className='h-[25px] w-[30px] object-cover' />
      </button>
    </form>
  )
}

export default MessageInput

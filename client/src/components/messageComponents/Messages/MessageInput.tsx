'use client'

import { Textarea } from '@/components/ui/textarea'
import useSendMessage from '@/hooks/Conversations/useSendMessage'
import React, { FormEvent, useState } from 'react'

const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage()
  const [message, setMessage] = useState<string>('')
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()
    await sendMessage(message)
  }

  return (
    <form className='h-auto p-3 relative' onSubmit={handleSendMessage}>
      <Textarea
        placeholder='Enter your message'
        className='bg-[#171717] min-h-[50px] h-auto outline-none focus-visible:ring-0 resize-none md:font-semibold border-none rounded-lg  py-[20px] pr-[60px]'
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className='absolute top-[50%] translate-y-[-50%] right-6 text-primary font-semibold'
        type='submit'
      >
        {loading ? 'sending..' : 'send'}
      </button>
    </form>
  )
}

export default MessageInput

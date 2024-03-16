import React, { use, useEffect, useRef, useState } from 'react'
import Message from './Message'

import useListenNewMessages from '@/hooks/Conversations/useListenNewMessages'
import { useMessageContext } from '@/context/MessageContext'
import { Skeleton } from '@/components/ui/skeleton'
import { useInView } from 'react-intersection-observer'
import useGetMessagesTwo from '@/hooks/Conversations/useGetMessagesTwo'

interface MessageProps {
  _id: string
  senderId: string
  receiverId: string
  message: string
  createdAt: string
}

const MessagesTwo = () => {
  useListenNewMessages()

  const { getMessages, getTotalMessages } = useGetMessagesTwo()
  const { messages, setMessages, conversation } = useMessageContext()

  // states
  const [loading, setLoading] = useState<boolean>(true)
  const [totalMessages, setTotalMessages] = useState<number>(0)
  const [previousMessages, setPreviousMessages] = useState<MessageProps[]>([])
  const [allMessagesReceived, setAllMessageReceived] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [previousMessageIndex, setPreviousMessageIndex] = useState<number>(0)

  // refs
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView()
  const lastPreviousMessageRef = useRef<HTMLDivElement[]>([])

  // UseEffects
  useEffect(() => {
    getConversationTotalMessageCount()
  }, [conversation])

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ block: 'center' })
    }
  }, [messages])

  // ignore the animation of index is 0
  useEffect(() => {
    if (previousMessageIndex === 0 || page === 0 || previousMessages?.length === 0)
      return
    lastPreviousMessageRef.current[previousMessageIndex - 1].scrollIntoView({
      block: 'start',
    })
    console.log(lastPreviousMessageRef.current[previousMessageIndex - 1])
  }, [page])

  useEffect(() => {
    setAllMessageReceived(previousMessages?.length + messages.length >= totalMessages)
  }, [messages, previousMessages])

  useEffect(() => {}, [previousMessages])

  useEffect(() => {
    if (inView) {
      loadPreviousMessages()
    }
  }, [inView])

  const loadPreviousMessages = async () => {
    const nextPage = page + 1
    const conversationPreviousMessages = await getMessages(nextPage)
    console.log(conversationPreviousMessages)
    setPreviousMessageIndex(conversationPreviousMessages?.length)
    setPreviousMessages(prev => [...conversationPreviousMessages, ...prev])
    setPage(nextPage)
  }

  // handlers
  const getConversationTotalMessageCount = async () => {
    setLoading(true)
    setMessages([])
    setPreviousMessages([])
    setTotalMessages(0)
    setPage(1)
    const totalCount = await getTotalMessages()
    setTotalMessages(totalCount)
    const messages = await getMessages(1)
    setMessages(messages)
    setLoading(false)
    setAllMessageReceived(previousMessages?.length >= totalMessages)
  }

  return (
    <div className={`p-2 flex-1 border-y overflow-y-auto`}>
      {loading ? (
        <MessageLoadingUiSkeleton />
      ) : (
        <div className='flex gap-3 flex-col'>
          {totalMessages === 0 && (
            <p className='text-center my-5'>
              Enter a message to start the conversation ⭐
            </p>
          )}

          {totalMessages > 0 && (
            <div className='w-full justify-center flex animate-in fade-in-0'>
              {allMessagesReceived || messages.length === totalMessages ? (
                <p className='my-5'>
                  Congratulations 🎉 you have checked all the messages!!
                </p>
              ) : (
                <div className='loader my-3' ref={ref}></div>
              )}
            </div>
          )}

          {previousMessages?.length > 0 && (
            <div className='flex flex-col gap-3 w-full'>
              {previousMessages?.map((message: MessageProps, index: number) => (
                <div
                  key={message._id}
                  ref={el => {
                    if (el) {
                      lastPreviousMessageRef.current[index] = el
                    }
                  }}
                >
                  <Message message={message} />
                </div>
              ))}
            </div>
          )}

          {messages?.length > 0 && (
            <div className='flex flex-col gap-3 w-full'>
              {messages?.map((message: MessageProps, index: number) => (
                <div
                  key={message._id}
                  ref={index === messages?.length - 1 ? lastMessageRef : null}
                >
                  <Message message={message} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MessagesTwo

const MessageLoadingUiSkeleton = () => {
  return (
    <section className='flex h-full animate-in fade-in-0 justify-end flex-col gap-3 px-[16px]'>
      <div className='flex w-full justify-end items-center gap-3'>
        <Skeleton className='w-[20%] h-10 rounded-t-[20px] rounded-bl-[20px]' />
        <Skeleton className='w-10 h-10 rounded-full' />
      </div>
      <div className='flex w-full justify-end items-center gap-3'>
        <Skeleton className='w-[70%] h-16 rounded-t-[20px] rounded-bl-[20px]' />
        <Skeleton className='w-10 h-10 rounded-full' />
      </div>
      <div className='flex w-full justify-start items-center gap-3'>
        <Skeleton className='w-10 h-10 rounded-full' />
        <Skeleton className='w-[60%] h-10 rounded-t-[20px] rounded-br-[20px]' />
      </div>
      <div className='flex w-full justify-end items-center gap-3'>
        <Skeleton className='w-[70%] h-10 rounded-t-[20px] rounded-bl-[20px]' />
        <Skeleton className='w-10 h-10 rounded-full' />
      </div>
      <div className='flex w-full justify-start items-center gap-3'>
        <Skeleton className='w-10 h-10 rounded-full' />
        <Skeleton className='w-[60%] h-10 rounded-t-[20px] rounded-br-[20px]' />
      </div>
      <div className='flex w-full justify-start items-center gap-3'>
        <Skeleton className='w-10 h-10 rounded-full' />
        <Skeleton className='w-[60%] h-16 rounded-t-[20px] rounded-br-[20px]' />
      </div>
      <div className='flex w-full justify-end items-center gap-3'>
        <Skeleton className='w-[20%] h-10 rounded-t-[20px] rounded-bl-[20px]' />
        <Skeleton className='w-10 h-10 rounded-full' />
      </div>
    </section>
  )
}

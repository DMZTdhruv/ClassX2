'use client'

import MessageContainer from '@/components/messageComponents/Messages/MessageContainer'
import MessageSideBar from '@/components/messageComponents/Sidebar/MessageSideBar'
import useGetConversations from '@/hooks/Conversations/useGetConversations'
import MessageContextProvider, { useMessageContext } from '@/context/MessageContext'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import MessageSkeleton from '@/components/Skeletons/MessageSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

const page = () => {
  const { loading, conversation: chatFriends } = useGetConversations()
  // @ts-ignore
  const { authUser } = useAuthContext()
  useEffect(() => {
    console.log(authUser)
  }, [authUser])
  if (loading) {
    return (
      <div className='w-full flex h-screen gap-3 p-[10px] '>
        <MessageSkeleton />
        <Skeleton className='flex-1 h-full rounded-xl hidden sm:block' />
      </div>
    )
  }

  console.log(chatFriends)
  return (
    <MessageContextProvider>
      <div className={`flex w-full overflow-x-hidden`}>
        <MessageSideBar sideBarUsers={chatFriends} />
        <MessageContainer />
      </div>
    </MessageContextProvider>
  )
}

export default page

import MessageSkeleton from '@/components/Skeletons/MessageSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
  return (
    <div className='w-full flex h-screen gap-3 p-[10px] '>
      <MessageSkeleton />
      <Skeleton className='flex-1 h-full rounded-xl hidden sm:block' />
    </div>
  )
}

export default loading

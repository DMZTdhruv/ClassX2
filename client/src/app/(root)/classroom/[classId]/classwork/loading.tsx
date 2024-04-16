import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full flex justify-center'>
      <div className='lg:w-[80%] flex-col md:w-[90%] gap-3 w-full md:p-[16px] flex items-center'>
        <div className='space-y-2 w-full'>
          <Skeleton className=' h-20 w-full rounded-[20px]' />
          <div className='flex items-center gap-3 p-3'>
            <Skeleton className='h-[50px] w-[50px] rounded-full' />
            <Skeleton className='h-4 w-[50%]' />
          </div>
          <div className='flex items-center gap-3 p-3'>
            <Skeleton className='h-[50px] w-[50px] rounded-full' />
            <Skeleton className='h-4 w-[50%]' />
          </div>
          <div className='flex items-center gap-3 p-3'>
            <Skeleton className='h-[50px] w-[50px] rounded-full' />
            <Skeleton className='h-4 w-[50%]' />
          </div>
        </div>
        <div className='space-y-2 w-full'>
          <Skeleton className=' h-20 w-full rounded-[20px]' />
          <div className='flex items-center gap-3 p-3'>
            <Skeleton className='h-[50px] w-[50px] rounded-full' />
            <Skeleton className='h-4 w-[50%]' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading

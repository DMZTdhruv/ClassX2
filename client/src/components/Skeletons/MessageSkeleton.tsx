import React from 'react'
import { Skeleton } from '../ui/skeleton'

const MessageSkeleton = () => {
  return (
    <div className='lg:w-[380px] flex flex-col h-full sm:w-[100px] w-full gap-3 lg:pt-[50px] lg:px-[32px] p-[16px] '>
      <div className='h-[90px]  w-full sm:hidden  lg:flex'>
        <Skeleton className='w w-full h-[30px] rounded-xl mb-3' />
      </div>
      <div className='flex justify-between sm:hidden lg:flex'>
        <Skeleton className='w-[100px] h-[20px] rounded-xl ' />
        <Skeleton className='w-[100px] h-[20px] rounded-xl ' />
      </div>
      <div className='mt-[20px] w-full flex flex-col  gap-3'>
        <div className='flex items-center sm:justify-center lg:justify-start  gap-2'>
          <div>
            <Skeleton className='w-[50px] h-[50px] rounded-full ' />
          </div>
          <div className='flex gap-3 flex-col sm:hidden lg:flex'>
            <Skeleton className='w-[100px] h-[15px] rounded-xl ' />
            <Skeleton className='w-[150px] h-[12px] rounded-xl ' />
          </div>
        </div>
        <div className='flex items-center sm:justify-center lg:justify-start gap-2'>
          <div>
            <Skeleton className='w-[50px] h-[50px] rounded-full ' />
          </div>
          <div className='flex gap-3 flex-col sm:hidden lg:flex'>
            <Skeleton className='w-[100px] h-[15px] rounded-xl ' />
            <Skeleton className='w-[150px] h-[12px] rounded-xl ' />
          </div>
        </div>
        <div className='flex items-center sm:justify-center lg:justify-start gap-2'>
          <div>
            <Skeleton className='w-[50px] h-[50px] rounded-full ' />
          </div>
          <div className='flex gap-3 flex-col sm:hidden lg:flex'>
            <Skeleton className='w-[100px] h-[15px] rounded-xl ' />
            <Skeleton className='w-[150px] h-[12px] rounded-xl ' />
          </div>
        </div>
        <div className='flex items-center sm:justify-center lg:justify-start gap-2'>
          <div>
            <Skeleton className='w-[50px] h-[50px] rounded-full ' />
          </div>
          <div className='flex gap-3 flex-col sm:hidden lg:flex'>
            <Skeleton className='w-[100px] h-[15px] rounded-xl ' />
            <Skeleton className='w-[150px] h-[12px] rounded-xl ' />
          </div>
        </div>
        <div className='flex items-center sm:justify-center lg:justify-start gap-2'>
          <div>
            <Skeleton className='w-[50px] h-[50px] rounded-full ' />
          </div>
          <div className='flex gap-3 flex-col sm:hidden lg:flex'>
            <Skeleton className='w-[100px] h-[15px] rounded-xl ' />
            <Skeleton className='w-[150px] h-[12px] rounded-xl ' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageSkeleton

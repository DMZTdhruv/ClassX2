import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full p-[16px] mt-4 md:p-[30px]'>
      <div className='w-full'>
        <Skeleton className='h-[86px] w-full rounded-xl' />
        <div className='grid grid-cols-2 sm:grid-cols-2 mt-6 md:grid-cols-3  w-full lg:grid-cols-4 gap-4 '>
          <Skeleton className='w-full h-[120px] rounded-xl' />
          <Skeleton className='w-full h-[120px] rounded-xl' />
          <Skeleton className='w-full h-[120px] rounded-xl' />
          <Skeleton className='w-full h-[120px] rounded-xl' />
          <Skeleton className='w-full h-[120px] rounded-xl' />
        </div>
      </div>
    </div>
  )
}

export default Loading

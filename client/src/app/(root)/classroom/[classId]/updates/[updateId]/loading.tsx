import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingSkeleton = () => {
  return (
    <div className='px-[16px] pt-[15px] pb-[60px] flex flex-col gap-3'>
      <Skeleton className='h-[50px] w-full  rounded-[20px] ' />
      <div className='space-y-2'>
        <Skeleton className='h-[50px] w-full  rounded-[20px] ' />
        <Skeleton className='h-[250px] w-full  rounded-[20px] ' />
        <Skeleton className='h-[250px] w-[250px]  rounded-[20px] ' />
      </div>
    </div>
  )
}

export default LoadingSkeleton

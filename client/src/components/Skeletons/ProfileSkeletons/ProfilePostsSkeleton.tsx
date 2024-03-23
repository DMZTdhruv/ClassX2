import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const ProfilePostsSkeleton = () => {
  return (
    <div className='px-1 w-full'>
      <Skeleton className='md:w-[90%]  w-full h-screen md:mt-[70px] mt-3 p-[1px] ' />
    </div>
  )
}

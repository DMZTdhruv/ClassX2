import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const page = () => {
  return (
    <div className='w-full space-y-2 '>
      <div className='lg:w-[80%] w-full  flex flex-col items-center '>
        <Skeleton className='h-[40px] md:mt-[50px] mt-[10px]  rounded-full w-full ' />
        <div className='grid grid-cols-3 gap-3 p-[6px] md:mt-[50px]'>
          <Skeleton className='h-aut aspect-square max-w-[300px]' />
          <Skeleton className='h-aut aspect-square max-w-[300px]' />
          <Skeleton className='h-aut aspect-square max-w-[300px]' />
          <Skeleton className='h-aut aspect-square max-w-[300px]' />
          <Skeleton className='h-aut aspect-square max-w-[300px]' />
          <Skeleton className='h-aut aspect-square max-w-[300px]' />
          <Skeleton className='h-aut aspect-square max-w-[300px]' />
          <Skeleton className='h-aut aspect-square max-w-[300px]' />
        </div>
      </div>
    </div>
  )
}

export default page

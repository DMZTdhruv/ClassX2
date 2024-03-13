import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const page = () => {
  return (
    <div className='w-full space-y-2 flex flexCenter h-screen'>
      <div className='lg:w-[80%] w-full h-full flex flex-col items-center border '>
        <Skeleton className='h-[40px] md:mt-[50px] mt-[10px]  rounded-full w-full ' />
        <div className='grid grid-cols-3 gap-3 p-[6px] max-w-[904px] md:mt-[50px]'>
          <Skeleton className='aspect-square lg:w-[280px] md:w-[200px] sm:w-[150px] w-[120px] ' />
          <Skeleton className='aspect-square lg:w-[280px] md:w-[200px] sm:w-[150px] w-[120px] ' />
          <Skeleton className='aspect-square lg:w-[280px] md:w-[200px] sm:w-[150px] w-[120px] ' />
          <Skeleton className='aspect-square lg:w-[280px] md:w-[200px] sm:w-[150px] w-[120px] ' />
          <Skeleton className='aspect-square lg:w-[280px] md:w-[200px] sm:w-[150px] w-[120px] ' />
        </div>
      </div>
    </div>
  )
}

export default page

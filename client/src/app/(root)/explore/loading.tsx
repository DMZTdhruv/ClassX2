import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const page = () => {
  return (
    <div className='w-full space-y-2 flex flexCenter h-auto overflow-y-auto'>
      <div className='lg:w-[80%] w-full h-full flex flex-col items-center '>
        <div className='px-[10px] h-[40px]  md:mt-[50px] mt-[10px] w-full'>
          <Skeleton className='h-[40px] md:rounded-full rounded-[10px] w-full' />
        </div>
        <div className='md:mt-[50px] mt-2 p-[1px]  grid grid-cols-3 max-w-[904px] gap-[1px] '>
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
          <Skeleton className='max-h-[300px] aspect-square  xl:w-[19.5vw] lg:w-[18.9vw] md:w-[27.5vw] sm:w-[26.3vw] w-[32.5vw]' />
        </div>
      </div>
    </div>
  )
}

export default page

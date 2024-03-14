import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <section className='h-full w-full relative md:mt-[0px]'>
      <div className='w-full p-[22px]'>
        <Skeleton className='h-[173px] w-full  rounded-[20px] ' />
      </div>
      <div className='flex gap-[22px] px-[22px] w-full'>
        <Skeleton className='w-[200px] hidden md:block active:scale-[0.99] h-[200px]   rounded-[20px] p-4' />
        <div className='flex-1 w-full space-y-[22px]'>
          <Skeleton className='h-[250px] p-[24px]  rounded-[20px]' />
          <Skeleton className='h-[250px] p-[24px]  rounded-[20px]' />
        </div>
      </div>
    </section>
  )
}

export default Loading

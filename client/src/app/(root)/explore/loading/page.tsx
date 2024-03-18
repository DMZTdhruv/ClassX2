import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const page = () => {
  return (
    <div className='w-full space-y-2 flex flexCenter h-auto overflow-y-auto'>
      <div className='lg:w-[80%] w-full h-full flex flex-col items-center '>
        <div className='px-[10px] md:h-[40px] h-[35px]  md:mt-[50px] mt-[10px] w-full'>
          <Skeleton className='md:h-[40px] h-[35px] md:rounded-full rounded-[10px] w-full' />
        </div>
        <Skeleton className='md:w-[90%] w-full h-screen md:mt-[70px] mt-3 p-[1px] ' />
      </div>
    </div>
  )
}

export default page

import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingUserProfile = () => {
  return (
    <div className='w-full pb-8 flex justify-center '>
      <div className='lg:w-[80%] w-full h-full lg:px-0 px-[16px]'>
        <header className=' sm:mt-[36px] hidden sm:block'>
          <Skeleton className='rounded-[15px] h-[50px]' />
        </header>
        <section className='sm:mt-[90px] mt-[130px]'>
          <Skeleton className='rounded-[15px] sm:h-[108px] h-[148px] w-full' />
          <div className='mt-[42px] flex flex-col gap-6 sm:pt-0 pt-[46px] '>
            <div className='flex gap-2 flex-col'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='rounded-[15px]  active:scale-[0.99] h-[20px]  w-full  p-4' />
            </div>
            <div className='flex gap-2 flex-col'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='rounded-[15px]  active:scale-[0.99] h-[20px]  w-full  p-4' />
            </div>
            <div className='flex gap-2 flex-col'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='rounded-[15px]  active:scale-[0.99] h-[65px]  w-full  p-4' />
            </div>
            <div className='flex gap-2 flex-col'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='rounded-[15px]  active:scale-[0.99] h-[20px]  w-full  p-4' />
            </div>
            <div className='flex gap-2 flex-col'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='rounded-[15px]  active:scale-[0.99] h-[20px]  w-full  p-4' />
            </div>
          </div>
          <Skeleton className='rounded-[15px] mt-4 active:scale-[0.99] h-[35px] w-[100px]    p-4' />
        </section>
      </div>
    </div>
  )
}

export default LoadingUserProfile

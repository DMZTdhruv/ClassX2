import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <section className='h-full w-full relative md:mt-[0px]'>
      <header className='flex w-full border-b border-primary/10 items-center justify-between gap-3 px-[16px] h-[60px]'>
        <Skeleton className=' w-28 h-8' />
        <Skeleton className=' w-8 h-8 rounded-full' />
      </header>
      <div className='p-[32px] w-full items-center gap-3 flex flex-wrap'>
        <Skeleton className='sm:w-[380px]  active:scale-[0.99] h-[200px]  w-full md:w-[400px] rounded-md p-4' />
        <Skeleton className='sm:w-[380px]  active:scale-[0.99] h-[200px]  w-full md:w-[400px] rounded-md p-4' />
      </div>
    </section>
  )
}

export default Loading

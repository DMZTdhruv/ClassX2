import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
  return (
    <header>
      <div className='flex w-full items-center border-b border-primary/10 justify-between gap-3 px-[16px] h-[60px]'>
        <div className='flex gap-2'>
          <Skeleton className=' w-8 h-8' />
          <Skeleton className=' w-28 h-8' />
        </div>
        <Skeleton className=' w-8 h-8 rounded-full' />
      </div>
      <div className='flex w-full items-center border-b border-primary/10 justify-between gap-3 px-[16px] h-[60px]'>
        <div className='flex gap-2'>
          <Skeleton className=' w-28 h-8' />
          <Skeleton className=' w-28 h-8' />
          <Skeleton className=' w-28 h-8' />
        </div>
      </div>
    </header>
  )
}

export default loading

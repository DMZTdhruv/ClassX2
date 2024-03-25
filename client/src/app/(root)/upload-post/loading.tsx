import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='flex  lg:px-[50px] lg:h-screen mt-[80px] lg:gap-[20px] flex-col lg:flex-row justify-center sm:px-[16px] w-full lg:mt-0 md:mt-[30px] px-[16px] space-y-3 items-center'>
      <div className='w-[80%] flex items-center  justify-center flex-col gap-3'>
        <Skeleton className='h-[400px] aspect-[4/3] w-[100%] rounded-xl' />
      </div>
      <div className='flex flex-col items-center space-y-3 w-full'>
        <div className=' flex flex-col gap-5 lg:w-full w-[80%]'>
          <Skeleton className='h-4 w-full' />
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
          <div className='flex gap-2 flex-col'>
            <Skeleton className='rounded-[10px]  active:scale-[0.99] h-[20px]  w-full  p-4' />
          </div>
        </div>
      </div>
    </div>
  )
}

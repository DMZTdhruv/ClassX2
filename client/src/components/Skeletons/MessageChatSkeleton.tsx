import { Skeleton } from "../ui/skeleton"

export const MessageIsLoadingUiSkeleton = () => {
  return (
    <section className='flex h-full animate-in fade-in-0 justify-end flex-col gap-3 px-[16px]'>
      <div className='flex w-full justify-end items-center gap-3'>
        <Skeleton className='w-[20%] h-10 rounded-t-[20px] rounded-bl-[20px]' />
        <Skeleton className='w-10 h-10 rounded-full' />
      </div>
      <div className='flex w-full justify-end items-center gap-3'>
        <Skeleton className='w-[70%] h-16 rounded-t-[20px] rounded-bl-[20px]' />
        <Skeleton className='w-10 h-10 rounded-full' />
      </div>
      <div className='flex w-full justify-start items-center gap-3'>
        <Skeleton className='w-10 h-10 rounded-full' />
        <Skeleton className='w-[60%] h-10 rounded-t-[20px] rounded-br-[20px]' />
      </div>
      <div className='flex w-full justify-end items-center gap-3'>
        <Skeleton className='w-[70%] h-10 rounded-t-[20px] rounded-bl-[20px]' />
        <Skeleton className='w-10 h-10 rounded-full' />
      </div>
      <div className='flex w-full justify-start items-center gap-3'>
        <Skeleton className='w-10 h-10 rounded-full' />
        <Skeleton className='w-[60%] h-10 rounded-t-[20px] rounded-br-[20px]' />
      </div>
      <div className='flex w-full justify-start items-center gap-3'>
        <Skeleton className='w-10 h-10 rounded-full' />
        <Skeleton className='w-[60%] h-16 rounded-t-[20px] rounded-br-[20px]' />
      </div>
      <div className='flex w-full justify-end items-center gap-3'>
        <Skeleton className='w-[20%] h-10 rounded-t-[20px] rounded-bl-[20px]' />
        <Skeleton className='w-10 h-10 rounded-full' />
      </div>
    </section>
  )
}

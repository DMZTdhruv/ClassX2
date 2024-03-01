import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='flex flex-col sm:px-[16px] mt-[80px] md:mt-[30px] px-[16px] space-y-3 items-center'>
      <Skeleton className='h-4 w-[250px]' />
      <Skeleton className='h-[500px] max-w-[548px] w-[100%] rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
      <div className='flex flex-col space-y-3'>
        <Skeleton className='h-10 max-w-[548px] w-[100%]' />
        <Skeleton className='h-20 max-w-[548px] w-[100%]' />
      </div>
    </div>
  )
}

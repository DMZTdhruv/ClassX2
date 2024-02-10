import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='flex flex-col space-y-3 mt-[30px] items-center'>
      <Skeleton className='h-4 w-[250px]' />
      <Skeleton className='h-[500px] min-w-[548px] rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
      <div className='flex flex-col space-y-3'>
        <Skeleton className='h-10 min-w-[548px]' />
        <Skeleton className='h-20 min-w-[548px]' />
      </div>
    </div>
  )
}

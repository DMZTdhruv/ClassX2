import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='flex flex-col space-y-3 m-[20px] mt-[30px] items-center'>
      <Skeleton className='h-[550px] w-full md:w-[584px] rounded-xl' />
    </div>
  )
}

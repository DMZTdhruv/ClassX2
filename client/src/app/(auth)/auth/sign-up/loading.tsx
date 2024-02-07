import { Skeleton } from '@/components/ui/skeleton'

function SkeletonCard() {
  return (
    <div className='gradient p-[36px] flex items-center justify-center'>
      <div className='flex items-center flex-col md:w-[30%] mb-[5rem] sm:w-[50%] w-[100%] gap-[12px] '>
        <Skeleton className='h-12 w-12 mb-[12px] rounded-full' />
        <div className='w-full flex flex-col gap-5'>
          <Skeleton className='h-8  w-[100%]' />
          <Skeleton className='h-8  w-[100%]' />
        </div>
        <Skeleton className='px-6 mt-[15px] py-3 w-[20%] rounded-full' />
      </div>
    </div>
  )
}

export default SkeletonCard

import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='flex flex-col mt-[80px] md:mt-[30px] px-[16px] space-y-3  items-center'>
      <Skeleton
        className='rounded-full'
        style={{
          minHeight: '124px',
          minWidth: '124px',
          aspectRatio: '1 / 1',
        }}
      />
      <div className='space-y-2 flex items-center flex-col'>
        <Skeleton className='h-10 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
        <Skeleton className=' h-16 md:w-[150%] w-[100%]' />
        <div className='flex gap-[10px]'>
          <Skeleton className=' h-6 w-[100px]' />
        </div>
      </div>
      <Skeleton className='h-[500px] w-[100%] rounded-xl' />
    </div>
  )
}

import React from 'react'
import { Skeleton } from '../ui/skeleton'

interface IClassroomPost {
  postedBy: {
    username: string
    userProfileImage: string
  }
  createdAt: string
  title: string
  description: string
}

const ClassroomPost = ({ classroomPost }: { classroomPost: IClassroomPost }) => {
  const { postedBy, createdAt, title, description } = classroomPost
  return (
    <article className=' h-fit p-[24px] bg-neutral-900  rounded-[20px]'>
      <div className='flex items-center gap-[10px]'>
        <Skeleton className='w-[48px] h-[48px] rounded-full aspect-square' />
        <div className='flex items-start flex-col'>
          <p className='text-[15px] font-semibold'>{postedBy.username}</p>
          <p className='opacity-50 text-[13px]'>{createdAt}</p>
        </div>
      </div>
      <p className='pt-[18px]'>{description}</p>
    </article>
  )
}

export default ClassroomPost

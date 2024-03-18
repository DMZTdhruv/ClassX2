import React from 'react'
import Image from 'next/image'
import { formatDate } from '@/utils'

interface IClassroomUpdate {
  postedBy: {
    username: string
    userProfileImage: string
  }
  createdAt: string
  title?: string
  description: string
}

const ClassroomUpdate = ({
  classroomUpdate,
}: {
  classroomUpdate: IClassroomUpdate
}) => {
  const { postedBy, createdAt, title, description } = classroomUpdate

  const formatedDate = formatDate(new Date(createdAt))
  return (
    <article className=' h-fit p-[24px] bg-neutral-900  rounded-[20px]'>
      <div className='flex items-center gap-[10px]'>
        <Image
          src={postedBy.userProfileImage || ''}
          alt='User profile image'
          height={48}
          width={48}
          className='aspect-square rounded-full'
          unoptimized
        />
        <div className='flex items-start flex-col'>
          <p className='text-[15px] font-semibold'>{postedBy.username}</p>
          <p className='opacity-50 text-[13px]'>Posted {formatedDate} ago</p>
        </div>
      </div>
      <p className='pt-[18px]'>{description}</p>
    </article>
  )
}

export default ClassroomUpdate

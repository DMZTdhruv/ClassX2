'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { formatDate } from '@/utils'
import Link from 'next/link'

interface IClassroomUpdate {
  _id: string
  postedBy: {
    username: string
    userProfileImage: string
  }
  createdAt: string
  title?: string
  description: string
  attachments: string[] | undefined
}

const ClassroomUpdate = ({
  classroomUpdate,
  classId,
}: {
  classroomUpdate: IClassroomUpdate
  classId?: string
}) => {
  const { _id, postedBy, createdAt, title, description, attachments } = classroomUpdate
  const formatedDate = formatDate(new Date(createdAt))

  return (
    <>
      <Link
        href={`/classroom/${classId}/updates/${_id}`}
        className='h-fit p-[24px] bg-neutral-900  rounded-[20px]'
      >
        <article>
          <div className='flex items-center gap-[10px]'>
            <Image
              src={postedBy.userProfileImage || ''}
              alt='User profile image'
              height={48}
              width={48}
              className='aspect-square rounded-full object-cover'
              unoptimized
            />
            <div className='flex items-start flex-col'>
              <p className='text-[15px] font-semibold'>{postedBy.username}</p>
              <p className='opacity-50 text-[13px]'>Posted {formatedDate} ago</p>
            </div>
          </div>
          <p className='pt-[18px] text-left'>
            {description.slice(0, 150)}
            <span>{description.length > 150 && '...'}</span>
          </p>
        </article>
      </Link>
    </>
  )
}

export default ClassroomUpdate

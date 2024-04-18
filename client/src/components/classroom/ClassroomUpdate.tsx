'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { formatDate } from '@/utils'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { BsThreeDots } from 'react-icons/bs'
import { Button } from '../ui/button'
import useDeleteUpdate from '@/hooks/classroom/useDeleteUpdate'

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
  isAdmin,
}: {
  classroomUpdate: IClassroomUpdate
  classId?: string
  isAdmin?: boolean
}) => {
  const { _id, postedBy, createdAt, title, description } = classroomUpdate
  const formatedDate = formatDate(new Date(createdAt))
  const { loading, deleteUpdate, error } = useDeleteUpdate()

  return (
    <>
      <div className='h-fit p-[24px] bg-neutral-900  rounded-[20px]'>
        <article>
          <div className='flex items-center justify-between gap-[10px] pb-3'>
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
                <p className='opacity-50 text-[13px]' suppressHydrationWarning>
                  Posted {formatedDate} ago
                </p>
              </div>
            </div>
            {isAdmin && (
              <Dialog>
                <DialogTrigger>
                  <BsThreeDots />
                </DialogTrigger>
                <DialogContent className=' bg-neutral-950 border border-neutral-800'>
                  <DialogHeader>
                    <DialogTitle>Delete update</DialogTitle>
                    <DialogDescription>
                      Do you want to delete this update?
                    </DialogDescription>
                    <DialogFooter className='flex items-center'>
                      {error && <div className='text-red-500'>{error}</div>}
                      <Button
                        className={`${loading ? 'animate-pulse' : ''} font-bold`}
                        disabled={loading}
                        onClick={() => deleteUpdate(classId || '', _id)}
                      >
                        {loading ? 'Deleting..' : 'Delete'}
                      </Button>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <Link href={`/classroom/${classId}/updates/${_id}`} className=' text-left'>
            <pre className='text-wrap font-poppins'>
              {title && (
                <span className='font-bold text-lg'>
                  {title} <br />
                </span>
              )}

              {description.slice(0, 2000)}
            </pre>
            <span>{description.length > 2000 && '...'}</span>
          </Link>
        </article>
      </div>
    </>
  )
}

export default ClassroomUpdate

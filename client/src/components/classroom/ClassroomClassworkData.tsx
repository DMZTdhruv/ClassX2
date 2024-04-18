import Classwork from '@/app/(root)/classroom/[classId]/classwork/page'
import { getClassroomClassworkData } from '@/app/(root)/classroom/classroomActions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ClassroomClassworkDeleteModal from './ClassroomClassworkDelete'

interface IClassroomWork {
  _id: string
  classId: string
  title: string
  description: string
  attachments: string[]
  topic: string
  postedBy: string
}

const ClassroomClassworkData = async ({
  topic,
  classId,
  cookie,
  isAdmin,
}: {
  topic: string
  classId: string
  cookie: string
  isAdmin: boolean
}) => {
  const classWorkData = await getClassroomClassworkData(cookie, classId, topic)
  return (
    <div className='flex flex-col gap-2 mt-2'>
      {classWorkData.map((classwork: IClassroomWork) => {
        console.log(classwork)
        return (
          <div
            className='h-fit flex items-center w-full p-2 justify-between hover:bg-neutral-900 gap-2  rounded-[20px]'
            key={classwork._id}
          >
            <Link
              href={`/classroom/${classId}/classwork/${classwork._id}`}
              className='flex flex-1 items-center gap-2 '
            >
              <div className='flex items-center justify-center rounded-full p-2 bg-neutral-800 '>
                <Image
                  src={`/assets/material.svg`}
                  width={20}
                  height={20}
                  alt='material-icon'
                  className='md:min-w-[25px] min-w-[25px] aspect-square md:min-h-[25px] min-h-[25px] '
                  unoptimized
                />
              </div>
              <p className='font-semibold text-wrap'>{classwork.title}</p>
            </Link>
            {isAdmin && (
              <ClassroomClassworkDeleteModal
                classId={classId}
                creatorId={classwork.postedBy}
                classworkId={classwork._id}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ClassroomClassworkData

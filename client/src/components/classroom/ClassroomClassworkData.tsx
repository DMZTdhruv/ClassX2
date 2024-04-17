import Classwork from '@/app/(root)/classroom/[classId]/classwork/page'
import { getClassroomClassworkData } from '@/app/(root)/classroom/classroomActions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IClassroomWork {
  _id: string
  classId: string
  title: string
  description: string
  attachments: string[]
  topic: string
}

const ClassroomClassworkData = async ({
  topic,
  classId,
  cookie,
}: {
  topic: string
  classId: string
  cookie: string
}) => {
  const classWorkData = await getClassroomClassworkData(cookie, classId, topic)
  return (
    <div className='flex flex-col gap-2 mt-2'>
      {classWorkData.map((classwork: IClassroomWork) => {
        return (
          <Link
            href={`/classroom/${classId}/classwork/${classwork._id}`}
            className='h-fit flex items-center w-full p-2 hover:bg-neutral-900 gap-2  rounded-[20px]'
            key={classwork._id}
          >
            <div className='md:w-[45px] w-[35px] md:h-[45px] h-[35px] flex items-center justify-center rounded-full p-2 bg-neutral-800'>
              <Image
                src={`/assets/material.svg`}
                width={20}
                height={20}
                alt='material-icon'
                unoptimized
              />
            </div>
            <p className='font-semibold'>{classwork.title}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default ClassroomClassworkData

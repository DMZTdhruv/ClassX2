import ClassroomCalendar from '@/components/classroom/ClassroomCalendar'
import ClassroomUpdate from '@/components/classroom/ClassroomUpdate'
import ClassroomUpdateCreator from '@/components/classroom/ClassroomUpdateCreator'
import ClassroomUpdateHeaderCard from '@/components/classroom/ClassroomUpdateHeaderCard'
import { cookies } from 'next/headers'
import React from 'react'
import { getClassroomData, getClassroomUpdates } from '../../classroomActions'
import InfiniteScrollClassroomUpdates from '@/components/classroom/InfiniteScrollClassroomUpdates'
import { Skeleton } from '@/components/ui/skeleton'

import ClassroomJoinId from '@/components/classroom/ClassroomJoinId'

interface IClassroomUpdate {
  _id: string
  classId: string
  title: string
  description: string
  attachments?: string[]
  postedBy: {
    _id: string
    username: string
    userProfileImage: string
  }
  createdAt: string
}

const Updates = async ({ params }: { params: { classId: string } }) => {
  const cookie = cookies().get('classX_user_token')?.value
  const classroomData = await getClassroomData(cookie || '', params.classId)
  const classroomUpdates: IClassroomUpdate[] = await getClassroomUpdates(
    cookie || '',
    params.classId,
    1
  )
  if (!classroomData) {
    return <div>Loading...</div>
  }

  return (
    <section className='md:p-[22px] p-[16px]'>
      <ClassroomUpdateHeaderCard
        className={classroomData?.className}
        division={classroomData?.division}
      />
      <div className='flex gap-[22px] mt-[22px]'>
        <div className='flex-col gap-[22px] md:flex hidden'>
          {classroomData?.classroomJoinId && (
            <ClassroomJoinId classroomJoinId={classroomData.classroomJoinId} />
          )}
          <ClassroomCalendar />
        </div>
        <div className='flex flex-col flex-1 gap-[22px]'>
          <div className='block md:hidden'>
            {classroomData?.classroomJoinId && (
              <ClassroomJoinId classroomJoinId={classroomData.classroomJoinId} />
            )}
          </div>
          <ClassroomUpdateCreator
            adminIds={classroomData?.adminEmails}
            classId={params?.classId}
          />
          {classroomUpdates ? (
            classroomUpdates?.map(update => {
              return (
                <ClassroomUpdate
                  key={update._id}
                  classId={params.classId}
                  classroomUpdate={{
                    _id: update._id,
                    postedBy: {
                      username: update.postedBy.username,
                      userProfileImage: update.postedBy.userProfileImage,
                    },
                    createdAt: update.createdAt,
                    description: update.description,
                    title: update.title,
                    attachments: update?.attachments,
                  }}
                />
              )
            })
          ) : (
            <Skeleton className='h-[250px] p-[24px]  rounded-[20px]' />
          )}
          <InfiniteScrollClassroomUpdates
            cookie={cookie || ''}
            classId={params.classId}
            totalUpdates={classroomData.updates}
          />
        </div>
      </div>
    </section>
  )
}

export default Updates

import ClassroomCalendar from '@/components/classroom/ClassroomCalendar'
import ClassroomUpdate from '@/components/classroom/ClassroomUpdate'
import ClassroomUpdateCreator from '@/components/classroom/ClassroomUpdateCreator'
import ClassroomUpdateHeaderCard from '@/components/classroom/ClassroomUpdateHeaderCard'
import { cookies } from 'next/headers'
import React from 'react'
import { getClassrooms, getClassroomUpdates } from '../../classroomActions'
import InfiniteScrollClassroomUpdates from '@/components/classroom/InfiniteScrollClassroomUpdates'
import { Skeleton } from '@/components/ui/skeleton'

interface IClassroomUpdate {
  _id: string
  classId: string
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
  const classrooms = await getClassrooms(cookie || '', params.classId)
  console.log(classrooms)
  const classroomUpdates: IClassroomUpdate[] = await getClassroomUpdates(
    cookie || '',
    params.classId,
    1
  )
  if (!classrooms) {
    return <div>Loading...</div>
  }

  return (
    <section className='md:p-[22px] p-[16px]'>
      <ClassroomUpdateHeaderCard
        className={classrooms?.className}
        division={classrooms?.division}
      />
      <div className='flex gap-[22px] mt-[22px]'>
        <ClassroomCalendar />
        <div className='flex flex-col flex-1 gap-[22px]'>
          <ClassroomUpdateCreator
            adminIds={classrooms?.adminEmails}
            classId={params?.classId}
          />
          {classroomUpdates ? (
            classroomUpdates?.map(update => {
              return (
                <ClassroomUpdate
                  key={update._id}
                  classroomUpdate={{
                    postedBy: {
                      username: update.postedBy.username,
                      userProfileImage: update.postedBy.userProfileImage,
                    },
                    createdAt: update.createdAt,
                    description: update.description,
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
            totalUpdates={classrooms.updates}
          />
        </div>
      </div>
    </section>
  )
}

export default Updates

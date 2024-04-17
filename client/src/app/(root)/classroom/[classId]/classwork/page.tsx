import ClassroomClassworkCreator from '@/components/classroom/ClassrroomClassworkCreator'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import React, { useState } from 'react'
import { getClassroomData, getClassroomTopics } from '../../classroomActions'
import ClassroomClasswork from '@/components/classroom/ClassroomClasswork'

interface Token {
  userProfileId: string
}

const Classwork = async ({ params }: { params: { classId: string } }) => {
  const cookie = cookies().get('classX_user_token')?.value
  const decodedCookie: Token | null = cookie ? jwtDecode(cookie) : null
  const topics = await getClassroomTopics(cookie || '', params.classId)
  const classroomData = await getClassroomData(cookie || '', params.classId)


  return (
    <div className='w-full flex flex-col items-center '>
      <div className='lg:w-[80%] flex-col md:w-[90%] w-full md:p-[16px] flex items-center'>
        <div className='w-full'>
          {classroomData?.adminEmails?.includes(decodedCookie?.userProfileId) && (
            <ClassroomClassworkCreator adminIds={[]} classId={params?.classId} />
          )}
        </div>
        <div className='w-full p-[16px]'>
          <ClassroomClasswork
            classId={params.classId}
            topics={topics}
            cookie={cookie || ''}
          />
        </div>
      </div>
    </div>
  )
}

export default Classwork

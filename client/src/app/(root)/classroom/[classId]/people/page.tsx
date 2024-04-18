import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import React from 'react'
import {
  getClassroomAdmins,
  getClassroomData,
  getClassroomStudents,
} from '../../classroomActions'
import ClassroomStudents from '@/components/classroom/ClassroomStudents'
import ClassroomAdmins from '@/components/classroom/ClassroomAdmins'
import ClassroomAdminJoinId from '@/components/classroom/ClassroomAdminJoinId'

interface Token {
  userProfileId: string
}

interface IAdmin {
  username: string
  userProfileImage: string
}

interface IStudents {
  _id: string
  username: string
  userProfileImage: string
}

const People = async ({ params }: { params: { classId: string } }) => {
  const cookie = cookies().get('classX_user_token')?.value
  const decodedCookie: Token | null = cookie ? jwtDecode(cookie) : null
  const [admins, classroomData, students] = await Promise.all([
    getClassroomAdmins(cookie || '', params.classId),
    getClassroomData(cookie || '', params.classId),
    getClassroomStudents(cookie || '', params.classId),
  ])

  const isAdmin = classroomData?.adminEmails?.includes(decodedCookie?.userProfileId)

  return (
    <div className='w-full flex flex-col items-center md:px-[16px] p-[16px]'>
      <div className='lg:w-[80%] flex-col md:w-[90%] w-full md:p-[16px] flex '>
        <div>
          <h2 className='md:text-3xl text-2xl bg-neutral-900 rounded-xl p-6 flex justify-between  items-center  font-bold text-neutral-200'>
            Admins
            {classroomData?.adminEmails?.includes(decodedCookie?.userProfileId) && (
              <ClassroomAdminJoinId
                classroomAdminJoinId={classroomData.classroomAdminJoinId}
              />
            )}
          </h2>
          <ClassroomAdmins admins={admins} />
        </div>
        <div>
          <h2 className='md:text-3xl text-2xl bg-neutral-900 rounded-xl p-6  font-bold text-neutral-200'>
            Students
          </h2>
          <ClassroomStudents
          classId={params.classId}
            creatorId={decodedCookie?.userProfileId || ''}
            students={students}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  )
}

export default People

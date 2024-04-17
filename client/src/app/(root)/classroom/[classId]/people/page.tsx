import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import React from 'react'
import { getClassroomAdmins, getClassroomStudents } from '../../classroomActions'
import ClassroomStudents from '@/components/classroom/ClassroomStudents'
import ClassroomAdmins from '@/components/classroom/ClassroomAdmins'

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
  const [admins, students] = await Promise.all([
    getClassroomAdmins(cookie || '', params.classId),
    getClassroomStudents(cookie || '', params.classId),
  ])

  return (
    <div className='w-full flex flex-col items-center md:px-[16px] p-[16px]'>
      <div className='lg:w-[80%] flex-col md:w-[90%] w-full md:p-[16px] flex '>
        <div>
          <h2 className='text-3xl bg-neutral-900 rounded-xl p-6  font-bold text-neutral-200'>
            Admins
          </h2>
          <ClassroomAdmins admins={admins} />
        </div>
        <div>
          <h2 className='text-3xl bg-neutral-900 rounded-xl p-6  font-bold text-neutral-200'>
            Students
          </h2>
          <ClassroomStudents students={students} />
        </div>
      </div>
    </div>
  )
}

export default People

import Image from 'next/image'
import React from 'react'
import ClassroomDeleteStudentModal from './ClassroomDeleteStudent'

interface IStudent {
  _id: string
  username: string
  userProfileImage: string
}

const ClassroomStudents = ({
  students,
  isAdmin,
  creatorId,
  classId,
}: {
  students: IStudent[]
  isAdmin: boolean
  creatorId: string
  classId: string
}) => {
  return (
    <div className='flex flex-col gap-3 my-3'>
      {students.map(student => {
        return (
          <div
            key={student.username}
            className=' rounded-[20px] p-3 justify-between hover:bg-neutral-900/50  flex items-center'
          >
            <div className='flex items-center'>
              <div className='relative h-12 w-12 rounded-full overflow-hidden'>
                <Image
                  src={student.userProfileImage}
                  alt={student.username}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                />
              </div>
              <div className='ml-4'>
                <p className='text-neutral-200 font-semibold'>{student.username}</p>
                <p className='text-neutral-400'>student</p>
              </div>
            </div>
            {isAdmin && (
              <ClassroomDeleteStudentModal
                creatorId={creatorId}
                studentId={student._id}
                classId={classId}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ClassroomStudents

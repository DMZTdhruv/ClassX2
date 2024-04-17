'use client'

import Image from 'next/image'
import React from 'react'

interface IStudent {
  _id: string
  username: string
  userProfileImage: string
}

const ClassroomStudents = ({ students }: { students: IStudent[] }) => {
  return (
    <div>
      {students.map(student => {
        return (
          <div key={student.username} className=' rounded-xl p-4 flex items-center'>
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
        )
      })}
    </div>
  )
}

export default ClassroomStudents

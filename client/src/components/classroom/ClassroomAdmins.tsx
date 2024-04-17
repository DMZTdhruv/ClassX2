'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IAdmin {
  username: string
  userProfileImage: string
}

const ClassroomAdmins = ({ admins }: { admins: IAdmin[] }) => {
  return (
    <div className='flex'>
      {admins.map(admin => {
        return (
          <div key={admin.username} className=' rounded-xl p-4 flex items-center'>
            <div className='relative h-12 w-12 rounded-full overflow-hidden'>
              <Image
                src={admin.userProfileImage}
                alt={admin.username}
                layout='fill'
                objectFit='cover'
                objectPosition='center'
              />
            </div>
            <div className='ml-4'>
              <p className='text-neutral-200 font-semibold'>{admin.username}</p>
              <p className='text-neutral-400'>Admin</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ClassroomAdmins

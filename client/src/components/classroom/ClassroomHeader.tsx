import React from 'react'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa6'
import AccessProfile from '../shared/profile/AccessProfile'

const ClassroomHeader = () => {
  return (
    <header className='h-[60px] sticky top-0  border-b bg-[#0E0E0E] z-[50] border-neutral-800 flex md:px-[24px] px-[16px] items-center justify-between'>
      <Link
        href={`/classroom`}
        className='text-[15px] items-center flex  gap-[10px] font-semibold'
      >
        <FaArrowLeft
          size={18}
          className=' active:scale-75 active:opacity-75 transition-all'
        />
        Classroom
      </Link>
      <div>
        <AccessProfile />
      </div>
    </header>
  )
}

export default ClassroomHeader

'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'

const ClassroomOptions = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <div className='relative'>
      <button onClick={() => setOpenModal(prev => !prev)}>
        <IoAddOutline size={24} className='active:scale-90' />
      </button>
      {openModal && (
        <div className='absolute right-0 w-[250px] p-2 gap-2 bg-[#0E0E0E] border-neutral-800 rounded-lg border flex flex-col'>
          <Link
            href={'/classroom/create-classroom'}
            className='text-[15px] font-semibold hover:bg-neutral-800 active:scale-90 rounded-md text-center'
          >
            Create-classroom
          </Link>
          <Link
            href={'/classroom/join-classroom'}
            className='text-[15px] font-semibold hover:bg-neutral-800 active:scale-90 rounded-md text-center'
          >
            Join-classroom
          </Link>
        </div>
      )}
    </div>
  )
}

export default ClassroomOptions

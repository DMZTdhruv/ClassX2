'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'

const ClassroomOptions = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <div className='relative flex items-center'>
      <button onClick={() => setOpenModal(prev => !prev)}>
        <IoAddOutline size={24} className='active:scale-90' />
      </button>
      {openModal && (
        <div className='absolute z-[50] top-[30px] right-0 w-[250px] p-2 gap-2 bg-[#0E0E0E] border-neutral-800 rounded-lg border flex flex-col'>
          <Link
            href={'/classroom/create-classroom'}
            className='text-[15px] font-semibold transition-all hover:bg-neutral-800 group rounded-md text-center'
            prefetch={true}
          >
            <span className='group-active:scale-[0.9] hover:scale-[1.02] inline-block'>
              Create-classroom
            </span>
          </Link>
          <Link
            href={'/classroom/join-classroom'}
            className='text-[15px] font-semibold group transition-all hover:bg-neutral-800 group rounded-md text-center'
            prefetch={true}
          >
            <span className='group-active:scale-[0.9] hover:scale-[1.02] inline-block'>
              Join-classroom
            </span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ClassroomOptions

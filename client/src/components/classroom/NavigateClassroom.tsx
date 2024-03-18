import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'

const NavigateClassroom = () => {
  return (
    <Link
      href={`/classroom`}
      className='text-[15px] absolute top-[22px] left-[22px] items-center flex  gap-[10px] font-semibold'
    >
      <FaArrowLeft
        size={18}
        className=' active:scale-75 active:opacity-75 transition-all'
      />
      Classroom
    </Link>
  )
}

export default NavigateClassroom

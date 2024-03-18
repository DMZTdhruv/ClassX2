import JoinClassroom from '@/components/classroom/JoinClassroom'
import NavigateClassroom from '@/components/classroom/NavigateClassroom'
import React from 'react'

const page = () => {
  return (
    <div className='h-[90%] w-full relative  flexCenter px-[16px]'>
      <NavigateClassroom />
      <JoinClassroom />
    </div>
  )
}

export default page

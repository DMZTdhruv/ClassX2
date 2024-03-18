import CreateClassroom from '@/components/classroom/CreateClassroom'
import NavigateClassroom from '@/components/classroom/NavigateClassroom'
import React from 'react'

const CreateClassroomPage = async () => {
  return (
    <div className='h-full w-full relative  flexCenter px-[16px]'>
      <NavigateClassroom />
      <CreateClassroom />
    </div>
  )
}

export default CreateClassroomPage

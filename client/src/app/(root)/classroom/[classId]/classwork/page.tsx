import ClassroomClassworkCreator from '@/components/classroom/ClassrroomClassworkCreator'
import React, { useState } from 'react'

const Classwork = ({ params }: { params: { classId: string } }) => {
  return (
    <div className='w-full flex flex-col items-center '>
      <div className='lg:w-[80%] md:w-[90%] w-full md:p-[16px] flex justify-center'>
        <div className='w-full'>
          <ClassroomClassworkCreator adminIds={[]} classId={params?.classId} />
        </div>
      </div>
    </div>
  )
}

export default Classwork

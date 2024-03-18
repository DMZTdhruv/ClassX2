import React from 'react'

const ClassroomUpdateHeaderCard = ({
  className,
  division,
}: {
  className: string
  division: string
}) => {
  return (
    <div className='h-[173px] w-full bg-primary rounded-[20px] px-[22px]'>
      <h2 className='font-bold  md:pt-[70px] pt-[80px] text-[20px] md:text-[25px] lg:text-[30px]'>
        {className}
      </h2>
      <p className='font-semibold text-[15px]'>Div - {division}</p>
    </div>
  )
}

export default ClassroomUpdateHeaderCard

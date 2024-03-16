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
      <h2 className='font-bold md:text-[33px] sm:text-[3.5vw] text-[5vw] md:pt-[70px] pt-[80px] '>
        {className}
      </h2>
      <p className='font-semibold text-[15px]'>Div - {division}</p>
    </div>
  )
}

export default ClassroomUpdateHeaderCard

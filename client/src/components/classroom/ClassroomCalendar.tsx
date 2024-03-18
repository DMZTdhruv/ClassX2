'use client'

import { Calendar } from '@/components/ui/calendar'
import React from 'react'

const ClassroomCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode='single'
      selected={date}
      onSelect={setDate}
      className='rounded-[20px]  h-fit sticky top-[22px] border border-neutral-800 bg-[#171717] text-white'
    />
  )
}

export default ClassroomCalendar

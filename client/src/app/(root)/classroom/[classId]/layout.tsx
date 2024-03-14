import ClassroomHeader from '@/components/classroom/ClassroomHeader'
import ClassroomTab from '@/components/classroom/ClassroomTab'
import Link from 'next/link'
import React from 'react'

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { classId: string }
}) => {
  return (
    <section>
      <ClassroomHeader />
      <ClassroomTab classId={params.classId} />
      {children}
    </section>
  )
}

export default layout

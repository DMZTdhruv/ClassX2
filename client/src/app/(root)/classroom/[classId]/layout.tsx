import ClassroomHeader from '@/components/classroom/ClassroomHeader'
import ClassroomTab from '@/components/classroom/ClassroomTab'
import Link from 'next/link'
import React from 'react'
import { Toaster } from '@/components/ui/toaster'

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
      <Toaster />
    </section>
  )
}

export default layout

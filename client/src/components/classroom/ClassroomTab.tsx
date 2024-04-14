'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const links = [
  {
    id: 1,
    link: 'updates',
    linkName: 'Updates',
  },
  {
    id: 2,
    link: 'classwork',
    linkName: 'Classwork',
  },
  {
    id: 3,
    link: 'people',
    linkName: 'People',
  },
]

const ClassroomTab = ({ classId }: { classId: string }) => {
  const pathname = usePathname()
  return (
    <nav className='md:h-[60px] h-[50px] md:text-[15px] text-[13px] border-b  bg-[#0E0E0E] z-[50] top-[60px]  sticky items-center border-neutral-800 flex gap-[10px] md:px-[24px] px-[16px]'>
      {links.map(link => {
        const isActive = pathname === `/classroom/${classId}/${link.link}`
        return (
          <Link
            key={link.id}
            href={`/classroom/${classId}/${link.link}`}
            className={`text-[15px] ${
              isActive ? 'bg-primary' : ' hover:bg-primary/30'
            } font-semibold px-2 py-1 transition-all rounded-full`}
          >
            {link.linkName}
          </Link>
        )
      })}
    </nav>
  )
}

export default ClassroomTab

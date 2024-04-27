'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BiMessageSquareDetail } from 'react-icons/bi'

function TopBar() {
  const pathname = usePathname()
  const navRef = useRef(null)

  const [isNavHidden, setIsNavHidden] = useState<boolean>(false)
  const onPath = pathname.startsWith('/post')
  const isMessageRoute = pathname.startsWith(`/message`)
  const isClassroomRoute = pathname.startsWith('/classroom')
  const isExploreRoute = pathname.startsWith('/explore')

  useEffect(() => {
    const handleScroll = () => {
      let currentPosition = window.scrollY
      if (prevPosition < currentPosition) {
        setIsNavHidden(true)
      } else {
        setIsNavHidden(false)
      }
      prevPosition = currentPosition
    }

    let prevPosition = window.scrollY
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      ref={navRef}
      className={`h-[60px] transition-transform
      ${isNavHidden ? 'translate-y-[-60px]' : 'translate-y-0'}
      ${(isMessageRoute || isClassroomRoute || isExploreRoute) && 'hidden'} ${
        onPath && 'hidden'
      } sm:hidden flex  justify-between  px-[14px] items-center fixed 
      bg-[#0E0E0E] z-[50] border-b rounded-b-xl border-neutral-800  w-full transition-transform `}
    >
      <span
        className='inline-block text-[25px] font-black
        bg-gradient-to-r from-[#891DCC] to-[#C01DCC] bg-clip-text text-transparent
        '
      >
        ClassX
      </span>
      <Link href={`/message`}>
        <BiMessageSquareDetail className='h-[23px] w-[23px] active:scale-75 active:opacity-70 transition-all' />
      </Link>
    </section>
  )
}

export default TopBar

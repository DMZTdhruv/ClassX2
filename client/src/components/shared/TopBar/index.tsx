'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function TopBar() {
  const pathname = usePathname()
  const navRef = useRef(null)

  const [isNavHidden, setIsNavHidden] = useState<boolean>(false)
  const onPath = pathname.startsWith('/post')

  useEffect(() => {
    let prevPosition = window.scrollY
    window.onscroll = () => {
      let currentPosition = window.scrollY
      if (prevPosition < currentPosition) {
        setIsNavHidden(true)
      } else {
        setIsNavHidden(false)
      }
      prevPosition = currentPosition
    }
  })

  return (
    <section
      ref={navRef}
      className={`h-[60px] ${onPath && 'hidden'} ${
        isNavHidden ? 'translate-y-[-60px]' : 'translate-y-[0px]'
      } sm:hidden flex  justify-between  px-[16px] items-center fixed top-0 
    backdrop-blur-lg z-[50] border-b border-neutral-800  w-full transition-transform `}
    >
      <Image
        src={`/assets/ClassX.svg`}
        height={15}
        width={0}
        alt={'classX logo'}
        style={{
          height: '20px',
          width: 'auto',
        }}
      />

      <Image
        src={`/assets/sidebar/message.svg`}
        height={15}
        width={0}
        alt={'classX logo'}
        style={{
          height: '20px',
          width: 'auto',
        }}
      />
    </section>
  )
}

export default TopBar

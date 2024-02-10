'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function index() {
  const navRef = useRef(null)
  const [isNavHidden, setIsNavHidden] = useState<boolean>(false)

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
  }, [])

  return (
    <section
      ref={navRef}
      className={`h-[60px]  ${
        isNavHidden ? 'translate-y-[-60px]' : 'translate-y-[0px]'
      }   topbar  justify-between  px-[16px] flex items-center sticky top-0 
    backdrop-blur-lg z-[100] border-b border-neutral-800  w-full transition-transform `}
    >
      <Image
        src={`assets/classX.svg`}
        height={15}
        width={0}
        alt={'classX logo'}
        style={{
          height: '20px',
          width: 'auto',
        }}
      />

      <Image
        src={`assets/sidebar/message.svg`}
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

export default index

'use client'

import React, { useEffect, useState } from 'react'
import { BottomBarData } from '@/Constants'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

function BottomBar() {
  const pathname = usePathname()
  const isMessageRoute = pathname.startsWith(`/message`)
  const [isBottomBarHidden, setIsBottomBarHidden] = useState<boolean>(false)

  useEffect(() => {
    let prevPosition = window.scrollY
    window.onscroll = () => {
      let currentPosition = window.scrollY
      if (prevPosition < currentPosition) {
        setIsBottomBarHidden(true)
      } else {
        setIsBottomBarHidden(false)
      }
      prevPosition = currentPosition
    }
  })

  return (
    <section
      className={`sticky transition-all opacity-90 ${
        isBottomBarHidden ? 'bottom-[-60px]' : 'bottom-[0px]'
      } ${
        isMessageRoute && 'hidden'
      } bottom-bar w-full items-center flex sm:hidden justify-between h-[60px] px-[24px]  gap-[20px]`}
    >
      {BottomBarData.map((links, index) => {
        const isActive = pathname === links.routes
        return (
          <Link href={links.routes} key={links.id}>
            <Image
              className={` p-[5px] rounded-md `}
              src={`/assets/sidebar-icons/${
                isActive ? `${links.filledIcon}` : `${links.icon}`
              }`}
              width={35}
              height={35}
              unoptimized
              alt={'icons'}
            />
          </Link>
        )
      })}
    </section>
  )
}

export default BottomBar

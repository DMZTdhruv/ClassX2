'use client'

import React from 'react'
import { BottomBarData } from '@/constants'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import './index.css'

function index() {
  const pathname = usePathname()
  return (
    <section className='fixed bottom-bar  bottom-0 w-full items-center flex justify-between h-[80px] px-[24px] bottom_bar-links  gap-[20px]'>
      {BottomBarData.map((links, index) => {
        const isActive =
          pathname.includes(links.routes) || pathname === links.routes
        return (
          <Link href={links.routes}>
            <Image
              className={`${isActive && 'bg-[#891DCC]'} p-[5px] rounded-md `}
              src={`/assets/sidebar/${links.icon}`}
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

export default index

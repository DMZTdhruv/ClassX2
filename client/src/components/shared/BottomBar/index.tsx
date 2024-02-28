'use client'

import React from 'react'
import { BottomBarData } from '@/Constants'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

function BottomBar() {
  const pathname = usePathname()
  return (
    <section className='sticky bottom-0 bottom-bar opacity-50 w-full items-center flex sm:hidden justify-between h-[60px] px-[24px]  gap-[20px]'>
      {BottomBarData.map((links, index) => {
        const isActive = pathname === links.routes
        return (
          <Link href={links.routes} key={links.id}>
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

export default BottomBar

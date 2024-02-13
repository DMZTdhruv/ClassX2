'use client'

import React from 'react'
import { sideBarData } from '@/Constants'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideBar(props: any) {
  const pathname = usePathname()
  return (
    <section className='h-[100vh] sticky top-0 transition-all sidebars font-poppins  px-[40px] realtive w-auto lg:w-[304px] border-r-2 border-r-slate-800 '>
      <div className='h-[150px] flex items-center'>
        <Image
          src={`/assets/ClassX.svg`}
          className='hidden lg:block'
          height={25}
          width={0}
          alt='classX'
          style={{
            width: 'auto',
          }}
        />
        <Image
          src={`/assets/Cx.svg`}
          className='block lg:hidden'
          height={45}
          width={45}
          alt='Responsive logo of cx'
        />
      </div>
      <div className='flex gap-[20px] lg:translate-x-[-10px] flex-col'>
        {sideBarData.map(links => {
          const isActive = pathname === links.routes
          return (
            <Link
              className={`flex ${
                isActive ? 'bg-[#891DCC]' : 'hover:bg-[#891DCC]/20'
              }  gap-[11px] py-[5px] px-[10px] rounded-md  transition-all cursor-pointer'`}
              href={links.routes}
              key={links.id}
            >
              <Image
                src={`/assets/sidebar/${links.icon}`}
                width={24}
                height={24}
                alt={links.name}
                unoptimized
              />
              <span className='font-semibold text-[20.42px] hidden lg:block '>
                {links.name}
              </span>
            </Link>
          )
        })}
      </div>
      <Button
        type='button'
        className='text-white font-bold absolute left-[20px] lg:left-[35px]  bottom-[41px]'
      >
        Log out
      </Button>
    </section>
  )
}

export default SideBar

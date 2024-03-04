'use client'

import React, { useEffect, useState } from 'react'
import { sideBarData } from '@/Constants'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import useLogOut from '@/hooks/auth/useLogout'

export default function SideBar(props: any) {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState<string>('/')
  const { loading, logout } = useLogOut()
  const router = useRouter()
  const logOutUser = async () => {
    await logout()
    localStorage.removeItem('classX_user')
    router.push('/auth/sign-in')
  }
  const isMessageRoute = pathname.startsWith('/message')
  return (
    <section
      className={`h-[100vh] sticky top-0 transition-all hidden sm:block font-poppins ${
        isMessageRoute ? '' : 'lg:w-[304px]'
      } px-[40px] relative w-auto border-r-2 border-r-slate-800 `}
    >
      <div className='h-[150px] flex items-center'>
        <Image
          src={`/assets/ClassX.svg`}
          className={`hidden ${!isMessageRoute && 'lg:block'}`}
          height={25}
          width={0}
          alt='classX'
          style={{
            width: 'auto',
          }}
        />
        <Image
          src={`/assets/Cx.svg`}
          className={`block ${!isMessageRoute && 'lg:hidden'}`}
          height={45}
          width={45}
          alt='Responsive logo of cx'
        />
      </div>
      <div
        className={`flex ${isMessageRoute ? 'gap-[27px]' : 'gap-[20px]'}  ${
          !isMessageRoute && 'lg:translate-x-[-10px]'
        } flex-col`}
      >
        {sideBarData.map(links => {
          const onPath = pathname === links.routes

          return (
            <Link
              className={`flex ${
                isActive === links.name || onPath
                  ? 'bg-[#891DCC] glow'
                  : 'hover:bg-[#891DCC]/20'
              }  gap-[11px] py-[5px] px-[10px] rounded-md  transition-all cursor-pointer '`}
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
              <span
                className={`font-semibold text-[20.42px] hidden ${
                  !isMessageRoute && 'lg:block'
                } `}
              >
                {links.name}
              </span>
            </Link>
          )
        })}
      </div>
      <Button
        type='button'
        className={`text-white font-bold absolute ${
          isMessageRoute ? 'left-[20px] lg:left-[20px]' : 'left-[20px] lg:left-[35px]'
        } bottom-[41px] transition-all`}
        onClick={logOutUser}
      >
        {loading ? 'Logging out...' : 'log out'}
      </Button>
    </section>
  )
}

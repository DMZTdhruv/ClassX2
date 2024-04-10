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
import LogOut from '../LogOut/LogOut'
import SideBarMoreCard from '@/components/cards/SideBarMoreCard'

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

  const [openMoreModal, setOpenMoreModal] = useState<boolean>(false)

  const isMessageRoute = pathname.startsWith('/message')
  return (
    <section
      className={`h-[100vh] sticky top-0 transition-all hidden sm:block font-poppins ${
        isMessageRoute ? '' : 'lg:w-[304px]'
      } px-[40px] relative w-auto border-r-2 border-neutral-800 `}
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
        className={`flex transition-transform  ${
          isMessageRoute ? 'lg:gap-[27px] gap-[19px]' : 'gap-[20px]'
        }  ${!isMessageRoute && 'lg:translate-x-[-10px]'} flex-col`}
      >
        {sideBarData.map(links => {
          const onPath = pathname === links.routes

          return (
            <Link
              className={`flex ${
                isActive === links.name || onPath
                  ? 'bg-primary'
                  : 'hover:bg-[#891DCC]/20'
              }  gap-[11px] py-[5px] px-[10px] rounded-md  transition-all cursor-pointer '`}
              href={links.routes}
              key={links.id}
            >
              <Image
                src={`/assets/sidebar-icons/${
                  isActive === links.name || onPath
                    ? `${links.filledIcon}`
                    : `${links.icon}`
                }`}
                width={24}
                //
                height={24}
                alt={links.name}
                className=''
                unoptimized
              />
              <span
                className={`text-[20.42px] hidden ${
                  !isMessageRoute && 'lg:block'
                } font-semibold`}
              >
                {links.name}
              </span>
            </Link>
          )
        })}
      </div>

      <div className='absolute bottom-4 w-full group'>
        <div className='relative w-full'>
          {openMoreModal && <SideBarMoreCard />}
          <button
            className={`gap-[11px] py-[10px] translate-x-[-10px] px-[10px]  text-[15px] flex justify-start items-center font-semibold  rounded-md cursor-pointer hover:bg-neutral-800 
              ${isMessageRoute ? ' translate-x-[5px] ' : ' translate-x-[-10px]'}
              ${!isMessageRoute && 'w-[75%]'}
            `}
            onClick={() => setOpenMoreModal(prev => !prev)}
          >
            <Image
              src={`/assets/sidebar-icons/setting.svg`}
              width={24}
              height={24}
              alt={'setting icon'}
              className=''
              unoptimized
            />
            <p
              className={`group-active:scale-[0.9]  ${isMessageRoute && 'lg:hidden'} ${
                openMoreModal && 'font-bold'
              }`}
            >
              More
            </p>
          </button>
        </div>
      </div>
    </section>
  )
}

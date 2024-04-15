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
import { useAuthContext } from '@/context/AuthContext'

export default function SideBar(props: any) {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState<string>('/')
  const { loading, logout } = useLogOut()
  const router = useRouter()
  const { authUser } = useAuthContext()
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
        isMessageRoute ? '' : 'lg:w-[300px]'
      } px-[35px] relative w-auto border-r-2 border-neutral-800 `}
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
                isActive === links.name || onPath ? '' : 'hover:bg-[#891DCC]/20'
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
                className={`text-[19px] hidden ${!isMessageRoute && 'lg:block'} ${
                  isActive === links.name || onPath ? 'font-semibold' : ''
                } `}
              >
                {links.name}
              </span>
            </Link>
          )
        })}

        <Link
          className={`flex ${
            pathname.startsWith('/profile') ? '' : 'hover:bg-[#891DCC]/20'
          }  gap-[11px] py-[5px] px-[10px] rounded-md  transition-all cursor-pointer '`}
          href={`/profile/${authUser?.userProfileId}`}
        >
          <Image
            src={`/assets/sidebar-icons/${
              pathname.includes('/profile') ? `profile-fill.svg` : `profile.svg`
            }`}
            width={24}
            //
            height={24}
            alt={'profile'}
            className=''
            unoptimized
          />
          <span
            className={`text-[19px] hidden ${!isMessageRoute && 'lg:block'} ${
              pathname.includes('/profile') ? 'font-semibold' : ''
            } `}
          >
            Profile
          </span>
        </Link>
      </div>
      {!isMessageRoute && (
        <>
          {openMoreModal && (
            <SideBarMoreCard userProfileId={authUser?.userProfileId || ''} />
          )}
          <div
            className={`fixed bottom-4 left-[28px] group   translate-x-[5px] ${
              isMessageRoute ? 'translate-x-[10px]' : 'lg:translate-x-[0px]'
            } `}
          >
            <button
              className='flex items-center  px-3 py-2 gap-[11px] transition-all hover:bg-neutral-800 rounded-md '
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
              <span
                className={`group-active:scale-[0.9] ${
                  isMessageRoute ? 'hidden' : 'lg:block'
                } hidden text-[15px] font-semibold`}
              >
                More
              </span>
            </button>
          </div>
        </>
      )}
    </section>
  )
}

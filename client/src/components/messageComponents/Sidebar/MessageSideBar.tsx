'use client'

import { Button } from '@/components/ui/button'
import Conversations from './Conversations'
import { useMessageContext } from '@/context/MessageContext'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

interface IUserDetails {
  _id: string
  userProfileImage: string
  username: string
  update: string
  url: string
}

export default function MessageSideBar({
  sideBarUsers,
}: {
  sideBarUsers: IUserDetails[]
}) {
  const { conversation } = useMessageContext()
  return (
    <div
      className={`messageSideBar justify-start lg:items-stretch sm:items-center flex flex-col xl:w-auto lg:w-auto sm:border-r sm:w-[100px] w-full h-screen bg-[#0E0E0E]  md:flex z-50 md:py-[31px] transition-all ${
        conversation ? 'translate-x-[-100%] sm:translate-x-0' : 'translate-x-0'
      }`}
    >
      <Link href={'/'} className='pt-5 '>
        <div
          className='h-[50px] sm:hidden shadow-sm sticky top-0 flex items-center
       bg-[#0E0E0E] justify-start gap-[12px] px-[16px] z-[100]'
        >
          <FaArrowLeft
            width={24}
            height={24}
            className='h-[16px] w-[16px] active:scale-75 active:opacity-70 transition-all'
          />
          <span className='font-bold text-[15px]'>Messages</span>
        </div>
      </Link>
      <h3 className='font-black hidden lg:block text-[33px] text-center  md:hidden '>
        Chat
      </h3>

      <div className='flex gap-[141px] md:w-[350px] relative md:px-[31px] px-[16px] py-[22px] justify-between lg:flex sm:hidden'>
        <img
          src='/assets/search.svg'
          alt='search icon'
          className='absolute top-[50%] translate-y-[-50%] left-[32px] md:left-[40px] opacity-50'
          height={24}
          width={24}
        />
        <Input
          placeholder='Search a friend'
          className='bg-[#242424] border-none pl-[52px] rounded-[10px]'
        />
      </div>
      <Conversations sideBarUsers={sideBarUsers} />
    </div>
  )
}

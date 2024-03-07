'use client'

import { Button } from '@/components/ui/button'
import Conversations from './Conversations'
import { useMessageContext } from '@/context/MessageContext'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
  const [name, setName] = useState('')
  // @ts-ignore
  const { authUser } = useAuthContext()

  useEffect(() => {
    console.log(authUser)
    setName(authUser?.username)
  }, [authUser])

  return (
    <div
      className={`messageSideBar justify-start lg:items-stretch sm:items-center flex flex-col xl:w-auto lg:w-auto sm:border-r sm:w-[100px] w-full h-screen bg-[#0E0E0E]  md:flex z-50 md:py-[31px] transition-all ${
        conversation ? 'translate-x-[-100%] sm:translate-x-0' : 'translate-x-0'
      }`}
    >
      <Link href={'/'}>
        <div
          className='h-[40px] sm:hidden shadow-sm border-b sticky top-0 flex items-center
       bg-[#0E0E0E] justify-start gap-[12px] px-[16px] z-[100]'
        >
          <FaArrowLeft />
          <span className='text-[13px] font-semibold'>{name}</span>
        </div>
      </Link>
      <h3 className='font-black hidden lg:block text-[33px] text-center  md:hidden '>
        Chat
      </h3>
      <p className='md:pt-[31px] lg:block md:px-[31px] px-[16px] font-bold text-[15px] mt-[15px] sm:hidden'>
        Message
      </p>
      <div className='flex gap-[141px] md:px-[31px] px-[16px] py-[22px] justify-between lg:flex sm:hidden'>
        <Button className='rounded-[22px] h-[25px] font-semibold text-white'>
          Primary
        </Button>
        <Button className='rounded-[22px] h-[25px] font-semibold text-white'>
          Groups
        </Button>
      </div>
      <Conversations sideBarUsers={sideBarUsers} />
    </div>
  )
}

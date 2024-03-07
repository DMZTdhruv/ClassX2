'use client'

import { MessageContextProps } from '@/Constants'
import { useMessageContext } from '@/context/MessageContext'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'

interface IUserDetails {
  _id: string
  userProfileImage: string
  username: string
  update: string
  url?: string
}

export default function MessageHeader({ userDetails }: { userDetails: IUserDetails }) {
  // @ts-ignore
  const { userProfileImage, username, update, url } = userDetails
  const { setConversation }: MessageContextProps = useMessageContext()

  return (
    <div className='flex items-center'>
      <FaArrowLeft onClick={() => setConversation(null)} size={20}  className='ml-[16px]'/>
      <Link href={`profile/@${username}`}>
        <div
          className={`flex cursor-pointer transition-all items-center px-[31px] h-[70px] gap-2 hover:bg-[#111111] w-full`}
        >
          <Image
            height={44}
            width={44}
            alt='user image'
            src={userProfileImage}
            className='w-[44px] h-[44px] rounded-full object-cover aspect-square'
            unoptimized
          />
          <div className='flex flex-col'>
            <p className='font-semibold text-[17px]'>{username}</p>
            <p className=' text-[10px] text-white/50'>Sent 3hrs ago</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

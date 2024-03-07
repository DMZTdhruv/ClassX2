import { MessageContextProps } from '@/Constants'
import { useMessageContext } from '@/context/MessageContext'
import { useSocketContext } from '@/context/SocketContext'
import useConversation from '@/zustand/useConversation'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

interface IUserDetails {
  _id: string
  userProfileImage: string
  username: string
  update: string
  url?: string
}

export default function Conversation({ userDetails }: { userDetails: IUserDetails }) {
  // @ts-ignore
  const { conversation, setConversation }: MessageContextProps = useMessageContext()
  const isSelected = conversation?._id === userDetails?._id
  // @ts-ignore
  const { activeUsers } = useSocketContext()

  const isActive = activeUsers?.includes(userDetails._id)

  const { userProfileImage, username, update, url } = userDetails
  return (
    <div
      className={`flex ${
        isSelected && 'bg-[#111111]'
      } cursor-pointer transition-all items-center lg:px-[31px] px-[16px] h-[70px] gap-2 hover:bg-[#111111] w-full`}
      onClick={() => setConversation(userDetails)}
    >
      <div className='relative flex justify-center'>
        <Image
          height={44}
          width={44}
          alt='user image'
          src={userProfileImage}
          className='w-[44px] h-[44px] rounded-full object-cover aspect-square'
          unoptimized
        />
        {isActive && (
          <div className='absolute bottom-[2px] right-[2px] h-2 w-2 shadow-ring-green rounded-full bg-green-400'></div>
        )}
      </div>
      <div className='flex-col lg:flex sm:hidden'>
        <p className='font-semibold text-[17px]'>{username}</p>
        <p className=' text-[10px] text-white/50'>Sent 3hrs ago</p>
      </div>
    </div>
  )
}

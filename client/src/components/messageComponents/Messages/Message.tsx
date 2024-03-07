import { MessageContextProps } from '@/Constants'
import { useAuthContext } from '@/context/AuthContext'
import { useMessageContext } from '@/context/MessageContext'
import { messageTime } from '@/utils/messageTime'
import Image from 'next/image'
import React from 'react'
interface MessageProps {
  senderId: string
  receiverId: string
  message: string
  createdAt: string
}

const Message = ({ message }: { message: MessageProps }) => {
  // @ts-ignore
  const { authUser } = useAuthContext()
  const { conversation }: MessageContextProps = useMessageContext()!
  const isUserMessage = message?.senderId === authUser?.userProfileId
  const userMessageChatBubbleClass = `rounded-l-[40px] rounded-tr-[40px]`
  const messageDate = messageTime(message.createdAt)
  return (
    <div
      className={`w-full flex justify-start gap-3  ${
        isUserMessage && 'flex-row-reverse'
      } `}
    >
      <div>
        <Image
          src={
            isUserMessage ? authUser.userProfileImage : conversation?.userProfileImage
          }
          alt='Image'
          width={30}
          height={30}
          className='aspect-square rounded-[40px] object-cover'
          unoptimized
        />
      </div>
      <div className='max-w-[75%] w-fit'>
        <p
          className={`h-auto w-fit ${
            isUserMessage
              ? userMessageChatBubbleClass
              : 'rounded-r-[40px] rounded-tl-[40px] '
          }  bg-primary/50 px-5 py-2`}
        >
          {message.message}
        </p>
        <span
          className={`text-[11px] mt-[2px] ${
            isUserMessage ? 'text-right' : 'text-left'
          }  block text-slate-400`}
        >
          {messageDate}
        </span>
      </div>
    </div>
  )
}

export default Message

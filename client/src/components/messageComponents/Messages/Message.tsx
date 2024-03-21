import { MessageContextProps } from '@/Constants'
import { useAuthContext } from '@/context/AuthContext'
import { useMessageContext } from '@/context/MessageContext'
import { DetailedMessageTime, messageTime } from '@/utils/messageTime'
import { CopyIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React, { useReducer, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { MdOutlineReport } from 'react-icons/md'
import { FiTrash } from 'react-icons/fi'
import { ImCancelCircle } from 'react-icons/im'
interface MessageProps {
  _id: string
  senderId: string
  receiverId: string
  message: string
  createdAt: string
}

interface MessageComponentProps {
  message: MessageProps
  deleteMessage: {
    deleteMessage: (_id: string) => void
    loading: boolean
  }
}

const Message = ({ message, deleteMessage }: MessageComponentProps) => {
  // @ts-ignore
  const { authUser } = useAuthContext()
  const { conversation }: MessageContextProps = useMessageContext()!
  const isUserMessage = message?.senderId === authUser?.userProfileId
  const userMessageChatBubbleClass = `rounded-l-[40px] rounded-tr-[40px]`
  const messageDate = messageTime(message.createdAt)
  const detailedMessageTime = DetailedMessageTime(message.createdAt)
  const [modal, setModal] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  // copy messages

  const copyMessage = () => {
    try {
      navigator.clipboard.writeText(message.message)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <div
      className={`w-full group animate-in relative duration-300 fade-in flex justify-start gap-3  ${
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
      <div className='mt-[10px]  relative  transition-all'>
        <button
          className=' group-hover:opacity-50 opacity-0 active:scale-90 '
          onClick={() => setModal(true)}
        >
          <BsThreeDots />
        </button>
        {modal && (
          <div
            className={`rounded-[15px] animate-in fade-in-0 items-center  absolute ${
              isUserMessage ? 'right-0' : 'left-0'
            } bottom-3  w-[200px] flex gap-1 py-1 flex-col bg-[#1E1E1E]/80 shadow-lg backdrop-blur-md`}
          >
            <div className='border-b border-neutral-700/50 w-full px-[22px] text-[11px] py-2'>
              {detailedMessageTime}
            </div>
            <p className='text-[14px] px-1 w-full rounded-[22px]'>
              <button
                className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-neutral-700/50 justify-between items-center'
                onClick={copyMessage}
              >
                <span>{copied ? 'Copied' : 'Copy'}</span>
                <span>
                  <CopyIcon />
                </span>
              </button>
            </p>
            {isUserMessage ? (
              <p className='text-[14px]  items-center   w-full flex justify-between px-1'>
                <button
                  className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-red-700/50 justify-between items-center'
                  onClick={() => deleteMessage.deleteMessage(message._id)}
                >
                  <span>Delete</span>
                  {deleteMessage.loading ? (
                    <span className='dangerLoader inline-block'></span>
                  ) : (
                    <FiTrash color='red' />
                  )}
                </button>
              </p>
            ) : (
              <p className='text-[14px] px-1 items-center   w-full flex justify-between'>
                <button className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-red-700/50 justify-between items-center'>
                  <span>Report</span>
                  <MdOutlineReport fill='red' />
                </button>
              </p>
            )}
            <p className='text-[14px]  py-1 items-center border-t border-neutral-700/50  w-full flex justify-between px-1'>
              <button
                className=' w-full flex px-[20px] py-1 rounded-[10px] hover:bg-neutral-700/50 justify-between items-center'
                onClick={() => setModal(false)}
              >
                <span>Cancel</span>
                <ImCancelCircle />
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Message

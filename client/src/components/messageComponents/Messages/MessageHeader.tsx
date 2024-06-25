'use client';

import { MessageContextProps } from '@/Constants';
import { useAuthContext } from '@/context/AuthContext';
import { useMessageContext } from '@/context/MessageContext';
import { useClassXSocketContext } from '@/context/ClassXSocketContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';

interface IUserDetails {
  _id: string;
  userProfileImage: string;
  username: string;
  update: string;
  url?: string;
}

export default function MessageHeader({ userDetails }: { userDetails: IUserDetails }) {
  // @ts-ignore
  const { userProfileImage, _id, username, update, url } = userDetails;
  const { setConversation }: MessageContextProps = useMessageContext();
  const { authUser } = useAuthContext();
  const { activeUsers } = useClassXSocketContext();
  const isActive = activeUsers?.includes(userDetails._id);
  const { socket } = useClassXSocketContext();
  const { conversation } = useMessageContext();

  const [typing, setTyping] = useState<boolean>(false);
  const [currentlyTextingUserId, setCurrentlyTextingUserId] = useState<string>('');
  useEffect(() => {
    socket?.on('typingStarted', data => {
      setTyping(data.status.status);
      setCurrentlyTextingUserId(data.receiverId);
    });

    return () => {
      socket?.off('typingStarted');
      setTyping(false);
      setCurrentlyTextingUserId('');
    };
  }, [socket]);
  return (
    <div
      className={` flex items-center absolute w-full  bg-[#0E0E0E]/80 backdrop-blur-md  top-0 z-[1000] gap-3`}
    >
      <button onClick={() => setConversation(null)}>
        <FaArrowLeft
          size={20}
          className='ml-[16px] hover:translate-x-[5px] translate-x-[10px] active:scale-75 active:opacity-75 transition-all'
        />
      </button>

      <Link href={`profile/${_id}`} className='flex-1 group'>
        <div
          className={`flex flex-1 cursor-pointer transition-all items-center p-5 h-[70px] gap-2 hover:bg-[#111111] w-full`}
        >
          <Image
            height={44}
            width={44}
            alt='user image'
            src={userProfileImage}
            className='w-[44px] h-[44px] rounded-full object-cover aspect-square'
            unoptimized
          />
          <div className='flex flex-col '>
            <p
              className={`${
                !isActive ? 'group-hover:translate-y-[-6px]' : null
              } transition-all font-semibold text-[17px]`}
            >
              {username}
            </p>
            <p className=' text-[10px] absolute bottom-0 text-white/50 group-hover:translate-y-[-100%] opacity-0 group-hover:opacity-100 z-[100]  group-hover:opacity-1 transition-all'>
              View profile
            </p>
            <p className='text-[10px] text-white/50  group-hover:translate-y-[-100%] group-hover:opacity-0 transition-all '>
              {typing && conversation?._id === currentlyTextingUserId ? (
                'Typing...'
              ) : isActive ? (
                <span className='flex gap-1 items-center justify-start '>
                  <div className=' h-2 w-2 shadow-ring-green rounded-full bg-green-400'></div>
                  Active now
                </span>
              ) : (
                ''
              )}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

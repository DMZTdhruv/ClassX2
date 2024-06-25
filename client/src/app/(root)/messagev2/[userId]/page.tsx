'use client';

import ConversationChatSection from '@/components/messageComponents/Messages/ConversationChats';
import ConversationMessageInput from '@/components/messageComponents/Messages/ConversationMessageInput';
import { Skeleton } from '@/components/ui/skeleton';
import { useClassXContext } from '@/context/ClassXContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';

const MessageV2Chat = ({ params }: { params: { userId: string } }) => {
  return (
    <div className='md:flex-auto relative flex-shrink-0  h-[100vh] max-w-[100vw] flex-wrap'>
      <div className='flex flex-col h-full relative'>
        <ConversationHeader userId={params.userId} />
        <ConversationChatSection userId={params.userId} />
        <ConversationMessageInput userId={params.userId} />
      </div>
    </div>
  );
};

const ConversationHeader = ({ userId }: { userId: string }) => {
  const { conversationUsers } = useClassXContext();
  const currentUser = conversationUsers.find(user => user._id === userId);

  return (
    <div className='h-[80px] w-full fixed top-0 z-[100000000000000]  bg-[#0E0E0E]/80 backdrop-blur-2xl border-b-2 border-neutral-900'>
      <div className='flex items-center h-full gap-3 '>
        <Link href={`/messagev2/`}>
          <FaArrowLeft
            size={20}
            className='ml-[16px] active:scale-75 active:opacity-75 transition-all'
          />
        </Link>
        <Link
          href={`/profile/${currentUser?._id}`}
          className='flex cursor-pointer flex-1 group items-center gap-3'
        >
          {currentUser?.userProfileImage ? (
            <Image
              height={44}
              width={44}
              alt='user image'
              src={currentUser?.userProfileImage}
              className='w-[44px] h-[44px] rounded-full object-cover aspect-square'
              unoptimized
            />
          ) : (
            <Skeleton className='w-[44px] h-[44px] rounded-full object-cover aspect-square' />
          )}
          <div className='flex-col '>
            <p className='group-hover:-translate-y-0 transition-transform translate-y-2 text-[15px] font-semibold'>
              {currentUser?.username}
            </p>
            <p className='group-hover:translate-y-0 transition-all translate-y-2 text-[10px]'>
              <span className='opacity-0 group-hover:opacity-100 transition-all'>
                View profile
              </span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MessageV2Chat;

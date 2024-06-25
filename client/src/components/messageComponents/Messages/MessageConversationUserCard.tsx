'use client';

import { IMessageUser } from '@/Constants';
import { formatMessageSideBarDate } from '@/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const MessageConversationUserCard = ({
  lastActiveOn,
  userProfileImage,
  _id,
  username,
}: IMessageUser) => {
  const date = formatMessageSideBarDate(new Date(lastActiveOn));
  const pathname = usePathname();

  const isSelected = pathname.endsWith(_id);

  return (
    <Link
      href={`/messagev2/${_id}`}
      className={`flex ${
        isSelected && 'bg-[#111111]'
      } cursor-pointer transition-all items-center py px-[24px] h-[70px] gap-2 hover:bg-[#111111] w-full`}
    >
      <div className='relative flex justify-center'>
        <Image
          height={50}
          width={50}
          alt='user image'
          src={userProfileImage}
          className='w-[50px] h-[50px] rounded-full object-cover aspect-square'
          unoptimized
        />
      </div>
      <div className='flex-col lg:flex space-y-1 md:space-y-0 sm:hidden'>
        <p className='font-semibold text-[17px]'>{username}</p>
        <p className=' text-[10px] text-white/50'>
          {false ? 'Active now' : `Active ${date} ago`}
        </p>
      </div>
    </Link>
  );
};

export default MessageConversationUserCard;

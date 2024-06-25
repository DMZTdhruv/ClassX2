'use client';

import { useClassXContext } from '@/context/ClassXContext';
import useGetConversations from '@/hooks/Conversations/useGetConversations';
import React, { useEffect, useState } from 'react';
import MessageConversationUserCard from './MessageConversationUserCard';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { IConversationChats, IConversationMessage, IMessageUser } from '@/Constants';

const MessageConversationContainer = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { getMessageConversationsUsers } = useGetConversations();
  const { conversationUsers, setConversationUsers, setConversationChats } =
    useClassXContext();

  const [findUsername, setFindUsername] = useState<string>('');

  const filteredConversationUsers = conversationUsers?.filter(user => {
    return user.username.toLowerCase().includes(findUsername.toLowerCase());
  });

  const getUsers = async () => {
    const users = await getMessageConversationsUsers();
    const initialConversationChats: IConversationMessage[] = users.map(user => ({
      _id: user._id,
      totalMessages: 0,
      page: 1,
      totalMessagesLoaded: 0,
      conversationChats: [],
    }));
    setConversationChats(initialConversationChats);
    setConversationUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    if (conversationUsers.length === 0) {
      getUsers();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className='min-h-[100vh] flex-shrink-0 border-r-2  border-neutral-800 overflow-y-auto md:w-[350px] sm:w-[100px] w-full flex flex-col'>
      <MobileNavigation />
      <DesktopUi />
      <SearchUser setFindUsername={setFindUsername} />
      <FilteredUsers
        findUsername={findUsername}
        filteredConversationUsers={filteredConversationUsers}
      />
      {loading
        ? 'fetching users...'
        : conversationUsers?.map(user => {
            return (
              <MessageConversationUserCard
                key={user._id}
                lastActiveOn={user?.lastActiveOn}
                userProfileImage={user?.userProfileImage}
                username={user?.username}
                _id={user?._id}
              />
            );
          })}
    </div>
  );
};

const MobileNavigation = () => {
  return (
    <Link href={'/'} className=''>
      <div
        className='h-[50px] sm:hidden py-5 shadow-sm sticky top-0 flex items-center
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
  );
};

const DesktopUi = () => {
  return (
    <div>
      <p className='font-poppins font-black text-[30px]  mt-5 text-center py-5'>Chat</p>
    </div>
  );
};

const SearchUser = ({
  setFindUsername,
}: {
  setFindUsername: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className='flex gap-[141px] relative md:px-[20px] px-[16px] mb-[16px] justify-between lg:flex sm:hidden'>
      <img
        src='/assets/search.svg'
        alt='search icon'
        className='absolute top-[50%] translate-y-[-50%] left-[20px] md:left-[33px] opacity-50'
        height={24}
        width={24}
      />
      <Input
        onChange={e => setFindUsername(e.target.value)}
        placeholder='Search a friend'
        className='bg-[#242424] border-none pl-[52px] rounded-full'
        maxLength={30}
      />
    </div>
  );
};

interface IFilteredUsers {
  findUsername: string;
  filteredConversationUsers: IMessageUser[];
}

const FilteredUsers = ({ findUsername, filteredConversationUsers }: IFilteredUsers) => {
  return (
    findUsername.length > 0 && (
      <div className='py-5 bg-primary/5 animate-in fade-in-0 border-neutral-800'>
        {filteredConversationUsers.length > 0 && (
          <div className='lg:px-[31px] px-[16px] font-poppins '>
            <span>Results founded of : </span>
            <span className='font-bold text-wrap'>{findUsername}</span>
          </div>
        )}
        {filteredConversationUsers.length === 0 && (
          <p className='lg:px-[31px] mt-3 px-[16px]  text-wrap '>
            No results were found of
            <br />
            <span className='font-bold'> {findUsername}</span>
          </p>
        )}
        {filteredConversationUsers.map(user => {
          return (
            <div className='mt-3' key={user._id}>
              <MessageConversationUserCard
                lastActiveOn={user?.lastActiveOn}
                userProfileImage={user?.userProfileImage}
                username={user?.username}
                _id={user?._id}
              />
            </div>
          );
        })}
      </div>
    )
  );
};

export default MessageConversationContainer;

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { RxCross2 } from 'react-icons/rx';
import useGetSuggestedUser from '@/hooks/user/useGetSuggestedUser';
import { useAuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import useSendPost from '@/hooks/posts/useSendPost';
import { usePostContext } from '@/context/PostContext';

interface IUserCard {
  _id: string;
  username: string;
  userProfileImage: string;
}

interface MessageDetails {
  receiverIds: string[];
  textMessage: string;
  postId: string;
}

const SuggestedUser = ({
  setOpenShareToToggle,
  postId,
}: {
  setOpenShareToToggle: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
}) => {
  const shareToModalRef = useRef<HTMLDivElement>(null);
  const { getSuggestedUser, loading } = useGetSuggestedUser();
  const { authUser } = useAuthContext();
  const { loading: sendingPost, sendPost, errorMessage } = useSendPost();
  const { suggestedUserList, setSuggestedUserList } = usePostContext();

  const [textMessage, setTextMessage] = useState<string>('');
  const [newUsers, setNewUsers] = useState<IUserCard[]>([]);
  const [newUserFetching, setNewUserFetching] = useState<boolean>(true);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        shareToModalRef.current &&
        !shareToModalRef.current.contains(event.target as Node)
      ) {
        setOpenShareToToggle(prev => !prev);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setOpenShareToToggle]);

  const users = async () => {
    if (suggestedUserList.length === 0) {
      const users = await getSuggestedUser(authUser?.userProfileId || '');
      setSuggestedUserList(users);
    }
  };

  useEffect(() => {
    users();
  }, []);

  const handleChange = (e: any) => {
    setTextMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchUserName, setSearchUserName] = useState<string>('');

  const filteredUser = suggestedUserList.filter((user: IUserCard) => {
    return user.username.toLowerCase().includes(searchUserName.toLowerCase());
  });

  // Merge filteredUser and newUsers, removing duplicates
  const uniqueUsers = new Map<string, IUserCard>();
  [...filteredUser, ...newUsers].forEach(user => {
    uniqueUsers.set(user._id, user);
  });

  const mergedUsers = Array.from(uniqueUsers.values());

  const selectUser = (e: any, id: string) => {
    if (e) {
      return setSelectedIds(prev => [...prev, id]);
    } else {
      return setSelectedIds(prev => prev.filter(userId => userId !== id));
    }
  };

  const handleSendPost = async () => {
    try {
      const data: MessageDetails = {
        receiverIds: selectedIds,
        textMessage: textMessage,
        postId: postId,
      };
      await sendPost(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setNewUserFetching(true);
    const getUsers = async () => {
      try {
        const api = process.env.NEXT_PUBLIC_API;
        const response = await fetch(
          `${api}/users/userprofile?username=${searchUserName}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        if (!response.ok) {
          console.log('Error finding the users');
        }

        const { data: result } = await response.json();
        setNewUsers(result);
      } catch (err) {
        console.log(err);
      } finally {
        setNewUserFetching(false);
      }
    };

    const delayTimeout = setTimeout(() => {
      if (searchUserName.length !== 0) {
        getUsers();
      }
    }, 1000);

    return () => clearTimeout(delayTimeout);
  }, [searchUserName]);

  return (
    <div
      ref={shareToModalRef}
      className='fixed top-[50%] left-[50%] md:w-[40vw] w-[95vw] transform -translate-x-1/2 -translate-y-1/2 z-[100] md:p-5 bg-[#1E1E1E]/95 shadow-lg  py-[8px]  rounded-[22px]'
    >
      <RxCross2
        className='absolute top-7 right-7 z-[150] active:scale-95 transition-all hover:scale-125 cursor-pointer'
        size={20}
        onClick={() => setOpenShareToToggle(prev => !prev)}
      />
      <div className='mb-4 relative'>
        <h2 className=' text-xl font-black text-center mb-2 mt-4'>Share</h2>
        <div className='flex gap-[141px] relative md:px-[31px] px-[16px] py-[22px] justify-between'>
          <img
            src='/assets/search.svg'
            alt='search icon'
            className='absolute top-[50%] translate-y-[-50%] left-[32px] md:left-[40px] opacity-50'
            height={24}
            width={24}
          />
          <Input
            placeholder='Search a friend'
            className='bg-[#242424] border-none shadow-sm pl-[52px] rounded-[10px]'
            value={searchUserName}
            onChange={e => setSearchUserName(e.target.value)}
          />
        </div>
        <div className=' md:px-[31px] px-[16px]'>
          <p className='text-sm md:font-semibold opacity-40'>
            {searchUserName.length !== 0
              ? `Searched result for ${searchUserName}`
              : 'Your followers'}
          </p>
          <div className={`min-h-[40vh] mt-5  overflow-y-auto max-h-[40vh]`}>
            <div className='flex flex-col '>
              {loading ? (
                <p>Loading...</p>
              ) : mergedUsers.length === 0 ? (
                <p>No users found</p>
              ) : (
                mergedUsers.map((user: IUserCard, index: number) => (
                  <div key={user._id}>
                    <label
                      htmlFor={user._id}
                      className='flex cursor-pointer items-center gap-2 rounded-full p-3'
                    >
                      <div className=''>
                        <Image
                          height={55}
                          width={55}
                          className='object-cover rounded-full aspect-square'
                          alt={`Image of ${user.username}`}
                          src={user.userProfileImage}
                          unoptimized
                        />
                      </div>
                      <div className='text-white flex  w-full justify-between text-md text-center pr-2 font-medium'>
                        <p className='flex-1 text-left'>{user.username}</p>
                        <Checkbox
                          className='rounded-full h-[20px]  w-[20px]'
                          id={user._id}
                          onCheckedChange={e => {
                            selectUser(e, user._id);
                          }}
                        />
                      </div>
                    </label>
                    {index + 1 !== mergedUsers.length ? (
                      <div className='w-full bg-[#474747]/40 h-[2px]'></div>
                    ) : null}
                  </div>
                ))
              )}
              {newUserFetching && (
                <p className='text-center w-full text-neutral-500 animate-pulse '>
                  Loading new users
                </p>
              )}
            </div>
          </div>
          <div className='border-t border-neutral-700'>
            <textarea
              className='text-white p-2 bg-transparent mt-2  focus:outline-none resize-none w-full '
              rows={1}
              value={textMessage}
              placeholder='Type a message here'
              onChange={handleChange}
            />
          </div>
          <Button className='w-full' onClick={handleSendPost}>
            {sendingPost ? 'sending...' : 'send'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestedUser;
